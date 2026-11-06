import { test, expect } from '@playwright/test';

const api = process.env.E2E_API_URL ?? 'http://localhost:3201';
const web = process.env.E2E_WEB_URL ?? 'http://localhost:3200';
test.skip(!process.env.E2E_ADMIN_EMAIL || !process.env.E2E_ADMIN_PASSWORD, 'Use an isolated stack and test Admin credentials.');

test('đổi tên trên System Admin đồng bộ login, Kho/Nhà hàng, footer và tiêu đề tab đang mở', async ({ page, browser, request }) => {
  const signedIn = await request.post(api+'/api/auth/system-admin/login', {data:{email:process.env.E2E_ADMIN_EMAIL,password:process.env.E2E_ADMIN_PASSWORD}});
  expect(signedIn.ok()).toBeTruthy();
  const admin = (await signedIn.json()).accessToken;
  const headers = {Authorization:`Bearer ${admin}`};
  const original = await (await request.get(api+'/api/admin/settings',{headers})).json();
  const name = `Nhà hàng Đồng Bộ ${Date.now()}`;
  const created: {id:number;roleId:number}[] = [];
  const contexts = [];
  try {
    const warehousePages = [];
    for (const [label,permission] of [['Kho','inventory:view'],['Nhà hàng','product:view']]) {
      const suffix=Date.now().toString()+Math.random().toString(16).slice(2,7);
      const roleResponse=await request.post(api+'/api/admin/roles',{headers,data:{name:`branding-${suffix}`,description:'Temporary branding test',portal:'warehouse',permissions:[permission]}});
      expect(roleResponse.ok()).toBeTruthy();const role=await roleResponse.json();
      const email=`branding-${suffix}@example.com`;
      const accountResponse=await request.post(api+'/api/admin/accounts',{headers,data:{name:label,email,password:'BrowserBrand@123',role:role.name}});
      expect(accountResponse.ok()).toBeTruthy();const account=await accountResponse.json();created.push({id:account.id,roleId:role.id});
      const login=await request.post(api+'/api/auth/login',{data:{email,password:'BrowserBrand@123'}});
      expect(login.ok()).toBeTruthy();const session=await login.json();
      const context=await browser.newContext();contexts.push(context);
      await context.addInitScript(({accessToken,user})=>{
        localStorage.setItem('warehouse_access_token',accessToken);localStorage.setItem('warehouse_auth_user',JSON.stringify(user));
      },session);
      const warehouse=await context.newPage();warehousePages.push(warehouse);
      await warehouse.goto(web+'/warehouse');
      await expect(warehouse.locator('.brand-copy strong')).toHaveText(original.restaurantName);
    }
    const visitorContext=await browser.newContext();contexts.push(visitorContext);
    const visitor=await visitorContext.newPage();await visitor.goto(web+'/login');
    await expect(visitor.locator('.lg-brand')).toContainText(original.restaurantName);

    await page.goto('/login');
    await page.getByLabel('Email',{exact:true}).fill(process.env.E2E_ADMIN_EMAIL!);
    await page.getByLabel('Mật khẩu',{exact:true}).fill(process.env.E2E_ADMIN_PASSWORD!);
    await page.getByRole('button',{name:'Đăng nhập',exact:true}).click();
    await expect(page).toHaveURL(/:\d+\/$/);
    await page.goto('/settings');
    await expect(page.getByLabel('Tên nhà hàng / Doanh nghiệp',{exact:true})).toHaveValue(original.restaurantName);
    await page.getByLabel('Tên nhà hàng / Doanh nghiệp',{exact:true}).fill(name);
    const [saved] = await Promise.all([
      page.waitForResponse(response=>response.url()===api+'/api/admin/settings'&&response.request().method()==='PUT'),
      page.getByRole('button',{name:/Lưu cấu hình$/}).click(),
    ]);
    expect(saved.ok()).toBeTruthy();
    await expect(page.locator('.ant-layout-sider')).toContainText(name);
    await expect(page.locator('.ant-layout-header')).toContainText(name);
    await expect(page).toHaveTitle(new RegExp(name));
    for(const warehouse of warehousePages) {
      await warehouse.bringToFront();
      await expect(warehouse.locator('.brand-copy strong')).toHaveText(name);
      await expect(warehouse.locator('.app-footer')).toContainText(name);
      await expect(warehouse).toHaveTitle(new RegExp(name));
    }
    await visitor.bringToFront();await expect(visitor.locator('.lg-brand')).toContainText(name);
    await expect(visitor).toHaveTitle(new RegExp(name));
    await page.bringToFront();await page.goto('/');
    await expect(page.locator('main')).toContainText(name);
    await visitor.reload();await expect(visitor.locator('.lg-brand')).toContainText(name);
  } finally {
    for(const context of contexts) await context.close();
    // Restore only our own test value, preserving unrelated settings and any later user rename.
    const current=await (await request.get(api+'/api/public/branding')).json();
    if(current.restaurantName===name) {
      const restored=await request.put(api+'/api/admin/settings',{headers,data:{restaurantName:original.restaurantName}});
      expect(restored.ok()).toBeTruthy();
    }
    for(const account of created) {
      await request.delete(api+`/api/admin/accounts/${account.id}`,{headers});
      await request.delete(api+`/api/admin/roles/${account.roleId}`,{headers});
    }
    await request.post(api+'/api/auth/logout',{headers});
  }
});
