import { LoginPage } from '../pages/loginPage';

const data = require("../../data/data.json");
const baseUrl = 'http://www.automationpractice.com'

data.forEach(data => {
  fixture `Login journey for ${data.feature}` .page(baseUrl);
  test(`Verify error message while logging in with ${data.feature}`, async () => {
    const loginPage = new LoginPage();
    await loginPage.clickSignIn();
    await loginPage.login(data.email, data.password);
    await loginPage.verifyErrorMessage(data.errorMessage);
  });
});

fixture `Login journey for valid user` .page(baseUrl);
test(`Verify whether user is able to login with valid credentials`, async () => {
  const loginPage = new LoginPage();
  await loginPage.clickSignIn();
  await loginPage.login('test@lorem.com', 'Abcd@1234');
  await loginPage.verifyLandingPageAfterLogin();
})