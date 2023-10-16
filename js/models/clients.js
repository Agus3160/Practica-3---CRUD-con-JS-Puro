let genClientId = JSON.parse(localStorage.getItem('clients'))?.length || 0;

class Client {
    //Constructor
    constructor(name, ruc, addr, phone) {
        this.id = ++genClientId;
        this.name = name;
        this.ruc = ruc;
        this.addr = addr;
        this.phone = phone;
    }

    static _actualList = Client.getClientList() //Store the actual list from localstorage in memory

    //AUX FUNCTIONS:
    static _updateClientsList(){
        localStorage.setItem('clients', JSON.stringify(Client._actualList))
    }

    static getClientList(){
        if(!JSON.parse(localStorage.getItem('clients'))){
            localStorage.setItem('clients', JSON.stringify([]))
            return []
        }
        return JSON.parse(localStorage.getItem('clients'))
    }

    //CREATE CLIENT
    static createClient(client){
        console.log(Client._actualList)
        Client._actualList.push(client)
        Client._updateList()
    }

    //UPDATE CLIENT
    static updateClient(id, updatedClient){
        
        //Update in the list
        Client._actualList.forEach(c => {
            if(c.id === id){
                c.name = updatedClient.name;
                c.ruc = updatedClient.ruc;
                c.addr = updatedClient.addr;
                c.phone = updatedClient.phone;
                return
            }
        });

        //Update the localStorage
        Client._updateList()
    }

    //DELETE CLIENT
    static deleteClient(id){
        for(let i = 0; i< Client._actualList.length; i++){
            if(Client._actualList[i].id === id){
                Client._actualList.splice(i,1)
                this.id++
                Client._updateList()
                return
            }
        }
    }

    //GET CLIENT
    static getClient(id){
        for(let i = 0; i< Client._actualList.length; i++){
            if(Client._actualList[i].id === id){
                return Client._actualList[i]
            }
        }
    }

}