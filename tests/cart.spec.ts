import { test, expect } from '@playwright/test';

const userName = 'standard_user';
const password = 'secret_sauce';
const addCart = 'add-to-cart-sauce-labs-';
const items = ["backpack", "bike-light", "bolt-t-shirt", "fleece-jacket", "onesie"];

test('Dado que agrego items al carrito', async ({ page }) => {
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

    await test.step('Verificando los items en el carrito', async () => {
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(String(items.length));
    })

});


