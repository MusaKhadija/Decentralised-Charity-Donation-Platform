# 🧪 Testing Documentation

## Overview

This document provides comprehensive information about the testing infrastructure for the GiveChain Charity Donation Platform. Our testing strategy ensures the reliability, security, and performance of donation flows and charity management features.

## Testing Stack

### **Unit & Integration Testing**
- **Framework**: Vitest (fast, Vite-native testing)
- **Component Testing**: React Testing Library
- **Mocking**: Vitest built-in mocking
- **Coverage**: c8 coverage reporting

### **Smart Contract Testing**
- **Framework**: @stacks/testing
- **Network**: Stacks testnet simulation
- **Coverage**: Contract function and edge case testing

### **End-to-End Testing**
- **Framework**: Playwright
- **Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile
- **Features**: Visual regression, accessibility testing

### **Performance Testing**
- **Tool**: Lighthouse CI
- **Metrics**: Core Web Vitals, accessibility scores
- **Automation**: Integrated with CI/CD pipeline

## Test Structure

```
src/
├── __tests__/                 # Integration tests
│   ├── donation-flow.test.tsx
│   └── charity-registration.test.tsx
├── components/
│   └── **/__tests__/          # Component unit tests
├── store/
│   └── __tests__/             # Store/state management tests
├── test-setup.ts              # Global test configuration
└── test-utils.tsx             # Testing utilities

tests/                         # Smart contract tests
├── donation-management.test.ts
└── charity-verification.test.ts

e2e/                          # End-to-end tests
├── donation-flow.spec.ts
├── charity-browsing.spec.ts
└── accessibility.spec.ts
```

## Running Tests

### **Development Commands**

```bash
# Run all unit tests in watch mode
npm run test

# Run tests with UI interface
npm run test:ui

# Run tests once (CI mode)
npm run test:run

# Generate coverage report
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

### **Coverage Requirements**

- **Minimum Coverage**: 80% across all metrics
- **Critical Components**: 95% coverage required
  - DonationForm
  - CharityCard
  - Payment processing
  - Smart contract interactions

### **Test Categories**

#### **1. Unit Tests**
Focus on individual components and functions:

```typescript
// Example: DonationForm component test
describe('DonationForm', () => {
  it('validates donation amounts correctly', () => {
    // Test implementation
  });
  
  it('handles anonymous donations', () => {
    // Test implementation
  });
});
```

#### **2. Integration Tests**
Test component interactions and data flow:

```typescript
// Example: Full donation flow test
describe('Donation Flow Integration', () => {
  it('completes donation from charity detail page', () => {
    // Test implementation
  });
});
```

#### **3. Smart Contract Tests**
Verify blockchain functionality:

```typescript
// Example: Contract function test
describe('Donation Management Contract', () => {
  it('records donations correctly', () => {
    // Test implementation
  });
});
```

#### **4. E2E Tests**
Test complete user journeys:

```typescript
// Example: End-to-end donation test
test('user can complete donation flow', async ({ page }) => {
  // Test implementation
});
```

## Test Data Management

### **Mock Data**
- Consistent test data across all test types
- Realistic charity and donation information
- Edge cases and error scenarios

### **Test Utilities**
```typescript
// Custom render with providers
export const renderWithProviders = (ui: ReactElement) => {
  return render(ui, { wrapper: AllTheProviders });
};

// Mock user data
export const mockUserData = {
  profile: {
    stxAddress: {
      mainnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      testnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    },
  },
};
```

## Accessibility Testing

### **Automated Checks**
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- Color contrast validation

### **Manual Testing Checklist**
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] ARIA labels are descriptive
- [ ] Error messages are announced
- [ ] Form validation is accessible

## Performance Testing

### **Lighthouse Metrics**
- **Performance**: 95+ score
- **Accessibility**: 100 score
- **Best Practices**: 95+ score
- **SEO**: 90+ score

### **Core Web Vitals**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Security Testing

### **Automated Security Scans**
```bash
# Dependency vulnerability scan
npm audit --audit-level=high

# Security-focused linting
npm run lint:security
```

### **Manual Security Checklist**
- [ ] Input validation and sanitization
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Secure wallet integration
- [ ] Private key handling

## CI/CD Integration

### **GitHub Actions Workflow**
1. **Lint Code**: ESLint checks
2. **Unit Tests**: Component and store tests
3. **E2E Tests**: Full user journey validation
4. **Security Scan**: Dependency and code security
5. **Build**: Production build verification
6. **Deploy**: Staging and production deployment

### **Quality Gates**
- All tests must pass
- Coverage thresholds must be met
- Security scans must pass
- Performance budgets must be maintained

## Debugging Tests

### **Common Issues**

#### **Async Operations**
```typescript
// Wait for async operations
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

#### **Mock Cleanup**
```typescript
beforeEach(() => {
  vi.clearAllMocks();
});
```

#### **Component State**
```typescript
// Test state changes
act(() => {
  fireEvent.click(button);
});
```

### **Debug Tools**
- `screen.debug()` - Print current DOM
- `--ui` flag - Visual test interface
- Browser DevTools in E2E tests
- Coverage reports for gap analysis

## Best Practices

### **Test Writing Guidelines**
1. **Descriptive Names**: Test names should clearly describe what is being tested
2. **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification
3. **Single Responsibility**: Each test should verify one specific behavior
4. **Independent Tests**: Tests should not depend on each other
5. **Realistic Data**: Use realistic test data that matches production scenarios

### **Performance Considerations**
- Mock external dependencies
- Use `vi.fn()` for function mocking
- Clean up after tests
- Avoid unnecessary DOM queries

### **Maintenance**
- Update tests when features change
- Remove obsolete tests
- Keep test data current
- Monitor test execution time

## Continuous Improvement

### **Metrics Tracking**
- Test execution time
- Coverage trends
- Flaky test identification
- Performance regression detection

### **Regular Reviews**
- Monthly test suite review
- Coverage gap analysis
- Performance benchmark updates
- Security test enhancement

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Stacks Testing Guide](https://docs.stacks.co/docs/clarity/testing)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

For questions about testing or to report issues with the test suite, please create an issue in the GitHub repository or contact the development team.
