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

//Variable para usuario bloqueado
const userBloq = 'locked_out_user';

test('Login Usuario Bloqueado', async ({ page }) => {
    await test.step('Entrando en la web', async () => {
        await page.goto('/');
    })

    await test.step('Ingresando user bloqueado, contraseña y login', async () => {
        await page.locator('[data-test="username"]').fill(userBloq);
        await page.locator('[data-test="password"]').fill(password);
        await page.locator('[data-test="login-button"]').click()
    })

    await test.step('Verificando error con usuario bloqueado', async () => {
        await expect(page).not.toHaveURL('/inventory.html');
        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
    })    
});

