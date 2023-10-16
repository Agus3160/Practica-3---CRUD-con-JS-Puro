window.onload = ()=>{
    fnRefreshClientList()
}

function fnRefreshClientList(){
    let clientList = Client.getClientList()
    
    let table = document.getElementById('cliientsTBody')

    table.innerHTML = ""

    clientList.forEach(c => {
        let newRow = document.createElement('tr')

        let newCell1 = document.createElement('td')
        let newCell2 = document.createElement('td')
        let newCell3 = document.createElement('td')
        let newCell4 = document.createElement('td')
        let newCell5 = document.createElement('td')
        let newCell6 = document.createElement('td')

        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = '❌'
        deleteButton.onclick = ()=> {fnDeleteUser(parseInt(newCell1.innerHTML))}

        let configButton = document.createElement('button')
        configButton.innerHTML = '⚙️'
        configButton.onclick = ()=> {fnDisplayConfigClientWindow(parseInt(newCell1.innerHTML))}

        newCell1.textContent = c.id
        newCell2.textContent = c.name
        newCell3.textContent = c.ruc
        newCell4.textContent = c.addr
        newCell5.textContent = c.phone
        newCell6.append(deleteButton)
        newCell6.append(configButton)

        newRow.appendChild(newCell1)
        newRow.appendChild(newCell2)
        newRow.appendChild(newCell3)
        newRow.appendChild(newCell4)
        newRow.appendChild(newCell5)
        newRow.appendChild(newCell6)

        table.appendChild(newRow)
    });   
}

function fnCreateUser(){
    let clientData = {
        name : document.getElementById('name').value,
        ruc : document.getElementById('ruc').value,
        addr : document.getElementById('addr').value,
        phone : document.getElementById('phone').value
    }
    
    for(v of Object.values(clientData)){
        if(v.trim().length <= 0){
            alert('No se han rellenado los campos.')
            return
        }
    }

    let newClient = new Client(clientData.name, clientData.ruc, clientData.addr, clientData.phone)

    Client.createClient(newClient)

    fnRefreshClientList()
}

function fnCloseConfigClientWindow(){
    let configMenu =  document.getElementById('updateClient')
    configMenu.style.display = 'none'
}

function fnDisplayConfigClientWindow(id){

    let oldClient = Client.getClient(id)

    console.log(oldClient)

    let nameInput = document.getElementById('configName')
    let rucInput = document.getElementById('configRuc')
    let addrInput = document.getElementById('configAddr')
    let phoneInput = document.getElementById('configPhone')

    nameInput.value = oldClient.name
    rucInput.value = oldClient.ruc
    addrInput.value = oldClient.addr
    phoneInput.value = oldClient.phone

    let configMenu =  document.getElementById('updateClient')
    configMenu.style.display = 'flex'

    let editClientButton = document.getElementById('editClientButton')
    editClientButton.onclick = ()=> {fnModifyClient(id)}
}


function fnModifyClient(id){
    let updatedClientData = {
        name : document.getElementById('configName').value,
        ruc : document.getElementById('configRuc').value,
        addr : document.getElementById('configAddr').value,
        phone : document.getElementById('configPhone').value
    }
    
    for(v of Object.values(updatedClientData)){
        if(v.trim().length <= 0){
            alert('No se han rellenado los campos.')
            return
        }
    }

    let tempClient = new Client(updatedClientData.name, updatedClientData.ruc, updatedClientData.addr, updatedClientData.phone)

    Client.updateClient(id, tempClient)

    fnRefreshClientList()
}


function fnDeleteUser(id){
    Client.deleteClient(id)
    fnRefreshClientList()
}