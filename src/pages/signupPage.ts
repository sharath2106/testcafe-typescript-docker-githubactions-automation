import { Selector, t } from 'testcafe';
import { BasePage } from './basePage';
import { LoginPage } from './loginPage';
import { WELCOME_TO_MY_ACCOUNT } from '../utils/constants';
import { logger } from '../utils/logger';
const faker = require('faker');

export class SignupPage extends BasePage {
  private newAccountCreationForm = Selector('#account-creation_form');
  private createAccountForm = Selector('form#create-account_form');
  private emailTextBox = Selector('input#email_create');
  private submitButton = Selector('button#SubmitCreate');
  private userTitle = Selector('#id_gender1');
  private customerFirstName = Selector('#customer_firstname');
  private customerLastName = Selector('#customer_lastname');
  private enterPasswordForCustomer = Selector('#passwd');
  private selectDays = Selector('#days');
  private daysOption = this.selectDays.find('option');
  private selectMonths = Selector('#months');
  private monthsOption = this.selectMonths.find('option');
  private selectYears = Selector('#years');
  private yearsOption = this.selectYears.find('option');
  private enterCompanyNameOfCustomer = Selector('#company');
  private enterAddressLine1 = Selector('#address1');
  private enterCity = Selector('#city');
  private selectState = Selector('#id_state');
  private stateOption = this.selectState.find('option');
  private enterPostCode = Selector('#postcode');
  private enterOthers = Selector('#other');
  private enterPhoneNumber = Selector('#phone');
  private enterMobilePhone = Selector('#phone_mobile');
  private enterAlias = Selector('#alias');
  private registerAccountButton = Selector('#submitAccount');
  private errorMessage = Selector('.alert-danger p');

  async enterEmailAddressToCreateAccount() {
    try {
      await this.waitForElement(this.createAccountForm);
      await this.sendKeys(
        this.emailTextBox,
        faker.internet.email(
          faker.name.firstName() + faker.name.lastName() + faker.lorem.word(5)
        )
      );
      await this.click(this.submitButton);
      logger.info('Email address entered to create account');
    } catch (e) {
      logger.error(
        'Error while entering the email address in the create account section',
        e
      );
      throw e;
    }
  }

  async validateCreateAccountPageForNewUser() {
    try {
      await this.waitForElement(this.newAccountCreationForm);
      await t.expect(this.newAccountCreationForm.visible).ok();
      logger.info('User landed on create account page');
    } catch (e) {
      logger.error('User not landed on create account page', e);
      throw e;
    }
  }

  async enterPersonalInformationOfUser() {
    try {
      await this.click(this.userTitle);
      await this.sendKeys(this.customerFirstName, faker.name.firstName());
      await this.sendKeys(this.customerLastName, faker.name.lastName());
      await this.sendKeys(
        this.enterPasswordForCustomer,
        faker.internet.password(10)
      );
      await this.selectOptionFromDropDown(
        this.selectDays,
        this.daysOption,
        '1'
      );
      await this.selectOptionFromDropDown(
        this.selectMonths,
        this.monthsOption,
        'January'
      );
      await this.selectOptionFromDropDown(
        this.selectYears,
        this.yearsOption,
        '2000'
      );
      logger.info(
        'Entered personal details of the user in create account form'
      );
    } catch (e) {
      logger.error(
        'Error while entering the personal details of the user in the form',
        e
      );
      throw e;
    }
  }

  async enterUserAddress() {
    try {
      let postCode = (Math.floor(Math.random() * 90000) + 10000).toString();
      await this.sendKeys(
        this.enterCompanyNameOfCustomer,
        faker.company.companyName()
      );
      await this.sendKeys(
        this.enterAddressLine1,
        faker.address.streetAddress()
      );
      await this.sendKeys(this.enterCity, faker.address.city());
      await this.selectOptionFromDropDown(
        this.selectState,
        this.stateOption,
        'Alabama'
      );
      await this.sendKeys(this.enterPostCode, postCode);
      await this.sendKeys(this.enterOthers, faker.address.country());
      await this.sendKeys(this.enterAlias, faker.address.city());
      logger.info('Entered user address in the create account form');
    } catch (e) {
      logger.error(
        'Error while entering the user address in the create account form',
        e
      );
      throw e;
    }
  }

  async enterPhoneNumberForUser() {
    try {
      let number = (Math.floor(Math.random() * 9000000000) + 10000).toString();
      await this.sendKeys(this.enterPhoneNumber, number);
      await this.sendKeys(this.enterMobilePhone, number);
      logger.info('Entered phone number for the user');
    } catch (e) {
      logger.error(
        'Error while entering the phone number in the create account form'
      );
      throw e;
    }
  }

  async registerUser() {
    try {
      await this.click(this.registerAccountButton);
      logger.info('Clicked on register button');
    } catch (e) {
      logger.error('Error while clicking on register button', e);
      throw e;
    }
  }

  async verifyLandingPageAfterSuccessfulSignUp() {
    try {
      await this.waitForElement(new LoginPage().landingPage);
      await t.expect(new LoginPage().landingPage.visible).ok();
      await t
        .expect(await this.getText(new LoginPage().welcomeBanner))
        .contains(WELCOME_TO_MY_ACCOUNT);
      logger.info('Verified landing page after successful signup');
    } catch (e) {
      logger.error(
        'User not landed on the landing page after successful signup',
        e
      );
      throw e;
    }
  }

  async verifyErrorMessagesAfterValidation(numberOfErrors: string) {
    try {
      let expectedErrorMessage = `There are ${numberOfErrors} errors`;
      let actualErrorMessage = await this.getText(this.errorMessage);

      await t.expect(actualErrorMessage).contains(expectedErrorMessage);
    } catch (e) {
      logger.error('Error message not displayed in the panel', e);
      throw e;
    }
  }
}
