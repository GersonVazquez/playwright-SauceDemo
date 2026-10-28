import { test, expect } from '@playwright/test';

const name = 'Jorge';
const lName = 'Namelo';
const postalCode = '11400';
const userName = 'standard_user';
const password = 'secret_sauce';
const addCart = 'add-to-cart-sauce-labs-';
const items = ["backpack", "bike-light", "bolt-t-shirt", "fleece-jacket", "onesie"];

test('Checkout completo', async ({ page }) => {
    await test.step('Entrando en la web', async () => {
        await page.goto('/');
    })

    await test.step('Ingresando user, contraseña y login', async () => {
        await page.locator('[data-test="username"]').fill(userName);
        await page.locator('[data-test="password"]').fill(password);
        await page.locator('[data-test="login-button"]').click()
    })

    await test.step('Agregando items al carrito', async () => {
        for (const item of items) {
            await page.locator(`[data-test="${addCart}${item}"]`).click();
        }
    })

    await test.step('Ingresando al carrito', async () => {
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL('/cart.html');
        await expect(page.locator('[data-test="title"]')).toBeVisible();
    })

    await test.step('Checkout y redireccion a la pagina', async () => {
        await page.locator('[data-test="checkout"]').click();
        await expect(page).toHaveURL('/checkout-step-one.html');
        await expect(page.locator('[data-test="title"]')).toBeVisible();
    })

    await test.step('Llenando formulario', async () => {
        await page.locator('[data-test="firstName"]').fill(name);
        await page.locator('[data-test="lastName"]').fill(lName);
        await page.locator('[data-test="postalCode"]').fill(postalCode);
        await page.locator('[data-test="continue"]').click();

        await expect(page).toHaveURL('/checkout-step-two.html');
        await expect(page.locator('[data-test="title"]')).toBeVisible();
    })

    await test.step('Estando en checkout', async () => {
        await page.locator('[data-test="finish"]').click();

        await expect(page).toHaveURL('/checkout-complete.html');
        await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
    })

    await test.step('Volviendo a la pagina principal', async () => {
        await page.locator('[data-test="back-to-products"]').click();

        await expect(page).toHaveURL('/inventory.html')
        await expect(page.locator('[data-test="title"]')).toBeVisible();
    })
});