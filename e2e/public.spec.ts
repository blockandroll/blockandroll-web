import { test, expect } from '@playwright/test'

test('landing page shows hero with CTA', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /block.*roll/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /view classes/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /get started/i })).toBeVisible()
})

test('classes link in hero navigates to /classes', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /view classes/i }).click()
  await expect(page).toHaveURL('/classes')
})

test('classes page renders heading without error', async ({ page }) => {
  await page.goto('/classes')
  await expect(page.getByRole('heading', { name: /our classes/i })).toBeVisible()
  await expect(page.locator('body')).not.toContainText('Error loading classes')
})
