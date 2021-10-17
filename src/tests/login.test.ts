import { LoginPage } from '../pages/loginPage';
import { getBaseUrl } from '../utils/helpers';

const credentials = require('../../data/login-data.json');

fixture`Login journey for valid user credentials`.page(
  getBaseUrl(process.env.ENVIRONMENT)
);
test.meta({ feature: 'login', category: 'sanity' }).meta('category', 'sanity')(
  'User should be able to login with valid credentials',
  async () => {
    const loginPage = new LoginPage();
    await loginPage.clickSignIn();
    await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
    await loginPage.verifyLandingPageAfterLogin();
  }
);

fixture`Login journey for invalid/unregistered/empty user credentials`.page(
  getBaseUrl(process.env.ENVIRONMENT)
);
credentials.forEach((data) => {
  test.meta({ feature: 'login', category: 'sanity' })(
    `User should see error messages while logging in with ${data.feature}`,
    async () => {
      const loginPage = new LoginPage();
      await loginPage.clickSignIn();
      await loginPage.login(data.email, data.password);
      await loginPage.verifyErrorMessage(data.errorMessage);
    }
  );
});
