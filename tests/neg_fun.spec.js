import { test, expect } from '@playwright/test';

test.describe('Negative Functional Tests - Singlish to Sinhala Robustness', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  // Negative Test Cases List
  const negativeScenarios = [
    { id: 'Neg_Fun_0001', input: 'aeththatamamamaoyaavadhanneanaee.', expected: 'ඇත්තටම මම ඔයාව දන්නේ නෑ.' },
    { id: 'Neg_Fun_0002', input: 'api nuvara gihin emu heta.', expected: 'අපි නුවර ගිහින් එමු හෙට!' },
    { id: 'Neg_Fun_0003', input: 'pvt company ekakin service  eka kara gamu.', expected: 'ප්‍රයිවට් company එකකින් service  එක කර ගමු.' },
    { id: 'Neg_Fun_0004', input: 'oyaa #office eka giyadha?', expected: 'ඔයා office එකට ගියාද?' },
    { id: 'Neg_Fun_0005', input: 'mmamaayethiiye kiyawapu pothha hoda nae.', expected: 'මම ආයෙත් ඊයේ කියවපු පොත හොඳ නෑ' },
    { id: 'Neg_Fun_0006', input: 'ape loginpage load wenne na, cacheclear karapan.', expected: 'ape login පේජ් ලෝඩ් වෙන්නෙ නැ, කෑශ් clear කරපන්.' },
    { id: 'Neg_Fun_0007', input: 'office eka 24/7 open kiyala kiyannawa', expected: 'ඔෆිස් එක 24/7 open කියල තියෙනවා.' },
    { id: 'Neg_Fun_0008', input: 'aiyo 3weni parata msg kala', expected: 'අයියෝ තුන්වෙනි පාරට මැසේජ් කලා.' },
    { id: 'Neg_Fun_0009', input: '7ta class eka start wenawa', expected: 'හතට ක්ලාස් එක start වෙනවා.' },
    { id: 'Neg_Fun_0010', input: 'yaaaaluwooo okkoma enawaa.', expected: 'යාලුවෝ ඔක්කොම එනවා.' },
  ];

  for (const scenario of negativeScenarios) {
    test(`${scenario.id}: Testing Robustness with "${scenario.input}"`, async ({ page }) => {
      const inputField = page.locator('textarea').first();
      const outputField = page.locator('div:has-text("Sinhala") + div').nth(1);

      // Single Input
      await inputField.fill(scenario.input);

      // waiting to translate sentence
      await page.waitForTimeout(2000);

      // Actual Output
      const actualOutput = await outputField.innerText();

      // Display in Terminal
      console.log(`${scenario.id} Actual Output: ${actualOutput}`);

      await expect(outputField).not.toHaveText(scenario.expected);
    });
  }
});
