import { ItemsContentPage } from "../page/index"

describe("Adding Items", () => {

    let menuContentPage: ItemsContentPage
    const name = "Miel"
    const sellin = 20
    const quality = 50
    const type = "NORMAL"
    const newType = "AGED"

    before(() => {
        menuContentPage = new ItemsContentPage()
    })

    it("then should be bought a t-shirt", () => {

        cy.request("http://localhost:8080/api/items").then(response =>{
            for (const item of response.body) {
                    cy.request("DELETE","http://localhost:8080/api/items/"+item.id)
            }
        })

        cy.request("POST","http://localhost:8080/api/items/", {"name" : name,"sellIn": sellin,"quality" : quality,"type": type})

        menuContentPage.visitMenuContentPage()

        cy.get(".list-col .mat-icon[data-automation='list-edit-button']").first().click()
        cy.get("[formcontrolname=type] .mat-select-arrow-wrapper").click()
        cy.get("[role=listbox] [role=option]").contains(newType).click()

        cy.get("[data-automation=item-form-confirm-button]").click()

        cy.wait(3000)
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

        cy.get(".list-buttons > button.list-insights-button").click()

        cy.wait(3000)

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
