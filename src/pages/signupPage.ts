import {Selector, t} from "testcafe"
import {BasePage} from "./basePage";
import {LoginPage} from "./loginPage";
import {WELCOME_TO_MY_ACCOUNT} from "../../utils/constants";
const faker = require('faker');

export class SignupPage extends BasePage{
    private newAccountCreationForm = Selector("#account-creation_form");
    private createAccountForm = Selector("form#create-account_form");
    private emailTextBox = Selector("input#email_create");
    private submitButton = Selector("button#SubmitCreate");
    private userTitle = Selector("#id_gender1");
    private customerFirstName = Selector("#customer_firstname");
    private customerLastName = Selector("#customer_lastname");
    private enterPasswordForCustomer = Selector("#passwd");
    private selectDays = Selector("#days");
    private daysOption = this.selectDays.find('option');
    private selectMonths = Selector("#months");
    private monthsOption = this.selectMonths.find('option');
    private selectYears = Selector("#years");
    private yearsOption = this.selectYears.find('option');
    private enterCompanyNameOfCustomer = Selector("#company");
    private enterAddressLine1 = Selector("#address1");
    private enterCity = Selector("#city");
    private selectState = Selector("#id_state");
    private stateOption = this.selectState.find('option');
    private enterPostCode = Selector("#postcode");
    private enterOthers = Selector("#other");
    private enterPhoneNumber = Selector("#phone");
    private enterMobilePhone = Selector("#phone_mobile");
    private enterAlias = Selector("#alias");
    private registerAccountButton = Selector("#submitAccount");
    private landingPage = Selector('.addresses-lists');

    async enterEmailAddressToCreateAccount(){
        await this.waitForElement(this.createAccountForm);
        await this.sendKeys(this.emailTextBox, faker.internet.email(faker.name.firstName()+faker.name.lastName()+faker.lorem.word(5)))
        await this.click(this.submitButton);
    }

    async validateCreateAccountPageForNewUser(){
        await this.waitForElement(this.newAccountCreationForm);
        await t.expect(this.newAccountCreationForm.visible).ok();
    }

    async enterPersonalInformationOfUser() {
        await this.click(this.userTitle)
        await this.sendKeys(this.customerFirstName, faker.name.firstName());
        await this.sendKeys(this.customerLastName, faker.name.lastName());
        await this.sendKeys(this.enterPasswordForCustomer, faker.internet.password(10));
        await this.selectOptionFromDropDown(this.selectDays, this.daysOption, '1');
        await this.selectOptionFromDropDown(this.selectMonths, this.monthsOption, 'January');
        await this.selectOptionFromDropDown(this.selectYears, this.yearsOption, '2000');
    }

    async enterUserAddress(){
        let postCode = (Math.floor(Math.random()*90000) + 10000).toString()
        await this.sendKeys(this.enterCompanyNameOfCustomer, faker.company.companyName());
        await this.sendKeys(this.enterAddressLine1, faker.address.streetAddress());
        await this.sendKeys(this.enterCity, faker.address.city());
        await this.selectOptionFromDropDown(this.selectState, this.stateOption, 'Alabama');
        await this.sendKeys(this.enterPostCode, postCode);
        await this.sendKeys(
            this.enterOthers, faker.address.country());
        await this.sendKeys(this.enterAlias, faker.address.city());
    }

    async enterPhoneNumberForUser(){
        let number = (Math.floor(Math.random()*9000000000) + 10000).toString();
        await this.sendKeys(this.enterPhoneNumber, number);
        await this.sendKeys(this.enterMobilePhone, number);
    }

    async registerUser(){
        await this.click(this.registerAccountButton);
        await this.waitForElement(this.landingPage);
        await t.expect(this.landingPage.visible).ok();
    }
}