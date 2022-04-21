class DeleteButtonPage {
    private confirmDeleteButton: string

    constructor() {
    this.confirmDeleteButton="[data-automation=delete-dialog-confirm-button]"
    }
    public clickDeleteConfirmButton():void{
        cy.get(this.confirmDeleteButton).click()
    }
}
export { DeleteButtonPage }
