import { Selector, t } from 'testcafe';
import { WELCOME_TO_MY_ACCOUNT } from '../utils/constants';
import { logger } from '../utils/logger';

export class LoginPage {
  private homePage = Selector('#block_top_menu');
  private signIn = Selector('a.login');
  private loginForm = Selector('form#login_form');
  private email = Selector('input#email');
  private password = Selector('input#passwd');
  private loginButton = Selector('button#SubmitLogin');
  private errorMessage = Selector('div#center_column li');
  landingPage = Selector('div#center_column');
  welcomeBanner = Selector('.info-account');

  async clickSignIn(): Promise<void> {
    try {
      await t.expect(this.homePage.visible).ok();
      await t.click(this.signIn);
      logger.info('Clicked on Sign in button');
    } catch (e) {
      logger.error('Error while clicking on sign in button', e);
      throw e;
    }
  }

  async login(email, password): Promise<void> {
    try {
      await t.expect(this.loginForm.visible).ok();
      await t.typeText(this.email, email);
      await t.typeText(this.password, password);
      await t.click(this.loginButton);
      logger.info('User logged in with email id and password');
    } catch (e) {
      logger.error(
        'Error while logging into the application with the credentials',
        e
      );
      throw e;
    }
  }

  async verifyLandingPageAfterLogin() {
    try {
      await t.expect(this.landingPage.visible).ok();
      await t.expect(this.landingPage.visible).ok();
      await t
        .expect(this.welcomeBanner.innerText)
        .contains(WELCOME_TO_MY_ACCOUNT);
      logger.info('Verified landing page after login');
    } catch (e) {
      logger.error('Error while verifying the user landing page', e);
      throw e;
    }
  }

  async verifyErrorMessage(message: string) {
    try {
      await t.expect(this.errorMessage.visible).ok();
      await t.expect(this.errorMessage.innerText).eql(message);
      logger.info('Verified error message');
    } catch (e) {
      logger.error('Error while verifying the error message', e);
      throw e;
    }
  }
}
