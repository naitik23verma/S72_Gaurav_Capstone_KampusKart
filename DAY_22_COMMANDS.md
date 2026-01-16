# Day 22 Commands - Jest Testing Setup

## 📦 Installation Commands

```bash
# Navigate to frontend directory
cd frontend

# Install Jest and testing libraries
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom identity-obj-proxy

# Install Babel presets for Jest
npm install --save-dev @babel/preset-env @babel/preset-react
```

---

## 🧪 Test Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- LoadingSkeleton.test.jsx

# Run tests matching a pattern
npm test -- --testNamePattern="renders"

# Run tests with verbose output
npm test -- --verbose

# Update snapshots (if using snapshot testing)
npm test -- -u
```

---

## 🔍 Debugging Commands

```bash
# Run tests with Node debugger
node --inspect-brk node_modules/.bin/jest --runInBand

# Run tests with no cache
npm test -- --no-cache

# Clear Jest cache
npx jest --clearCache

# Run tests for changed files only
npm test -- --onlyChanged

# Run tests related to specific files
npm test -- --findRelatedTests src/components/MobileMenu.jsx
```

---

## 📊 Coverage Commands

```bash
# Generate coverage report
npm run test:coverage

# Generate coverage and open in browser
npm run test:coverage && start coverage/lcov-report/index.html

# Coverage for specific files
npm test -- --coverage --collectCoverageFrom="src/components/**/*.{js,jsx}"

# Coverage with threshold
npm test -- --coverage --coverageThreshold='{"global":{"statements":80}}'
```

---

## 🛠️ Configuration Files Created

### 1. jest.config.js
```javascript
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/config/api$': '<rootDir>/src/__mocks__/config/api.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.cjs' }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/**/*.test.{js,jsx}',
    '!src/__mocks__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
```

### 2. babel.config.cjs
```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
```

### 3. package.json scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## 📁 File Structure Created

```
frontend/
├── jest.config.js
├── babel.config.cjs
├── src/
│   ├── setupTests.js
│   ├── __mocks__/
│   │   └── config/
│   │       └── api.js
│   ├── components/
│   │   └── __tests__/
│   │       ├── LoadingSkeleton.test.jsx
│   │       └── MobileMenu.test.jsx
│   ├── pages/
│   │   └── __tests__/
│   │       └── Home.test.jsx
│   └── utils/
│       ├── helpers.js
│       └── __tests__/
│           └── helpers.test.js
```

---

## 🐛 Troubleshooting Commands

### Issue: import.meta.env not working
```bash
# Solution: Create mock for api.js
# File: src/__mocks__/config/api.js
# Add mock in test files
```

### Issue: Tests not finding modules
```bash
# Clear cache and reinstall
npm test -- --clearCache
rm -rf node_modules
npm install
```

### Issue: Coverage not collecting
```bash
# Check collectCoverageFrom in jest.config.js
# Ensure files are not in ignore patterns
npm test -- --coverage --verbose
```

### Issue: Tests timing out
```bash
# Increase timeout
npm test -- --testTimeout=10000
```

---

## 📊 Test Results

```bash
# Expected output:
Test Suites: 4 passed, 4 total
Tests:       41 passed, 41 total
Snapshots:   0 total
Time:        1.719 s
Ran all test suites.
```

---

## 🔄 Git Commands for Day 22

```bash
# Create and switch to day-22 branch
git checkout -b day-22-jest-testing

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Day 22: Jest testing setup with 41 passing tests

- Installed Jest and testing libraries
- Configured Jest with jsdom environment
- Created 41 tests across 4 test suites
- Fixed import.meta.env compatibility
- Added utility helper functions
- Configured coverage reporting
- Concept Point: Jest Testing (1.0)"

# Push to remote
git push origin day-22-jest-testing

# Create pull request (via GitHub UI or CLI)
gh pr create --title "Day 22: Jest Testing Framework with 41 Passing Tests" --body "See docs/PR_SUMMARY_DAY_22.md for details"
```

---

## 📝 Quick Reference

### Run Tests
```bash
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage
```

### Test File Patterns
```bash
*.test.js                  # Test files
*.test.jsx                 # React component tests
__tests__/                 # Test directory
```

### Common Jest Matchers
```javascript
expect(value).toBe(expected)
expect(value).toEqual(expected)
expect(element).toBeInTheDocument()
expect(element).toHaveTextContent('text')
expect(fn).toHaveBeenCalled()
expect(fn).toHaveBeenCalledWith(arg)
```

---

## ✅ Verification Checklist

```bash
# 1. Install dependencies
npm install

# 2. Run tests
npm test

# 3. Verify all tests pass
# Expected: 41 passed, 41 total

# 4. Check coverage
npm run test:coverage

# 5. Verify no errors
# Expected: Exit Code 0
```

---

## 🎯 Success Criteria

- ✅ Jest installed and configured
- ✅ 41 tests created and passing
- ✅ Coverage reporting working
- ✅ No import.meta.env errors
- ✅ All test suites passing
- ✅ Concept point earned (1.0)

---

**Day 22 Complete**: Jest Testing Setup ✅  
**Total Tests**: 41 passing  
**Concept Points**: 1.0 earned  
**Cumulative Progress**: 7.5/14 points (53.6%)
