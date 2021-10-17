import { LoginPage } from '../pages/loginPage';
import { SignupPage } from '../pages/signupPage';
import {
  NO_OF_ERRORS_FOR_FILLING_ONLY_PERSONAL_INFO,
  NO_OF_ERRORS_FOR_NOT_FILLING_CREATE_USER_FORM,
  NO_OF_ERRORS_FOR_NOT_FILLING_PERSONAL_INFO,
} from '../utils/constants';
import { getBaseUrl } from '../utils/helpers';

let signupPage: SignupPage;
let loginPage: LoginPage;

fixture`User signup to the application`
  .page(getBaseUrl(process.env.ENVIRONMENT))
  .beforeEach(async () => {
    signupPage = new SignupPage();
    loginPage = new LoginPage();
    await loginPage.clickSignIn();
    await signupPage.enterEmailAddressToCreateAccount();
    await signupPage.validateCreateAccountPageForNewUser();
  });

test.meta({ feature: 'signup', category: 'sanity' })(
  'User should be able to register to the application successfully',
  async () => {
    await signupPage.enterPersonalInformationOfUser();
    await signupPage.enterUserAddress();
    await signupPage.enterPhoneNumberForUser();
    await signupPage.registerUser();
    await signupPage.verifyLandingPageAfterSuccessfulSignUp();
  }
);

test.meta({ feature: 'signup', category: 'sanity' })(
  'User should see the error messages on trying to register without filling the form',
  async () => {
    await signupPage.registerUser();
    await signupPage.verifyErrorMessagesAfterValidation(
      NO_OF_ERRORS_FOR_NOT_FILLING_CREATE_USER_FORM
    );
  }
);

test.meta({ feature: 'signup', category: 'sanity' })(
  'User should see the error messages on trying to register by just filling the personal information',
  async () => {
    await signupPage.enterPersonalInformationOfUser();
    await signupPage.registerUser();
    await signupPage.verifyErrorMessagesAfterValidation(
      NO_OF_ERRORS_FOR_FILLING_ONLY_PERSONAL_INFO
    );
  }
);

test.meta({ feature: 'signup', category: 'sanity' })(
  'User should see the error messages on trying to register by filling only the address and phone number details',
  async () => {
    await signupPage.enterUserAddress();
    await signupPage.enterPhoneNumberForUser();
    await signupPage.registerUser();
    await signupPage.verifyErrorMessagesAfterValidation(
      NO_OF_ERRORS_FOR_NOT_FILLING_PERSONAL_INFO
    );
  }
);
