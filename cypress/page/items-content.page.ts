class ItemsContentPage {
    private menuContentPageURL: string

    constructor() {
        this.menuContentPageURL = 'http://localhost:4200/list'
    }

    public visitMenuContentPage(): void {
        cy.visit(this.menuContentPageURL)
    }

}
export { ItemsContentPage }
