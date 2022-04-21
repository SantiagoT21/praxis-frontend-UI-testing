import { ItemsContentPage,AddButtonPage } from "../page/index"

describe("Updating Item Type", () => {

    let menuContentPage: ItemsContentPage
    let addButtonPage: AddButtonPage

    const name = "Miel"
    const sellin = 20
    const quality = 50
    const type = "NORMAL"
    const newType = "AGED"

    before(() => {
        menuContentPage = new ItemsContentPage()
        addButtonPage = new AddButtonPage()
         cy.request("http://localhost:8080/api/items").then(response =>{
                    for (const item of response.body) {
                            cy.request("DELETE","http://localhost:8080/api/items/"+item.id)
                    }
                })

        cy.request("POST","http://localhost:8080/api/items/", {"name" : name,"sellIn": sellin,"quality" : quality,"type": type})
    })

    it("then should update the type of an existing item, verify if it changes in the items list view and updates the amount in insights menu ", () => {


        menuContentPage.visitMenuContentPage()
        menuContentPage.clickFirtsEditButton()

        addButtonPage.clickTypeSelectField()
        addButtonPage.chooseTypeSelection(newType)
        addButtonPage.clickAddConfirmButton()

        cy.wait(1000)

        cy.get("[data-automation=list-item-row]").then(rows => {
            let validated = false
            for (let i = 0; i < rows.length; i++) {
                const cols = rows[i].querySelectorAll(".list-col")
                if (cols[0].textContent === name && cols[1].textContent === sellin.toString() && cols[2].textContent === quality.toString() && cols[3].textContent === newType) {
                    validated = true
                }
            }
            expect(validated).to.be.true
        })

        menuContentPage.clickInsightsButton()

        cy.wait(1000)

        cy.get(".insights-grid .insights-value").then(values => {
            let validatedInsights = false
            for (let i = 0; i < values.length-1; i++) {
                if(values[i].innerText === newType && values[i+1].innerText === "1"){
                    validatedInsights = true
                }
            }
            expect(validatedInsights).to.be.true
        })
    });
});
