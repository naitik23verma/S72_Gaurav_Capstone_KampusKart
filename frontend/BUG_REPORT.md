# Frontend Bug Report — Comprehensive Analysis

> Generated from a full static analysis of all source files in `frontend/src/`.

---

## CRITICAL BUGS (Will crash at runtime)

### Bug #1 — `ThemeContext.tsx`: `setThemeState` is not defined

**File:** `src/contexts/ThemeContext.tsx`, Lines 28–35  
**Severity:** CRITICAL — Runtime crash  

The component destructures `useState` as `const [theme] = useState<Theme>('light')` (no setter), but both `setTheme` and `toggleTheme` call `setThemeState(...)`, which is never declared. Calling either function from any consumer will throw `ReferenceError: setThemeState is not defined`.

```tsx
// BUG: No setter destructured
const [theme] = useState<Theme>('light');

// These call a function that doesn't exist:
const setTheme = (newTheme: Theme) => {
  setThemeState(newTheme); // ❌ ReferenceError
};
const toggleTheme = () => {
  setThemeState((current) => { ... }); // ❌ ReferenceError
};
```

**Fix:** Destructure the setter and use it:
```tsx
const [theme, setThemeState] = useState<Theme>('light');
```

---

### Bug #2 — `AuthContext.tsx`: Stale closure in token refresh mechanism

**File:** `src/contexts/AuthContext.tsx`, Lines 87–110  
**Severity:** CRITICAL — Stale token sent to server, potential logout loop  

`refreshToken()` captures `token` from the closure at the time the effect ran, not the current value. When `setupTokenRefresh` fires after 19 minutes, the `token` variable inside `refreshToken` may be stale (e.g., if the user logged in again). The same applies to `refreshTimeout` being stored as React state rather than a ref — the `if (refreshTimeout)` check inside `setupTokenRefresh` reads a stale closure value.

```tsx
// Line ~87: useEffect depends on [token] but functions inside use stale closure
useEffect(() => {
  if (token) {
    fetchProfile();
    setupTokenRefresh(); // ← captures stale `token` and `refreshTimeout`
  }
}, [token]); // eslint-disable is used to suppress the warning

// Line ~118: refreshToken uses `token` from closure — may be stale after 19 min
const refreshToken = async () => {
  const response = await axios.post(`${API_BASE}/api/auth/refresh`, {}, {
    headers: { Authorization: `Bearer ${token}` } // ← stale token
  });
};
```

**Fix:**  
1. Use a `useRef` for `refreshTimeout` instead of `useState`.
2. Use a `useRef` for `token` to always access the latest value in async callbacks, or pass the token as an argument.

---

### Bug #3 — `AuthContext.tsx`: Token refresh timing mismatch

**File:** `src/contexts/AuthContext.tsx`, Lines 105, 172, 300  
**Severity:** HIGH — Token may expire before refresh  

Token refresh is set at 19 minutes with a comment "assuming 24-hour token expiry", but `refreshToken` sets the new expiry to 24 hours, while `login`/`signup` set the localStorage expiry to **30 days**. If the server token actually expires in 24 hours but localStorage says 30 days, the user could have an expired token persisted in storage.

**Fix:** Align all expiry values — either always use the server's actual token expiry (decode the JWT), or use a consistent value everywhere.

---

## HIGH-SEVERITY BUGS

### Bug #4 — `ErrorBoundary.tsx`: `process.env.NODE_ENV` doesn't work in Vite

**File:** `src/components/ErrorBoundary.tsx`, Line 83  
**Severity:** HIGH — Dev error details never shown  

Vite uses `import.meta.env.MODE`, not `process.env.NODE_ENV`. The condition `process.env.NODE_ENV === 'development'` will always be `false` in a Vite app, so detailed error information is never displayed during development.

```tsx
// BUG: This will never be true in Vite
{process.env.NODE_ENV === 'development' && this.state.error && (
  <details>...</details>
)}
```

**Fix:**
```tsx
{import.meta.env.MODE === 'development' && this.state.error && (
```

---

### Bug #5 — `ChatWindow.jsx`: Uses `API_BASE` instead of `SOCKET_URL` for socket connection

**File:** `src/components/Chat/ChatWindow.jsx`, Line ~90  
**Severity:** HIGH — Socket may connect to wrong URL  

The config.js exports both `API_BASE` and `SOCKET_URL` with different values — `API_BASE` includes `/api` path or trailing segments that socket.io won't handle, while `SOCKET_URL` is the bare server origin. The socket connection should use `SOCKET_URL`.

**Fix:** Change the socket initialization to use `SOCKET_URL` from config.

---

### Bug #6 — `ChatWindow.jsx`: Uses `localStorage.getItem('token')` instead of auth context

**File:** `src/components/Chat/ChatWindow.jsx`, Line ~90  
**Severity:** HIGH — Auth inconsistency  

The chat component reads the token directly from `localStorage` rather than using `token` from `useAuth()`. If the token is only in `sessionStorage` (non-persistent login), the chat will have no authentication and fail silently.

**Fix:** Use `const { token } = useAuth();` and pass that token to the socket connection and API calls.

---

### Bug #7 — `ChatWindow.jsx`: Template literal strings not interpolated in sx props

**File:** `src/components/Chat/ChatWindow.jsx`, Lines ~1290, ~1300, ~1390, ~1410  
**Severity:** HIGH — Broken styling  

Several MUI `sx` prop values use regular strings instead of template literals for dynamic values:

```jsx
// BUG: These are plain strings, not template literals — variable is NOT interpolated
boxShadow: '0 2px 6px ${CHAT_THEME.primaryRgba} 0.1)',  // ← regular quotes
border: '1px solid ${CHAT_THEME.primaryRgba} 0.2)',       // ← regular quotes
```

**Fix:** Use backticks (`` ` ``) for template literals:
```jsx
boxShadow: `0 2px 6px ${CHAT_THEME.primaryRgba}0.1)`,
```

---

### Bug #8 — `AuthContext.tsx`: Duplicate `ECONNREFUSED` error check in signup

**File:** `src/contexts/AuthContext.tsx`, Lines ~320–326  
**Severity:** MEDIUM — Unreachable code, wrong error message on first match  

```tsx
if (error.code === 'ECONNREFUSED') {
  throw new Error('Cannot connect to the server. Please make sure the backend server is running.');
}
if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
  throw new Error('Server is starting up. Please try again in a few seconds.');
}
```

The second `ECONNREFUSED` check is unreachable. If the code is `ECONNREFUSED`, the first branch always executes. The `ERR_NETWORK` case is the only one that can reach the second branch.

**Fix:** Combine into a single check:
```tsx
if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
  throw new Error('Server is starting up. Please try again in a few seconds.');
}
```

---

### Bug #9 — `useServerStatus.ts`: `checkStatus` not in useEffect dependency array

**File:** `src/hooks/useServerStatus.ts`, Lines 43–46  
**Severity:** MEDIUM — React hook rule violation  

```tsx
useEffect(() => {
  checkStatus();
}, []); // ← missing checkStatus dependency
```

`checkStatus` is not memoized with `useCallback`, so it changes on every render. While the `[]` dep means it only runs once (which is likely intentional), this is a hook rule violation that ESLint would flag. The function should be wrapped in `useCallback` or the call should be inlined.

---

## MEDIUM-SEVERITY BUGS

### Bug #10 — `CampusMap.tsx`: `isPanelOpen` computed once, not reactive

**File:** `src/components/CampusMap.tsx`, Line ~357  
**Severity:** MEDIUM — Broken responsive behavior  

```tsx
const isPanelOpen = window.innerWidth >= 768;
```

This is computed once at render time and is **not reactive** — resizing the browser won't update it. The component has access to `useResponsive()` hook but doesn't use it here.

**Fix:** Use the `useResponsive` hook or add a resize event listener:
```tsx
const { isMobile } = useResponsive();
const isPanelOpen = !isMobile;
```

---

### Bug #11 — `LostFound.tsx`: Inconsistent type casing

**File:** `src/components/LostFound.tsx`, Line ~113  
**Severity:** MEDIUM — Form default may not match backend expectations  

The type is defined as `'lost' | 'found'` (lowercase) but the form default fallback uses `'Lost'` (capitalized):

```tsx
type: item?.type || 'Lost'  // ← Should be 'lost'
```

**Fix:** Use lowercase `'lost'` to match the type definition.

---

### Bug #12 — `Complaints.tsx`: Invalid fallback category

**File:** `src/components/Complaints.tsx`, Line ~148  
**Severity:** MEDIUM — 'General' is not a valid category  

When opening the edit modal, the fallback category is `'General'`:
```tsx
category: complaint?.category || 'General'
```

But the available categories in the form are: Academic Affairs, Administration, Facilities Management, IT Services, Security, Student Services. `'General'` is not among them.

**Fix:** Use a valid default like `'Academic Affairs'` or the first option:
```tsx
category: complaint?.category || 'Academic Affairs'
```

---

### Bug #13 — `Complaints.tsx`: `handleInputChange` typed for wrong element

**File:** `src/components/Complaints.tsx`, Line ~480  
**Severity:** MEDIUM — TypeScript type mismatch  

`handleInputChange` is typed as:
```tsx
(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
```

But it's also used as the `onChange` handler for `<select>` elements, which emit `React.ChangeEvent<HTMLSelectElement>`.

**Fix:** Add `HTMLSelectElement` to the union:
```tsx
(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
```

---

### Bug #14 — `Events.tsx`: Filter status case mismatch

**File:** `src/components/Events.tsx`, Lines ~243 and filter logic  
**Severity:** MEDIUM — Filters may not match  

The filter dropdown values appear to be lowercase (`'upcoming'`, `'ongoing'`, etc.) but Event status values from the API are capitalized (`'Upcoming'`, `'Ongoing'`). If filtering uses strict equality, no events will match.

**Fix:** Normalize case during comparison:
```tsx
event.status.toLowerCase() === filterStatus.toLowerCase()
```

---

### Bug #15 — `News.tsx`: Inconsistent API call format

**File:** `src/components/News.tsx`, `handleAddNews` vs `handleSaveNews`  
**Severity:** MEDIUM — Add may fail if backend expects FormData  

`handleAddNews` sends data as JSON with `Content-Type: application/json`, but `handleSaveNews` (edit) sends data as `FormData`. If the backend expects `FormData` for image uploads during creation, adding news with images will fail.

**Fix:** Use `FormData` consistently for both add and edit operations.

---

### Bug #16 — `ImageUpload.tsx`: Preview URL memory leaks on single mode

**File:** `src/components/common/ImageUpload.tsx`, Line ~74  
**Severity:** MEDIUM — Memory leak  

When a new image replaces an existing one in single mode, `URL.createObjectURL` creates a new blob URL, but the old blob URL is never revoked via `URL.revokeObjectURL()`. The parent component must handle this.

**Fix:** Revoke old preview URLs before replacing:
```tsx
if (single && images.length > 0 && images[0].previewUrl) {
  URL.revokeObjectURL(images[0].previewUrl);
}
```

---

### Bug #17 — `ImageUpload.tsx`: "Drag and drop" text displayed but no drag-and-drop handler

**File:** `src/components/common/ImageUpload.tsx`, Line ~106  
**Severity:** MEDIUM — Misleading UX  

The text says "or drag and drop" but there are no `onDrop`, `onDragOver`, or `onDragEnter` handlers on the drop zone.

**Fix:** Either implement drag-and-drop handlers or remove the "or drag and drop" text.

---

## LOW-SEVERITY BUGS

### Bug #18 — `Signup.tsx`: Unused variables

**File:** `src/components/Signup.tsx`, Lines 35–40  
**Severity:** LOW — Dead code  

Variables `accent`, `accentText`, `accentBtn`, `accentBtnHover`, `accentFocus` are defined but never used.

**Fix:** Remove the unused variable declarations.

---

### Bug #19 — `ForgotPassword.tsx`: Unused `navigate`

**File:** `src/components/ForgotPassword.tsx`, Lines 3, 17  
**Severity:** LOW — Dead code  

`useNavigate` is imported and `navigate` is created but never used. Users must manually navigate after password reset.

**Fix:** Either remove the unused import or add a redirect after successful reset:
```tsx
navigate('/login');
```

---

### Bug #20 — `Landing.tsx`: Unused `blobs` array

**File:** `src/components/Landing.tsx`, Lines 4–8  
**Severity:** LOW — Dead code  

```tsx
const blobs = [ ... ]; // Defined but never used
```

**Fix:** Remove the unused array.

---

### Bug #21 — `package.json`: `axios` and `react-router-dom` in `devDependencies`

**File:** `package.json`  
**Severity:** LOW — Build may break in some deployment environments  

`axios` and `react-router-dom` are listed under `devDependencies` but are used as runtime dependencies throughout the app. Some hosting platforms only install `dependencies` in production builds.

**Fix:** Move `axios` and `react-router-dom` to `dependencies`.

---

### Bug #22 — `package.json`: Backend packages in frontend dependencies

**File:** `package.json`  
**Severity:** LOW — Unnecessary bundle bloat  

`express-rate-limit` and `jsonwebtoken` are backend-only packages but are listed in the frontend's `dependencies`. They serve no purpose in the client bundle and increase install/build times.

**Fix:** Remove `express-rate-limit` and `jsonwebtoken` from frontend `package.json`.

---

### Bug #23 — `useAIAutocomplete.ts`: AbortController doesn't actually abort the fetch

**File:** `src/hooks/useAIAutocomplete.ts`, Lines 41–52  
**Severity:** LOW — Abort signal unused  

An `AbortController` is created and its `signal.aborted` property is checked, but the signal is **never passed** to `aiService.getSuggestions()`. The AI service doesn't accept or use an abort signal, so the abort has no effect on the actual network request (though the local check prevents stale state updates).

**Fix:** Pass the abort signal to the service method, or document that cancellation is only at the UI level.

---

### Bug #24 — `useAIAutocomplete.ts`: `preExistingStrings` in dependency array causes infinite re-renders

**File:** `src/hooks/useAIAutocomplete.ts`, Line 62  
**Severity:** LOW to MEDIUM — Performance issue / potential infinite loop  

`preExistingStrings` is an array passed as a prop. If the parent passes a new array reference on each render (e.g., `preExistingStrings={items.map(i => i.name)}`), the `useCallback` for `debouncedFetchSuggestions` will be re-created every render, which cascades to `handleInputChange` being recreated, potentially triggering unnecessary effects.

**Fix:** Memoize the array in the parent component, or use a ref to track the value.

---

### Bug #25 — `themeConfig.ts`: `getThemeColor` and `getComponentTheme` are not type-safe

**File:** `src/theme/themeConfig.ts`, Lines 195–207  
**Severity:** LOW — Runtime error if invalid key passed  

```tsx
export const getThemeColor = (colorKey: string) => {
  const keys = colorKey.split('.');
  let value: any = themeConfig.colors;
  for (const key of keys) {
    value = value[key]; // ← No null check, will throw if key doesn't exist
  }
  return value;
};
```

**Fix:** Add null/undefined checks at each level:
```tsx
for (const key of keys) {
  if (value == null) return undefined;
  value = value[key];
}
```

---

### Bug #26 — `globalTheme.css`: Utility classes conflict with Tailwind

**File:** `src/theme/globalTheme.css`, Lines 91–113  
**Severity:** LOW — CSS specificity conflicts  

Classes like `.text-primary`, `.bg-primary`, `.border-primary` etc. are defined here, but Tailwind also generates classes with the same names. Depending on CSS load order, one will override the other unpredictably.

**Fix:** Namespace the custom utility classes (e.g., `.theme-text-primary`) or remove them and use Tailwind's config to define custom colors.

---

### Bug #27 — `useLoading.ts`: `setError` function reference in useEffect dependency

**File:** `src/hooks/useLoading.ts`, Lines 100–107  
**Severity:** LOW — Minor React hook issue  

The timeout `useEffect` depends on `setError`, which is a `useCallback` with `[]` deps — so it's stable. However, `state.isLoading` is in the dependency array, and the effect recreates the timer every time `isLoading` changes. If `isLoading` toggles quickly, multiple timers could be set. This is mitigated by the cleanup function, but worth noting.

---

### Bug #28 — `ClubsRecruitment.tsx`: State reset includes extra `image: undefined` property

**File:** `src/components/ClubsRecruitment.tsx`  
**Severity:** LOW — Harmless but indicates type mismatch  

After adding a club, the state reset includes `image: undefined` which is not in the declared state type.

**Fix:** Remove the extra property from the reset object.

---

## SUMMARY

| Severity | Count |
|----------|-------|
| CRITICAL | 3 |
| HIGH | 6 |
| MEDIUM | 8 |
| LOW | 11 |
| **Total** | **28** |

### Top Priority Fixes:
1. **ThemeContext.tsx** — Fix `setThemeState` (crash on any theme toggle)
2. **AuthContext.tsx** — Fix stale closure in token refresh (use refs)
3. **ErrorBoundary.tsx** — Fix `process.env.NODE_ENV` → `import.meta.env.MODE`
4. **ChatWindow.jsx** — Fix socket URL, auth token source, and template literal strings
5. **package.json** — Move `axios`/`react-router-dom` to `dependencies`; remove backend packages
