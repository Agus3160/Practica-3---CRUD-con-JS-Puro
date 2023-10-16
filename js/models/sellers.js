let genId = JSON.parse(localStorage.getItem('sellers'))?.length || 0;

class Seller {
    //Constructor
    constructor(name, ruc, addr, phone, comision) {
        this.id = ++genUserId;
        this.name = name;
        this.ruc = ruc;
        this.addr = addr;
        this.phone = phone;
        this.comision = comision
    }

    static _actualList = Seller.getList() //Store the actual list from localstorage in memory

    //AUX FUNCTIONS:
    static _updateList(){
        localStorage.setItem('sellers', JSON.stringify(Seller._actualList))
    }

    static getList(){
        if(!JSON.parse(localStorage.getItem('sellers'))){
            localStorage.setItem('sellers', JSON.stringify([]))
            return []
        }
        return JSON.parse(localStorage.getItem('sellers'))
    }

    //CREATE SELLER
    static create(seller){
        console.log(Seller._actualList)
        Seller._actualList.push(seller)
        Seller._updateList()
    }

    //UPDATE SELLER
    static update(id, updatedSeller){
        
        //Update in the list
        Seller._actualList.forEach(s => {
            if(s.id === id){
                s.name = updatedSeller.name;
                s.ruc = updatedSeller.ruc;
                s.addr = updatedSeller.addr;
                s.phone = updatedSeller.phone;
                s.comision = updatedSeller.comision
                return
            }
        });

        //Update the localStorage
        Seller._updateList()
    }

    //DELETE SELLER
    static delete(id){
        for(let i = 0; i< Seller._actualList.length; i++){
            if(Seller._actualList[i].id === id){
                Seller._actualList.splice(i,1)
                this.id++
                Seller._updateList()
                return
            }
        }
    }

    //GET SELLER
    static get(id){
        for(let i = 0; i< Seller._actualList.length; i++){
            if(Seller._actualList[i].id === id){
                return Seller._actualList[i]
            }
        }
    }

}