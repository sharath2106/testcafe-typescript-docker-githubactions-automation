import {Selector, t} from "testcafe";

export class BasePage {
    async waitForElement(element: Selector){
        await t.expect(element.visible).ok();
    }
    async click(element: Selector){
       await t.click(element);
    }

    async sendKeys(element: Selector, keys: any){
        await t.typeText(element, keys);
    }

    getText(element: Selector) {
        return element.textContent
    }

    async selectOptionFromDropDown(selectDropDown: Selector, option: Selector, text: string){
        await t.click(selectDropDown).click(option.withText(text))
    }
}