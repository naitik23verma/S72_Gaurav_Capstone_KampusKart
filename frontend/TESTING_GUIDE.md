# KampusKart Testing Guide

## 📚 Overview

This guide covers the testing setup and best practices for the KampusKart frontend application using Jest and React Testing Library.

---

## 🧪 Testing Stack

- **Jest**: JavaScript testing framework
- **React Testing Library**: React component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM
- **jsdom**: DOM implementation for Node.js
- **Babel**: JavaScript transpiler for ES6+ and JSX

---

## 🚀 Quick Start

### Run Tests
```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Results
```
Test Suites: 4 passed, 4 total
Tests:       41 passed, 41 total
Time:        ~1.7s
```

---

## 📁 Test Structure

```
src/
├── components/
│   ├── LoadingSkeleton.jsx
│   ├── MobileMenu.jsx
│   └── __tests__/
│       ├── LoadingSkeleton.test.jsx
│       └── MobileMenu.test.jsx
├── pages/
│   ├── Home.jsx
│   └── __tests__/
│       └── Home.test.jsx
├── utils/
│   ├── helpers.js
│   └── __tests__/
│       └── helpers.test.js
└── __mocks__/
    └── config/
        └── api.js
```

---

## 🧩 Test Categories

### 1. Component Tests (13 tests)

#### LoadingSkeleton Tests (8 tests)
```javascript
// Test rendering
test('renders ItemCardSkeleton correctly', () => {
  render(<ItemCardSkeleton />);
  expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
});

// Test props
test('applies custom className', () => {
  render(<ItemCardSkeleton className="custom" />);
  expect(screen.getByTestId('skeleton-card')).toHaveClass('custom');
});
```

#### MobileMenu Tests (5 tests)
```javascript
// Test interactions
test('opens menu when toggle button is clicked', () => {
  renderWithRouter(<MobileMenu />);
  fireEvent.click(screen.getByLabelText('Toggle menu'));
  expect(screen.getByText('Menu')).toBeInTheDocument();
});
```

### 2. Page Tests (7 tests)

#### Home Page Tests (7 tests)
```javascript
// Test conditional rendering
test('displays login buttons when not authenticated', () => {
  renderWithRouter(<Home />);
  expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
});

test('displays user greeting when authenticated', () => {
  mockUseAuth.mockReturnValue({
    isAuthenticated: true,
    user: { name: 'John Doe' },
  });
  renderWithRouter(<Home />);
  expect(screen.getByText('Hello, John Doe!')).toBeInTheDocument();
});
```

### 3. Utility Tests (21 tests)

#### Helper Functions (21 tests across 5 functions)
```javascript
// formatDate tests
test('formats date correctly', () => {
  const date = new Date('2024-01-15T10:30:00');
  expect(formatDate(date)).toBe('Jan 15, 2024');
});

// formatRelativeTime tests
test('returns "just now" for recent times', () => {
  const now = new Date();
  expect(formatRelativeTime(now)).toBe('just now');
});

// truncateText tests
test('truncates long text', () => {
  expect(truncateText('Hello World', 5)).toBe('Hello...');
});

// getInitials tests
test('gets initials from full name', () => {
  expect(getInitials('John Doe')).toBe('JD');
});

// getCategoryEmoji tests
test('returns correct emoji for category', () => {
  expect(getCategoryEmoji('Electronics')).toBe('📱');
});
```

---

## 🛠️ Configuration

### jest.config.js
```javascript
export default {
  // Use jsdom for browser-like environment
  testEnvironment: 'jsdom',
  
  // Setup file runs before each test
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // Mock CSS imports
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  // Transform JS/JSX with Babel
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.cjs' }],
  },
  
  // Coverage settings
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/**/*.test.{js,jsx}',
  ],
};
```

### setupTests.js
```javascript
import '@testing-library/jest-dom';

// Mock browser APIs
global.scrollTo = jest.fn();
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
```

---

## 🎭 Mocking Strategies

### 1. Mock API Calls
```javascript
// In test file
jest.mock('../../config/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
  API_URL: 'http://localhost:5000',
}));
```

### 2. Mock Context
```javascript
// Mock AuthContext
jest.mock('../../context/AuthContext', () => ({
  ...jest.requireActual('../../context/AuthContext'),
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    logout: jest.fn(),
  }),
}));
```

### 3. Mock Router
```javascript
// Helper function
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};
```

---

## 📝 Writing Tests

### Basic Component Test
```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Test User Interactions
```javascript
import { render, screen, fireEvent } from '@testing-library/react';

test('handles button click', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Test Async Operations
```javascript
import { render, screen, waitFor } from '@testing-library/react';

test('loads data', async () => {
  render(<DataComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

### Test Forms
```javascript
import { render, screen, fireEvent } from '@testing-library/react';

test('submits form', () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);
  
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'test@example.com' },
  });
  
  fireEvent.click(screen.getByText('Submit'));
  expect(handleSubmit).toHaveBeenCalled();
});
```

---

## 🔍 Common Queries

### Finding Elements
```javascript
// By text
screen.getByText('Hello World')

// By role
screen.getByRole('button', { name: /submit/i })

// By label
screen.getByLabelText('Email')

// By placeholder
screen.getByPlaceholderText('Enter email')

// By test ID
screen.getByTestId('custom-element')

// Query variants
screen.queryByText('Not found') // Returns null if not found
screen.findByText('Async') // Returns promise
```

---

## ✅ Common Matchers

### Jest Matchers
```javascript
expect(value).toBe(expected)
expect(value).toEqual(expected)
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(array).toContain(item)
expect(fn).toHaveBeenCalled()
expect(fn).toHaveBeenCalledWith(arg)
```

### jest-dom Matchers
```javascript
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).toHaveTextContent('text')
expect(element).toHaveClass('className')
expect(element).toHaveAttribute('attr', 'value')
expect(input).toHaveValue('value')
expect(checkbox).toBeChecked()
```

---

## 📊 Coverage Reports

### Generate Coverage
```bash
npm run test:coverage
```

### Coverage Output
```
File                  | % Stmts | % Branch | % Funcs | % Lines
----------------------|---------|----------|---------|--------
All files             |    9.13 |     4.19 |   11.11 |    9.52
 src/components       |   84.21 |       70 |   77.77 |   84.21
  LoadingSkeleton.jsx |   85.71 |      100 |      75 |   85.71
  MobileMenu.jsx      |   83.33 |    66.66 |      80 |   83.33
 src/pages            |    1.05 |      0.9 |    1.58 |     1.1
  Home.jsx            |     100 |      100 |     100 |     100
```

### View HTML Report
```bash
# Coverage report is generated in coverage/lcov-report/
# Open index.html in browser
start coverage/lcov-report/index.html
```

---

## 🐛 Troubleshooting

### Issue: import.meta.env not working
**Solution**: Mock the api.js file
```javascript
jest.mock('../../config/api', () => ({
  __esModule: true,
  default: { /* mock methods */ },
}));
```

### Issue: Tests timing out
**Solution**: Increase timeout
```javascript
jest.setTimeout(10000);
```

### Issue: Module not found
**Solution**: Check moduleNameMapper in jest.config.js
```javascript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1',
}
```

### Issue: CSS imports failing
**Solution**: Use identity-obj-proxy
```javascript
moduleNameMapper: {
  '\\.(css|less|scss)$': 'identity-obj-proxy',
}
```

---

## 🎯 Best Practices

### 1. Test Behavior, Not Implementation
```javascript
// ❌ Bad: Testing implementation details
expect(component.state.count).toBe(1);

// ✅ Good: Testing user-visible behavior
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

### 2. Use Semantic Queries
```javascript
// ❌ Bad: Using test IDs unnecessarily
screen.getByTestId('submit-button')

// ✅ Good: Using semantic queries
screen.getByRole('button', { name: /submit/i })
```

### 3. Keep Tests Isolated
```javascript
// Each test should be independent
beforeEach(() => {
  // Reset mocks
  jest.clearAllMocks();
});
```

### 4. Test Edge Cases
```javascript
test('handles empty input', () => {
  expect(truncateText('', 10)).toBe('');
});

test('handles null input', () => {
  expect(formatDate(null)).toBe('Invalid date');
});
```

### 5. Use Descriptive Test Names
```javascript
// ❌ Bad
test('test 1', () => { /* ... */ });

// ✅ Good
test('displays error message when login fails', () => { /* ... */ });
```

---

## 📚 Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [jest-dom Matchers](https://github.com/testing-library/jest-dom)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## 🎓 Testing Checklist

- [ ] Component renders without crashing
- [ ] Props are handled correctly
- [ ] User interactions work as expected
- [ ] Conditional rendering is tested
- [ ] Error states are handled
- [ ] Loading states are displayed
- [ ] Forms validate input
- [ ] API calls are mocked
- [ ] Edge cases are covered
- [ ] Accessibility is considered

---

## 📈 Current Test Stats

- **Total Tests**: 41
- **Test Suites**: 4
- **Pass Rate**: 100%
- **Average Runtime**: 1.7s
- **Components Tested**: 3
- **Utility Functions Tested**: 5

---

**Last Updated**: January 17, 2026  
**Version**: 1.0.0  
**Status**: ✅ All tests passing
