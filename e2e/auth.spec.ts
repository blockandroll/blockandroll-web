import { test, expect } from '@playwright/test'

test('unauthenticated user is redirected to login when accessing /dashboard', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page).toHaveURL('/login')
})

test('login page renders the email and password fields', async ({ page }) => {
  await page.goto('/login')
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.getByLabel('Password')).toBeVisible()
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
})
