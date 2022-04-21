class AddButtonPage {

    private nameTextField: string
    private sellInTextField: string
    private qualityTextField: string
    private typeSelectField: string
    private typeSelection: string
    private addConfirmButton: string

    constructor() {
        this.nameTextField="[formcontrolname=name]"
        this.sellInTextField="[formcontrolname=sellIn]"
        this.qualityTextField="[formcontrolname=quality]"
        this.typeSelectField="[formcontrolname=type] .mat-select-arrow-wrapper"
        this.typeSelection="[role=listbox] [role=option]"
        this.addConfirmButton="[data-automation=item-form-confirm-button]"
    }

    public goToNameTextField(name): void {
        cy.get(this.nameTextField).type(name)
    }

    public goToSellInTextField(sellin): void {
        cy.get(this.sellInTextField).type(sellin)
    }
    public goToQualityTextField(quality): void {
        cy.get(this.qualityTextField).type(quality)
    }
    public clickTypeSelectField(): void {
        cy.get(this.typeSelectField).click()
    }
    public chooseTypeSelection(type): void {
        cy.get(this.typeSelection).contains(type).click()
    }
    public clickAddConfirmButton():void{
        cy.get(this.addConfirmButton).click()
    }


}
export { AddButtonPage }
