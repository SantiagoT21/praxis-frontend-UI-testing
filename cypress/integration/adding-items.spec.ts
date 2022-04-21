import { ItemsContentPage,AddButtonPage } from "../page/index"

describe("Adding Items", () => {

    let menuContentPage: ItemsContentPage
    let addButttonPage: AddButtonPage

    const name = "panela"
    const sellin = "10"
    const quality = "50"
    const type = "NORMAL"

    before(() => {
        menuContentPage = new ItemsContentPage()
        addButttonPage = new AddButtonPage()
    })

    it("then should be added a new item, and check if displayed accordingly in list view", () => {

        cy.request("http://localhost:8080/api/items").then(response =>{
            for (const item of response.body) {
                if(item.name === name && item.sellIn.toString() === sellin && item.quality.toString() === quality && item.type === type){
                    cy.request("DELETE","http://localhost:8080/api/items/"+item.id)
                }
            }
        })

        menuContentPage.visitMenuContentPage()
        menuContentPage.clickAddButton()

        addButttonPage.goToNameTextField(name)
        addButttonPage.goToSellInTextField(sellin)
        addButttonPage.goToQualityTextField(quality)
        addButttonPage.clickTypeSelectField()
        addButttonPage.chooseTypeSelection(type)
        addButttonPage.clickAddConfirmButton()

        cy.wait(1000)

         cy.get("[data-automation=list-item-row]").then(rows => {
            let validated = false
            for (let i = 0; i < rows.length; i++) {
                const cols = rows[i].querySelectorAll(".list-col")
                if (cols[0].textContent === name && cols[1].textContent === sellin && cols[2].textContent === quality && cols[3].textContent === type) {
                    validated = true
                }
            }
            expect(validated).to.be.true
        })

    });
});