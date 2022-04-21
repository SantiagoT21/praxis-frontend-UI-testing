import { ItemsContentPage } from "../page/index"

describe("Adding Items", () => {

    let menuContentPage: ItemsContentPage
    const name = "manzana"
    const sellin = "10"
    const quality = "-2"
    //const type = "NORMAL"

    before(() => {
        menuContentPage = new ItemsContentPage()
    })

    it("then should be bought a t-shirt", () => {

        menuContentPage.visitMenuContentPage()

        cy.get(".list-buttons > button.list-add-button").click()

        cy.get("[formcontrolname=name]").type(name)
        cy.get("[formcontrolname=quality]").type(quality)
        cy.get("[formcontrolname=sellIn]").type(sellin)
        cy.get("[data-automation=item-form-confirm-button]").should("be.disabled")

        cy.get(".mat-form-field-subscript-wrapper .mat-error").should("have.text", ' Expected value between 0 and 80 ')
    });
});