import { ItemsContentPage } from "../page/index"

describe("Adding Items", () => {

    let menuContentPage: ItemsContentPage
    const name = "panela"
    const sellin = "10"
    const quality = "50"
    const type = "NORMAL"

    before(() => {
        menuContentPage = new ItemsContentPage()
    })

    it("then should be bought a t-shirt", () => {

        cy.request("http://localhost:8080/api/items").then(response =>{
            for (const item of response.body) {
                if(item.name === name && item.sellIn.toString() === sellin && item.quality.toString() === quality && item.type === type){
                    cy.request("DELETE","http://localhost:8080/api/items/"+item.id)
                }
            }
        })
        menuContentPage.visitMenuContentPage()

        cy.get(".list-buttons > button.list-add-button").click()
        cy.get("[formcontrolname=name]").type(name)
        cy.get("[formcontrolname=sellIn]").type(sellin)
        cy.get("[formcontrolname=quality]").type(quality)
        cy.get("[formcontrolname=type] .mat-select-arrow-wrapper").click()
        cy.get("[role=listbox] [role=option]").contains(type).click()
        cy.get("[data-automation=item-form-confirm-button]").click()
        cy.wait(3000)
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
