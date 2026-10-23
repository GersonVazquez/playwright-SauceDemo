import {test, expect} from '@playwright/test';

const userName = 'standard_user';
const password = 'secret_sauce';

test('Login de SauceDemo', async ({ page }) => {
    await test.step('Entrando en la web', async () => {
        await page.goto('/');
    })
    
    await test.step('Ingresando user, contraseña y login', async () => {
        await page.locator('[data-test="username"]').fill(userName);
        await page.locator('[data-test="password"]').fill(password);
        await page.locator('[data-test="login-button"]').click()
    })
    

    await test.step('Pagina Correcta', async () => {
        await expect(page).toHaveURL('/inventory.html');
        await expect(page.getByText('Products')).toBeVisible();
    })
    
    
});
