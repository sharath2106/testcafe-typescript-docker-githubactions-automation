import { Selector, t } from 'testcafe';
import { LoginPage } from './loginPage';
import { WELCOME_TO_MY_ACCOUNT } from '../utils/constants';
import { logger } from '../utils/logger';
const faker = require('faker');

export class SignupPage {
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
      await t.expect(this.createAccountForm.visible).ok();
      await t.typeText(
        this.emailTextBox,
        faker.internet.email(
          faker.name.firstName() + faker.name.lastName() + faker.lorem.word(5)
        )
      );
      await t.click(this.submitButton);
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
      await t.expect(this.newAccountCreationForm.visible).ok();
      logger.info('User landed on create account page');
    } catch (e) {
      logger.error('User not landed on create account page', e);
      throw e;
    }
  }

  async enterPersonalInformationOfUser() {
    try {
      await t.click(this.userTitle);
      await t.typeText(this.customerFirstName, faker.name.firstName());
      await t.typeText(this.customerLastName, faker.name.lastName());
      await t.typeText(
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
      await t.typeText(
        this.enterCompanyNameOfCustomer,
        faker.company.companyName()
      );
      await t.typeText(
        this.enterAddressLine1,
        faker.address.streetAddress()
      );
      await t.typeText(this.enterCity, faker.address.city());
      await this.selectOptionFromDropDown(
        this.selectState,
        this.stateOption,
        'Alabama'
      );
      await t.typeText(this.enterPostCode, postCode);
      await t.typeText(this.enterOthers, faker.address.country());
      await t.typeText(this.enterAlias, faker.address.city());
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
      await t.typeText(this.enterPhoneNumber, number);
      await t.typeText(this.enterMobilePhone, number);
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
      await t.click(this.registerAccountButton);
      logger.info('Clicked on register button');
    } catch (e) {
      logger.error('Error while clicking on register button', e);
      throw e;
    }
  }

  async verifyLandingPageAfterSuccessfulSignUp() {
    try {
      await t.expect(new LoginPage().landingPage.visible).ok();
      await t.expect(new LoginPage().landingPage.visible).ok();
      await t
        .expect(new LoginPage().welcomeBanner.innerText)
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
      let actualErrorMessage = this.errorMessage.innerText;

      await t.expect(actualErrorMessage).contains(expectedErrorMessage);
    } catch (e) {
      logger.error('Error message not displayed in the panel', e);
      throw e;
    }
  }

  private async selectOptionFromDropDown(
      selectDropDown: Selector,
      option: Selector,
      text: string
  ) {
    await t.click(selectDropDown).click(option.withText(text));
  }
}
