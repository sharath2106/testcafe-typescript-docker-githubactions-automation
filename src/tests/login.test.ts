import { LoginPage } from '../pages/loginPage';

const data = require("../../data/data.json");
const baseUrl = 'http://www.automationpractice.com'

fixture `Login journey for valid user credentials` .page(baseUrl);
test(`User should be able to login with valid credentials`, async () => {
  const loginPage = new LoginPage();
  await loginPage.clickSignIn();
  await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
  await loginPage.verifyLandingPageAfterLogin();
})

fixture `Login journey for invalid/unregistered/empty user credentials` .page(baseUrl);
data.forEach(data => {
  test(`User should see error messages while logging in with ${data.feature}`, async () => {
    const loginPage = new LoginPage();
    await loginPage.clickSignIn();
    await loginPage.login(data.email, data.password);
    await loginPage.verifyErrorMessage(data.errorMessage);
  });
});