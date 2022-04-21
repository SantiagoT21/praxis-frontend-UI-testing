import { ItemsContentPage } from "../page/index"

describe("Deleting Items", () => {

    let menuContentPage: ItemsContentPage

    const item1name = "Miel"
    const item1sellin = 20
    const item1quality = 50
    const item1type = "NORMAL"

     const item2name = "Chocolate"
     const item2sellin = 12
     const item2quality = 40
     const item2type = "NORMAL"


    before(() => {
            menuContentPage = new ItemsContentPage()
        })

    it("then should delete and stop displaying the item deleted in list view and insight information updated", () => {

        cy.request("http://localhost:8080/api/items").then(response =>{
            for (const item of response.body) {
                    cy.request("DELETE","http://localhost:8080/api/items/"+item.id)
            }
        })

        cy.request("POST","http://localhost:8080/api/items/", {"name" : item1name,"sellIn": item1sellin,"quality" : item1quality,"type": item1type})
        cy.request("POST","http://localhost:8080/api/items/", {"name" : item2name,"sellIn": item2sellin,"quality" : item2quality,"type": item2type})

        menuContentPage.visitMenuContentPage()

        cy.get(".list-col .mat-icon[data-automation='list-delete-button']").first().click()
        cy.get("[data-automation=delete-dialog-confirm-button]").click()

        cy.wait(1000)
        cy.get("[data-automation=list-item-row]").then(rows => {
            let validated = false
            for (let i = 0; i < rows.length; i++) {
                const cols = rows[i].querySelectorAll(".list-col")
                if (!(cols[0].textContent === item1name &&
                      cols[1].textContent === item1sellin.toString() &&
                      cols[2].textContent === item1quality.toString() &&
                      cols[3].textContent === item1type)) {
                    validated = true
                }
            }
            expect(validated).to.be.true
        })

        cy.get(".list-buttons > button.list-insights-button").click()

        cy.wait(1000)

        cy.get(".insights-grid .insights-value").then(values => {
            let validatedInsights = false
            for (let i = 0; i < values.length-1; i++) {
                if(values[i].innerText === item1type && values[i+1].innerText === "1"){
                    validatedInsights = true
                }
            }
            expect(validatedInsights).to.be.true
        })
    });
});
