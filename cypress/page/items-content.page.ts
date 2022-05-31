class ItemsContentPage {
    private menuContentPageURL: string
    private addButton: string
    private editButton: string
    private insightsButton: string
    private deleteButton: string

    constructor() {
        this.menuContentPageURL = "/list"
        this.addButton='.list-buttons > button.list-add-button'
        this.editButton=".list-col .mat-icon[data-automation='list-edit-button']"
        this.insightsButton=".list-buttons > button.list-insights-button"
        this.deleteButton=".list-col .mat-icon[data-automation='list-delete-button']"
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

    public clickFirtsDeleteButton():void {
        cy.get(this.deleteButton).first().click()
    }

    public clickInsightsButton():void{
        cy.get(this.insightsButton).click()
    }

}
export { ItemsContentPage }
