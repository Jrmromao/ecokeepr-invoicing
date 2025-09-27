import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should display sign-in and sign-up links on homepage', async ({ page }) => {
    await page.goto('/')

    // Check if sign-in and sign-up links are visible
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Get Started' })).toBeVisible()
  })

  test('should navigate to sign-in page', async ({ page }) => {
    await page.goto('/')
    
    await page.getByRole('link', { name: 'Sign In' }).click()
    
    await expect(page).toHaveURL('/sign-in')
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible()
  })

  test('should navigate to sign-up page', async ({ page }) => {
    await page.goto('/')
    
    await page.getByRole('link', { name: 'Get Started' }).click()
    
    await expect(page).toHaveURL('/sign-up')
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible()
  })

  test('should have Google sign-in button on sign-in page', async ({ page }) => {
    await page.goto('/sign-in')
    
    await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeVisible()
  })

  test('should have form fields on sign-in page', async ({ page }) => {
    await page.goto('/sign-in')
    
    await expect(page.getByLabel('Email address')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
  })

  test('should have form fields on sign-up page', async ({ page }) => {
    await page.goto('/sign-up')
    
    await expect(page.getByLabel('First name')).toBeVisible()
    await expect(page.getByLabel('Last name')).toBeVisible()
    await expect(page.getByLabel('Email address')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByLabel('Confirm password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Create account' })).toBeVisible()
  })

  test('should show validation errors for empty form submission', async ({ page }) => {
    await page.goto('/sign-in')
    
    await page.getByRole('button', { name: 'Sign in' }).click()
    
    // Check for validation errors
    await expect(page.getByText('Email is required')).toBeVisible()
    await expect(page.getByText('Password is required')).toBeVisible()
  })

  test('should show validation errors for invalid email', async ({ page }) => {
    await page.goto('/sign-in')
    
    await page.getByLabel('Email address').fill('invalid-email')
    await page.getByLabel('Password').fill('password123')
    await page.getByRole('button', { name: 'Sign in' }).click()
    
    await expect(page.getByText('Please enter a valid email address')).toBeVisible()
  })

  test('should show validation errors for short password', async ({ page }) => {
    await page.goto('/sign-in')
    
    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByLabel('Password').fill('123')
    await page.getByRole('button', { name: 'Sign in' }).click()
    
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible()
  })
})
