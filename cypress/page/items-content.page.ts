class ItemsContentPage {
    private menuContentPageURL: string
    private addButton: string
    private nameTextField: string
    private sellInTextField: string
    private qualityTextField: string
    private typeSelectField: string
    private typeSelection: string
    private itemsList: string

    constructor() {
        this.menuContentPageURL = 'http://localhost:4200/list'
        this.addButton='.list-buttons > button.list-add-button'
        this.itemsList="[data-automation=list-item-row]"
    }

    public visitMenuContentPage(): void {
        cy.visit(this.menuContentPageURL)
    }

    public clickAddButton(): void {
        cy.get(this.addButton).click()
    }

}
export { ItemsContentPage }
