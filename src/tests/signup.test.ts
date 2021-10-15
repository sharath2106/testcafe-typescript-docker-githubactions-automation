import { LoginPage } from '../pages/loginPage';
import {SignupPage} from "../pages/signupPage";
import {
  NO_OF_ERRORS_FOR_FILLING_ONLY_PERSONAL_INFO,
  NO_OF_ERRORS_FOR_NOT_FILLING_CREATE_USER_FORM,
  NO_OF_ERRORS_FOR_NOT_FILLING_PERSONAL_INFO
} from "../../utils/constants";

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
