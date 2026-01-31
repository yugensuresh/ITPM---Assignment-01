import { test, expect } from '@playwright/test';

test.describe('UI Performance and Behavior Tests', () => {

  test('Pos_UI_0001: Real-time Sinhala output update validation', async ({ page }) => {

    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });

    const inputField = page.locator('textarea').first();
    const outputField = page.locator('div:has-text("Sinhala") + div').nth(1);

    // UI test case input
    const testInput = 'mama yanavaa';
    await inputField.pressSequentially(testInput, { delay: 100 });

    // Waiting to translate
    await page.waitForTimeout(2000);

    // Getting actual output
    const actualOutput = await outputField.innerText();
    console.log('Pos_UI_0001 Actual Output: ' + actualOutput);

    // same method, increased timeout (UI is slow sometimes)
    await expect(outputField).toHaveText('මම යනවා', { timeout: 25000 });

    // same method, increased timeout
    await expect(outputField).not.toBeEmpty({ timeout: 25000 });
  });

});
