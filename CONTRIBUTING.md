# Contributing to KampusKart

Thanks for taking the time to contribute. Here's everything you need to get started.

---

## Code of Conduct

By participating you agree to uphold a respectful and inclusive environment. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## Ways to Contribute

- Report bugs via the [bug report template](https://github.com/Gaurav-205/KampusKart/issues/new?template=bug_report.md)
- Suggest features via the [feature request template](https://github.com/Gaurav-205/KampusKart/issues/new?template=feature_request.md)
- Submit a pull request for a fix or improvement
- Improve documentation

---

## Development Setup

```bash
git clone https://github.com/Gaurav-205/KampusKart.git
cd KampusKart

# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Copy env files and fill in values
cp .env.example .env
cp backend/.env.example backend/.env
```

Run locally:

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend
cd frontend && npm run dev
```

---

## Submitting a Pull Request

1. Fork the repo and create a branch from `main`:
   ```bash
   git checkout -b fix/your-fix-name
   # or
   git checkout -b feat/your-feature-name
   ```

2. Make your changes. Keep commits focused and atomic.

3. Run tests before pushing:
   ```bash
   cd backend && npm test
   ```

4. Run the linter:
   ```bash
   cd frontend && npm run lint
   cd ../backend && npm run lint
   ```

5. Push and open a PR against `main`. Fill in the PR template.

---

## Commit Message Format

Use the imperative mood and keep the first line under 72 characters:

```
fix: correct ownership check in LostFound details modal
feat: add mark-as-resolved button to LostFound items
docs: update local setup instructions in README
chore: bump express to 5.1.0
```

Prefix types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## Coding Standards

- **TypeScript/React** — follow the existing ESLint config (`eslint.config.js`)
- **Backend** — follow `.eslintrc.json`; use `async/await`, not callbacks
- **Tailwind** — use utility classes; avoid inline styles
- **No hardcoded URLs** — always use `API_BASE` / env vars

---

## Questions?

Open a [GitHub Discussion](https://github.com/Gaurav-205/KampusKart/discussions) rather than an issue.
