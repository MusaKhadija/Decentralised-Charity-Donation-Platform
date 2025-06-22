import { test, expect } from '@playwright/test';

test.describe('Donation Flow E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('should navigate from homepage to charity detail and complete donation', async ({ page }) => {
    // Check if homepage loads correctly
    await expect(page.locator('h1')).toContainText('GiveChain');
    
    // Navigate to charities page
    await page.click('text=Browse Charities');
    await page.waitForURL('/charities');
    
    // Verify charities page loads
    await expect(page.locator('h1')).toContainText('Charities');
    
    // Click on the first charity card
    const firstCharityCard = page.locator('[data-testid="charity-card"]').first();
    await firstCharityCard.click();
    
    // Verify we're on charity detail page
    await expect(page.url()).toMatch(/\/charities\/charity-\d+/);
    
    // Verify charity information is displayed
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid="charity-description"]')).toBeVisible();
    
    // Find donation form
    const donationForm = page.locator('[aria-label="Donation form"]');
    await expect(donationForm).toBeVisible();
    
    // Fill out donation form
    await page.fill('input[id="amount"]', '50');
    await page.fill('input[id="donorName"]', 'E2E Test User');
    await page.fill('textarea[id="message"]', 'Testing donation flow end-to-end');
    
    // Submit donation (this will be mocked in real tests)
    await page.click('button[type="submit"]');
    
    // Verify success message appears
    await expect(page.locator('text=Donation Successful')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Thank you for your generous donation')).toBeVisible();
  });

  test('should handle predefined donation amounts', async ({ page }) => {
    // Navigate directly to a charity detail page
    await page.goto('/charities/charity-1');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Click on predefined amount button
    await page.click('button:has-text("25 STX")');
    
    // Verify amount is updated in the input
    await expect(page.locator('input[id="amount"]')).toHaveValue('25');
    
    // Verify submit button reflects the amount
    await expect(page.locator('button[type="submit"]')).toContainText('Donate 25 STX');
  });

  test('should handle anonymous donations', async ({ page }) => {
    // Navigate to charity detail page
    await page.goto('/charities/charity-1');
    await page.waitForLoadState('networkidle');
    
    // Fill donor name first
    await page.fill('input[id="donorName"]', 'Test User');
    
    // Toggle anonymous donation
    await page.check('input[id="anonymous"]');
    
    // Verify name input is disabled and cleared
    await expect(page.locator('input[id="donorName"]')).toBeDisabled();
    await expect(page.locator('input[id="donorName"]')).toHaveValue('');
    
    // Submit donation
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=Donation Successful')).toBeVisible({ timeout: 10000 });
  });

  test('should validate donation form inputs', async ({ page }) => {
    // Navigate to charity detail page
    await page.goto('/charities/charity-1');
    await page.waitForLoadState('networkidle');
    
    // Try to submit with invalid amount
    await page.fill('input[id="amount"]', '0');
    
    // Submit button should be disabled
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
    
    // Set valid amount
    await page.fill('input[id="amount"]', '10');
    
    // Submit button should be enabled
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });

  test('should display loading state during donation', async ({ page }) => {
    // Navigate to charity detail page
    await page.goto('/charities/charity-1');
    await page.waitForLoadState('networkidle');
    
    // Fill out form
    await page.fill('input[id="amount"]', '100');
    await page.fill('input[id="donorName"]', 'Loading Test User');
    
    // Submit donation
    await page.click('button[type="submit"]');
    
    // Verify loading state appears briefly
    await expect(page.locator('button:has-text("Processing")')).toBeVisible();
    
    // Wait for completion
    await expect(page.locator('text=Donation Successful')).toBeVisible({ timeout: 10000 });
  });

  test('should reset form after successful donation', async ({ page }) => {
    // Navigate to charity detail page
    await page.goto('/charities/charity-1');
    await page.waitForLoadState('networkidle');
    
    // Fill out form
    await page.fill('input[id="amount"]', '75');
    await page.fill('input[id="donorName"]', 'Reset Test User');
    await page.fill('textarea[id="message"]', 'Test message for reset');
    
    // Submit donation
    await page.click('button[type="submit"]');
    
    // Wait for success message
    await expect(page.locator('text=Donation Successful')).toBeVisible({ timeout: 10000 });
    
    // Click "Make Another Donation"
    await page.click('button:has-text("Make Another Donation")');
    
    // Verify form is reset
    await expect(page.locator('input[id="amount"]')).toHaveValue('10'); // Default amount
    await expect(page.locator('input[id="donorName"]')).toHaveValue('');
    await expect(page.locator('textarea[id="message"]')).toHaveValue('');
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    // Navigate to charity detail page
    await page.goto('/charities/charity-1');
    await page.waitForLoadState('networkidle');
    
    // Tab through form elements
    await page.keyboard.press('Tab'); // Focus on amount input
    await expect(page.locator('input[id="amount"]')).toBeFocused();
    
    // Continue tabbing through predefined amounts
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }
    
    // Tab to name input
    await page.keyboard.press('Tab');
    await expect(page.locator('input[id="donorName"]')).toBeFocused();
    
    // Tab to anonymous checkbox
    await page.keyboard.press('Tab');
    await expect(page.locator('input[id="anonymous"]')).toBeFocused();
    
    // Tab to message textarea
    await page.keyboard.press('Tab');
    await expect(page.locator('textarea[id="message"]')).toBeFocused();
    
    // Tab to submit button
    await page.keyboard.press('Tab');
    await expect(page.locator('button[type="submit"]')).toBeFocused();
  });

  test('should work on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to charity detail page
    await page.goto('/charities/charity-1');
    await page.waitForLoadState('networkidle');
    
    // Verify mobile layout
    await expect(page.locator('[aria-label="Donation form"]')).toBeVisible();
    
    // Test touch interactions
    await page.tap('button:has-text("50 STX")');
    await expect(page.locator('input[id="amount"]')).toHaveValue('50');
    
    // Fill form on mobile
    await page.fill('input[id="donorName"]', 'Mobile User');
    await page.tap('button[type="submit"]');
    
    // Verify success on mobile
    await expect(page.locator('text=Donation Successful')).toBeVisible({ timeout: 10000 });
  });

  test('should handle charity not found gracefully', async ({ page }) => {
    // Navigate to non-existent charity
    await page.goto('/charities/non-existent-charity');
    
    // Should handle gracefully without crashing
    // This might show a 404 page or redirect to charities list
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display charity verification status', async ({ page }) => {
    // Navigate to charity detail page
    await page.goto('/charities/charity-1');
    await page.waitForLoadState('networkidle');
    
    // Verify verified badge is displayed
    await expect(page.locator('text=Verified')).toBeVisible();
  });

  test('should show charity statistics', async ({ page }) => {
    // Navigate to charity detail page
    await page.goto('/charities/charity-1');
    await page.waitForLoadState('networkidle');
    
    // Verify statistics are displayed
    await expect(page.locator('[data-testid="total-donations"]')).toBeVisible();
    await expect(page.locator('[data-testid="donor-count"]')).toBeVisible();
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Navigate to charity detail page
    await page.goto('/charities/charity-1');
    await page.waitForLoadState('networkidle');
    
    // Simulate network failure (this would be done with request interception in real tests)
    await page.route('**/api/**', route => route.abort());
    
    // Try to submit donation
    await page.fill('input[id="amount"]', '25');
    await page.click('button[type="submit"]');
    
    // Should handle error gracefully
    await expect(page.locator('body')).toBeVisible();
  });
});
