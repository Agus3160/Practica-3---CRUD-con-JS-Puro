class FacturaItem{
    constructor(name, unitPrice, quantity){
        this.name = name;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.subtotal = this.getSubTotal()
    }

    getSubTotal(){
        return this.unitPrice * this.quantity
    }

}
