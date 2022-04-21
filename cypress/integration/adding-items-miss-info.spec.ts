import { ItemsContentPage,AddButtonPage } from "../page/index"

describe("Adding Items Missing Info", () => {

    let menuContentPage: ItemsContentPage
    let addButttonPage: AddButtonPage

    const name = "manzana"
    const sellin = "10"
    const quality = "-2"
    const type = "NORMAL"

    before(() => {
        menuContentPage = new ItemsContentPage()
        addButttonPage = new AddButtonPage()
    })

    it("then should be added an item with negative quality, an error message will be displayed and add button disabled", () => {

        menuContentPage.visitMenuContentPage()
        menuContentPage.clickAddButton()
        addButttonPage.goToNameTextField(name)
        addButttonPage.goToSellInTextField(sellin)
        addButttonPage.goToQualityTextField(quality)
        addButttonPage.clickTypeSelectField()
        addButttonPage.chooseTypeSelection(type)

        addButttonPage.verityAddConfirmButton()
        addButttonPage.verifyErrorMessage()
    });
});