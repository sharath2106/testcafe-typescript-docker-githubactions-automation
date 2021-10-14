import { Selector, t } from 'testcafe';
import {BasePage} from "./basePage";

export class LoginPage extends BasePage{
  private homePage = Selector('#block_top_menu');
  private signIn = Selector('a.login');
  private loginForm = Selector('form#login_form');
  private email = Selector('input#email');
  private password = Selector('input#passwd');
  private loginButton = Selector('button#SubmitLogin');
  private landingPage = Selector('div#center_column');
  private errorMessage = Selector('div#center_column li');

  constructor() {
    super();
  }

  async clickSignIn(): Promise<void> {
    await this.waitForElement(this.homePage);
    await this.click(this.signIn);
  }

  async login(email, password): Promise<void> {
    await this.waitForElement(this.loginForm);
    await this.sendKeys(this.email, email);
    await this.sendKeys(this.password, password);
    await this.click(this.loginButton);
  }

  async verifyLandingPageAfterLogin(){
    await this.waitForElement(this.landingPage);
  }

  async verifyErrorMessage(message: string) {
    await this.waitForElement(this.errorMessage);
    await t.expect(this.getText(this.errorMessage)).eql(message);
  }
}
