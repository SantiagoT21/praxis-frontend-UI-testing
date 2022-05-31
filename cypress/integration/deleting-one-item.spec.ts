import { ItemsContentPage,DeleteButtonPage } from "../page/index"

describe("Deleting Items", () => {

    let menuContentPage: ItemsContentPage
    let deleteItemPage: DeleteButtonPage

    const item1name = "Miel"
    const item1sellin = 20
    const item1quality = 50
    const item1type = "NORMAL"

     const item2name = "Chocolate"
     const item2sellin = 12
     const item2quality = 40
     const item2type = "NORMAL"

    const apiUrl = "/api/items/"


    before(() => {
        menuContentPage = new ItemsContentPage()
        deleteItemPage = new DeleteButtonPage()
        cy.request(apiUrl).then(response =>{
            for (const item of response.body) {
                cy.request("DELETE",apiUrl+item.id)
            }
        })

        cy.request("POST",apiUrl, {"name" : item1name,"sellIn": item1sellin,"quality" : item1quality,"type": item1type})
        cy.request("POST",apiUrl, {"name" : item2name,"sellIn": item2sellin,"quality" : item2quality,"type": item2type})
    })

    it("then should delete and stop displaying the item deleted in list view and insight information updated", () => {

        menuContentPage.visitMenuContentPage()

        menuContentPage.clickFirtsDeleteButton()
        deleteItemPage.clickDeleteConfirmButton()

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

        menuContentPage.clickInsightsButton()

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
