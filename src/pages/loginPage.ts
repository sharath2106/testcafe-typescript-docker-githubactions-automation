import { Selector, t } from 'testcafe';
import { BasePage } from './basePage';
import { WELCOME_TO_MY_ACCOUNT } from '../../utils/constants';
import { logger } from '../../utils/logger';

export class LoginPage extends BasePage {
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
      await this.waitForElement(this.homePage);
      await this.click(this.signIn);
      logger.info('Clicked on Sign in button');
    } catch (e) {
      logger.error('Error while clicking on sign in button', e);
      throw e;
    }
  }

  async login(email, password): Promise<void> {
    try {
      await this.waitForElement(this.loginForm);
      await this.sendKeys(this.email, email);
      await this.sendKeys(this.password, password);
      await this.click(this.loginButton);
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
      await this.waitForElement(this.landingPage);
      await t.expect(this.landingPage.visible).ok();
      await t
        .expect(await this.getText(this.welcomeBanner))
        .contains(WELCOME_TO_MY_ACCOUNT);
      logger.info('Verified landing page after login');
    } catch (e) {
      logger.error('Error while verifying the user landing page', e);
      throw e;
    }
  }

  async verifyErrorMessage(message: string) {
    try {
      await this.waitForElement(this.errorMessage);
      await t.expect(await this.getText(this.errorMessage)).eql(message);
      logger.info('Verified error message');
    } catch (e) {
      logger.error('Error while verifying the error message', e);
      throw e;
    }
  }
}
