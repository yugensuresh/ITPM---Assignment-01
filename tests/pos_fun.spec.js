import { test, expect } from '@playwright/test';

test.describe('Positive Functional Tests - Singlish to Sinhala', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
    // Ensure textarea is ready before any test runs
    await page.locator('textarea').first().waitFor({ state: 'visible', timeout: 25000 });
  });

  // ✅ Helper: same approach (fill + wait + expect), with a retry ONLY if output stays empty
  async function ensureOutputNotEmpty({ page, inputField, outputField, originalInput }) {
    try {
      await expect(outputField).not.toBeEmpty({ timeout: 25000 });
    } catch (e) {
      // Retry: clear and re-fill the SAME input (inputs are not changed)
      await inputField.fill('');
      await page.waitForTimeout(300);
      await inputField.fill(originalInput);

      // Wait again (same method)
      await page.waitForTimeout(2000);

      // Final wait
      await expect(outputField).not.toBeEmpty({ timeout: 25000 });
    }
  }

  // Positive Test Cases List
  const testScenarios = [
    { id: 'Pos_Fun_0001', input: 'Hamuviima sathutak!', expected: 'හමුවීම සතුටක්!' },
    { id: 'Pos_Fun_0002', input: 'Api gedhara yanavaa heta passe api kathaa karamu.', expected: 'අපි ගෙදර යනවා හෙට පස්සෙ අපි කතා කරමු.' },
    { id: 'Pos_Fun_0003', input: 'Mata adha vaeda godak thiyanavaa.', expected: 'මට අද වැඩ ගොඩක් තියනවා.' },
    { id: 'Pos_Fun_0004', input: 'oya laptop eka aran dhenna puluvandha?', expected: 'ඔය laptop එක අරන් දෙන්න පුලුවන්ද?' },
    { id: 'Pos_Fun_0005', input: 'mata adha gym yanna thiyenavaa.', expected: 'මට අද gym යන්න තියෙනවා.' },
    { id: 'Pos_Fun_0006', input: 'Api anidhdhaa enavaa. ', expected: 'අපි අනිද්දා එනවා. ' },
    { id: 'Pos_Fun_0007', input: 'mata NIC eka mathaka naehae.', expected: 'මට NIC එක මතක නැහැ.' },
    { id: 'Pos_Fun_0008', input: 'Campus nivaadu nisaa api gamata yamu.', expected: 'Campus නිවාඩු නිසා අපි ගමට යමු.' },
    { id: 'Pos_Fun_0009', input: 'highway bus eka 11ta pitath venne.', expected: 'highway bus එක 11ට පිටත් වෙන්නෙ.' },
    { id: 'Pos_Fun_0010', input: 'thaaththaa mata ru.5000 k dhunnaa eeken ru.1000 k mama mallita dhunnaa.', expected: 'තාත්තා මට රු.5000 ක් දුන්නා ඒකෙන් රු.1000 ක් මම මල්ලිට දුන්නා.' },
    { id: 'Pos_Fun_0011', input: 'karuNaakaralaa mata mee dhora aeralaa dhenna.', expected: 'කරුණාකරලා මට මේ දොර ඇරලා දෙන්න.' },
    { id: 'Pos_Fun_0012', input: 'apee gamee mee paarath avurudhu uthsavayak thiyenavaa.', expected: 'අපේ ගමේ මේ පාරත් අවුරුදු උත්සවයක් තියෙනවා.' },
    { id: 'Pos_Fun_0013', input: 'maha vaesi saha sulu vaayu Dhaaraava heathuven, dhivayinee bohoo pradheesha vala jalaya vaedivemin pavathina athara, janathaava mema vasara thula vishaala aapadhaavakata muhuna dhena bava kaalaguNa vaarThaa penvaa dheyi.', expected: 'මහ වැසි සහ සුලු වායු ධාරාව හේතුවෙන්, දිවයිනේ බොහෝ ප්‍රදේශ වල ජලය වැඩිවෙමින් පවතින අතර, ජනතාව මෙම වසර තුල විශාල ආපදාවකට මුහුන දෙන බව කාලගුණ වාර්ථා පෙන්වා දෙයි.'},
    { id: 'Pos_Fun_0014', input: 'mata oyaagea sinhala note eka dhenna puluvandha?', expected: 'මට ඔයාගේ sinhala note එක දෙන්න පුලුවන්ද?' },
    { id: 'Pos_Fun_0015', input: 'haal kiloo 1k kiralaa dhenna.', expected: 'හාල් කිලෝ 1ක් කිරලා දෙන්න.' },
    { id: 'Pos_Fun_0016', input: '12/05/2026 kiyanne mage birthday eka', expected: '12/05/2026 කියන්නෙ mage birthday එක' },
    { id: 'Pos_Fun_0017', input: 'maamaa kaeema eka kaevaadha?', expected: 'මාමා කෑම එක කැවාද?' },
    { id: 'Pos_Fun_0018', input: 'dhuvagea home coming eka 2026.02.17 venidhaa thiyenavaa.', expected: 'දුවගේ home coming එක 2026.02.17 වෙනිදා තියෙනවා.' },
    { id: 'Pos_Fun_0019', input: 'ee resturant ekee rasa kaeema thiyenavaa.', expected: 'ඒ රෙස්ටුරන්ට් එකේ රස කෑම තියෙනවා.' },
    { id: 'Pos_Fun_0020', input: 'karuNaakaralaa mata call ekak ganna.', expected: 'කරුණාකරලා මට call එකක් ගන්න.' },
    { id: 'Pos_Fun_0021', input: 'oyaagee ammata dhaen saniipayidha?', expected: 'ඔයාගේ අම්මට දැන් සනීපයිද?' },
    { id: 'Pos_Fun_0022', input: 'puluvan ikmaNata meheta enna.', expected: 'පුලුවන් ඉක්මණට මෙහෙට එන්න.  ' },
    { id: 'Pos_Fun_0023', input: 'apita oyaagea address eka dhenavadha?', expected: 'අපිට ඔයාගේ address එක දෙනවද?' },
    { id: 'Pos_Fun_0024', input: 'ovu, mama oyaata udhavu karannam.', expected: 'ඔවු, මම ඔයාට උදවු කරන්නම්.' },
    { id: 'Pos_Fun_0025', input: 'aeththa magen vaeradhdhak vunea.samaavenna mata.', expected: 'ඇත්ත මගෙන් වැරද්දක් වුනේ.සමාවෙන්න මට.' },
  ];

  // for loop
  for (const data of testScenarios) {
    test(`${data.id}: ${data.input}`, async ({ page }) => {
    test.setTimeout(70000);

      const inputField = page.locator('textarea').first();
      const outputField = page.locator('div:has-text("Sinhala")').locator('xpath=following::div[contains(@class,"whitespace-pre-wrap")]').first();

      // Input items
      await inputField.fill(data.input);

      // waiting to translate
      await page.waitForTimeout(2000);

      // Output is empty sometimes, retry with same input
      await ensureOutputNotEmpty({ page, inputField, outputField, originalInput: data.input });

      // Display actual output
      const actualOutput = await outputField.innerText();
      console.log(`${data.id} Actual Output: ${actualOutput}`);

      // Comparing
      await expect(outputField).toHaveText(data.expected, { timeout: 25000 });
    });
  }
});
