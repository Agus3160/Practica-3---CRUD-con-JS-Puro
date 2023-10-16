let genFacturaId = JSON.parse(localStorage.getItem('facturas'))?.length || 0;

class Factura {
    //Constructor
    constructor(clientId, isContado, items, total) {
        this.id = ++genFacturaId;
        this.fecha = Date.now();
        this.clientId = clientId;
        this.isContado = isContado;
        this.items = items;
        this.total = total;
    }

    static _actualList = Factura.getList() //Store the actual list from localstorage in memory

    //AUX FUNCTIONS:
    static _updateList(){
        localStorage.setItem('facturas', JSON.stringify(Factura._actualList))
    }

    static getList(){
        if(!JSON.parse(localStorage.getItem('facturas'))){
            localStorage.setItem('facturas', JSON.stringify([]))
            return []
        }
        return JSON.parse(localStorage.getItem('facturas'))
    }

    //CREATE FACTURA
    static create(factura){
        console.log(Factura._actualList)
        Factura._actualList.push(factura)
        Factura._updateList()
    }

    //UPDATE FACTURA
    static update(id, updatedFactura){
        
        //Update in the list
        Factura._actualList.forEach(f => {
            if(f.id === id){
                f.fecha = updatedFactura.fecha;
                f.clientId = updatedFactura.clientId;
                f.isContado = updatedFactura.isContado;
                f.items = updatedFactura.items;
                f.total = updatedFactura.total
                return
            }
        });

        //Update the localStorage
        Factura._updateList()
    }

    //DELETE FACTURA
    static delete(id){
        for(let i = 0; i< Factura._actualList.length; i++){
            if(Factura._actualList[i].id === id){
                Factura._actualList.splice(i,1)
                this.id++
                Factura._updateList()
                return
            }
        }
    }

    //GET FACTURA
    static get(id){
        for(let i = 0; i< Factura._actualList.length; i++){
            if(Factura._actualList[i].id === id){
                return Factura._actualList[i]
            }
        }
    }

}