import { LoginPage } from '../pages/loginPage';
import {SignupPage} from "../pages/signupPage";

const baseUrl = 'http://www.automationpractice.com'
fixture `User signup to the application` .page(baseUrl);

test('Register user to the application', async () => {
  const signupPage = new SignupPage();
  const loginPage = new LoginPage();
  await loginPage.clickSignIn();
  await signupPage.enterEmailAddressToCreateAccount();
  await signupPage.validateCreateAccountPageForNewUser();
  await signupPage.enterPersonalInformationOfUser();
  await signupPage.enterUserAddress();
  await signupPage.enterPhoneNumberForUser();
  await signupPage.registerUser();
});
