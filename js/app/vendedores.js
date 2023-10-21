function fnGetSellerInput(){
    return {
        name: document.getElementById('name')?.value,
        ruc: document.getElementById('ruc')?.value,
        addr: document.getElementById('addr')?.value,
        phone: document.getElementById('phone')?.value,
        comision : document.getElementById('comision')?.value
    }
}

function fnCreateVendedor(){

    let userData = fnGetSellerInput()

    for (const [key, value] of Object.entries(userData)){
        if(value.length <= 0) {
            alert('Rellene todos los campos')
            return
        }
    }

    if(userData.comision < 0 || userData.comision > 1){
        alert('La comision debe estar en decimales 0 < C < 1')
        return 
    } 

    let newSeller = new Seller(userData.name, userData.ruc, userData.addr, userData.phone, userData.comision)
    Seller.create(newSeller)

    alert('Vendedor creado Correctamente.')

    fnRefreshVendedoresList()
}


window.onload = ()=>{
    fnRefreshVendedoresList()
}

function fnRefreshVendedoresList(){
    let vendedoresList = Seller.getList()
    
    let table = document.getElementById('vendedoresTBody')

    table.innerHTML = ""

    vendedoresList.forEach(v => {
        let newRow = document.createElement('tr')

        let newCell1 = document.createElement('td')
        let newCell2 = document.createElement('td')
        let newCell3 = document.createElement('td')
        let newCell4 = document.createElement('td')
        let newCell5 = document.createElement('td')
        let newCell6 = document.createElement('td')
        let newCell7 = document.createElement('td')

        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = '❌'
        deleteButton.onclick = ()=> {fnDeleteVendedor(parseInt(newCell1.innerHTML))}

        let configButton = document.createElement('button')
        configButton.innerHTML = '⚙️'
        configButton.onclick = ()=> {fnDisplayConfigVendedorWindow(parseInt(newCell1.innerHTML))}

        newCell1.textContent = v.id
        newCell2.textContent = v.name
        newCell3.textContent = v.ruc
        newCell4.textContent = v.addr
        newCell5.textContent = v.phone
        newCell6.textContent = v.comision
        newCell7.append(deleteButton)
        newCell7.append(configButton)

        newRow.appendChild(newCell1)
        newRow.appendChild(newCell2)
        newRow.appendChild(newCell3)
        newRow.appendChild(newCell4)
        newRow.appendChild(newCell5)
        newRow.appendChild(newCell6)
        newRow.appendChild(newCell7)

        table.appendChild(newRow)
    });   
}

function fnModifyVendedor(id){
    let updatedVendedorData = {
        name : document.getElementById('configName').value,
        ruc : document.getElementById('configRuc').value,
        addr : document.getElementById('configAddr').value,
        phone : document.getElementById('configPhone').value,
        comision : document.getElementById('configComision').value
    }
    
    for(v of Object.values(updatedVendedorData)){
        if(v.trim().length <= 0){
            alert('No se han rellenado los campos.')
            return
        }
    }

    let tempSeller = new Seller(updatedVendedorData.name, updatedVendedorData.ruc, updatedVendedorData.addr, updatedVendedorData.phone, updatedVendedorData.comision)

    Seller.update(id, tempSeller)

    fnCloseConfigVendedorWindow()

    fnRefreshVendedoresList()
}

function fnDeleteVendedor(id){
    Seller.delete(id)
    fnRefreshVendedoresList()
}

function fnDisplayConfigVendedorWindow(id){

    let oldSeller = Seller.get(id)

    let nameInput = document.getElementById('configName')
    let rucInput = document.getElementById('configRuc')
    let addrInput = document.getElementById('configAddr')
    let phoneInput = document.getElementById('configPhone')
    let comisionInput = document.getElementById('configComision')

    nameInput.value = oldSeller.name
    rucInput.value = oldSeller.ruc
    addrInput.value = oldSeller.addr
    phoneInput.value = oldSeller.phone
    comisionInput.value = oldSeller.comision

    let configMenu = document.getElementById('updateVendedor')
    configMenu.style.display = 'flex'

    let editVendedorButton = document.getElementById('editVendedorButton')
    editVendedorButton.onclick = ()=> {fnModifyVendedor(id)}
}

function fnCloseConfigVendedorWindow(){
    let configMenu =  document.getElementById('updateVendedor')
    configMenu.style.display = 'none'
}