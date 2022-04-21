class ItemsContentPage {
    private menuContentPageURL: string
    private addButton: string
    private editButton: string
    private insightsButton: string

    constructor() {
        this.menuContentPageURL = 'http://localhost:4200/list'
        this.addButton='.list-buttons > button.list-add-button'
        this.editButton=".list-col .mat-icon[data-automation='list-edit-button']"
        this.insightsButton=".list-buttons > button.list-insights-button"
    }

    public visitMenuContentPage(): void {
        cy.visit(this.menuContentPageURL)
    }

    public clickAddButton(): void {
        cy.get(this.addButton).click()
    }

    public clickFirtsEditButton():void {
        cy.get(this.editButton).first().click()
    }

    public clickInsightsButton():void{
        cy.get(this.insightsButton).click()
    }
}
export { ItemsContentPage }
