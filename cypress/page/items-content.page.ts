class ItemsContentPage {
    private menuContentPageURL: string
    private addButton: string

    constructor() {
        this.menuContentPageURL = 'http://localhost:4200/list'
        this.addButton='.list-buttons > button.list-add-button'
    }

    public visitMenuContentPage(): void {
        cy.visit(this.menuContentPageURL)
    }

    public clickAddButton(): void {
        cy.get(this.addButton).click()
    }

}
export { ItemsContentPage }
