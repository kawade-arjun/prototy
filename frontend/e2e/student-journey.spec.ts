import { test, expect } from '@playwright/test';

test.describe('CareerLens Six-Stage Student Journey E2E', () => {
  test('Complete journey: Login → Onboard → Resume Mapping → Proctored Assessment → Portfolio', async ({ page }) => {
    // 1. Stage: /login
    await page.goto('/login');
    await expect(page.getByText('Welcome to CareerLens')).toBeVisible();
    await expect(page.getByRole('button', { name: /Continue with DigiLocker/i })).toBeVisible();
    await expect(page.getByText(/What does DigiLocker access grant/i)).toBeVisible();

    // Click Continue with DigiLocker
    await page.getByRole('button', { name: /Continue with DigiLocker/i }).click();

    // 2. Stage: /onboarding
    await page.waitForURL('/onboarding', { timeout: 10000 });
    await expect(page.getByText(/Choose Your Career Track & Verify Profile/i)).toBeVisible();
    await expect(page.getByText(/Tech & AI Systems/i)).toBeVisible();

    // Click proceed to resume mapping
    await page.getByRole('button', { name: /Proceed to Resume & Skill Mapping/i }).click();

    // 3. Stage: /profile/resume
    await page.waitForURL('/profile/resume', { timeout: 10000 });
    await expect(page.getByText(/Map Your Verified Skills & Projects/i)).toBeVisible();
    await expect(page.getByText(/Extracted Competencies/i)).toBeVisible();
    await expect(page.getByText('Python')).toBeVisible();

    // Click confirm skills and take assessment
    await page.getByRole('button', { name: /Confirm Skills & Take Assessment/i }).click();

    // 4. Stage: /assessment/tech
    await page.waitForURL('/assessment/tech', { timeout: 10000 });
    await expect(page.getByText(/Proctored Assessment: TECH/i)).toBeVisible();

    // Enter fullscreen lock
    await page.getByRole('button', { name: /Lock Fullscreen & Begin Assessment/i }).click();

    // Verify Stage 1: Aptitude
    await expect(page.getByText(/Stage 1: Cognitive Aptitude & Logical Reasoning/i)).toBeVisible();
    await page.locator('input[name="q1"]').first().check();
    await page.locator('input[name="q2"]').first().check();
    await page.getByRole('button', { name: /Next: Domain Technical/i }).click();

    // Verify Stage 2: Technical Live Coding is visible
    await expect(page.getByText(/Stage 2: Technical Live Coding/i)).toBeVisible();

    // 5. Stage: View Profile & Competency Provenance
    await page.goto('/profile');
    await expect(page.getByRole('heading', { name: 'Arjun Kawade' })).toBeVisible();
    await expect(page.getByText(/Verified Competency Graph/i)).toBeVisible();

    // Click on a skill to test the Competency Provenance modal
    await page.getByText('FastAPI Microservices').first().click();
    await expect(page.getByText(/Competency Provenance/i).first()).toBeVisible();
    await expect(page.getByText(/Source Type/i)).toBeVisible();
    await page.getByRole('button', { name: /Close Provenance/i }).click();

    // 6. Verify 3-Tier Certificates page
    await page.goto('/profile/certificates');
    await expect(page.getByText(/Verified Academic & Industry Credentials/i)).toBeVisible();
    await expect(page.getByText(/Verified \(DigiLocker\)/i).first()).toBeVisible();
    await expect(page.getByText(/Verified \(Issuer Portal\)/i).first()).toBeVisible();
    await expect(page.getByText(/Unverified — pattern check only/i).first()).toBeVisible();

    // 7. Verify Opportunities page (Mutual-Interest Gate)
    await page.goto('/opportunities');
    await expect(page.getByText(/Ranked Opportunities & Placements/i)).toBeVisible();
    await expect(page.getByText(/Mutual-Interest Gate/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /I am Interested/i }).first()).toBeVisible();

    // 8. Verify Learning Path page
    await page.goto('/learning-path');
    await expect(page.getByText(/Target Role Skill Gap & Learning Path/i)).toBeVisible();
    await expect(page.getByText(/Why recommended:/i).first()).toBeVisible();
  });
});
