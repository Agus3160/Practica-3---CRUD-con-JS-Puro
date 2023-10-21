const shopCart = []
let total = 0

window.onload = ()=>{
    if(Seller.getList().length === 0){
        let sellerIdInput = document.getElementById('vendedor')
        sellerIdInput.setAttribute('disabled', 'true')
        sellerIdInput.setAttribute('placeholder', 'No existen vendedores en la DB.')
    }
    if(Client.getClientList().length === 0){
        let clientIdInput = document.getElementById('cliente')
        clientIdInput.setAttribute('disabled', 'true')
        clientIdInput.setAttribute('placeholder', "No existen clientes en la DB.")
    }
}

function fnRefreshTable(){
    let table = document.getElementById('tableBodyShopCart')

    total = 0
    table.innerHTML = ""

    shopCart.forEach((item,index) =>{
        let newRow = document.createElement('tr')

        let newCell0 = document.createElement('td')
        let newCell1 = document.createElement('td')
        let newCell2 = document.createElement('td')
        let newCell3 = document.createElement('td')
        let newCell4 = document.createElement('td')
        let newCell5 = document.createElement('td')

        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = '❌'
        deleteButton.onclick = ()=> {fnDeleteItem(index)}

        newCell0.textContent = index
        newCell1.textContent = item.name
        newCell2.textContent = item.quantity
        newCell3.textContent = item.unitPrice
        newCell4.textContent = item.subtotal
        newCell4.setAttribute('class', 'subTotalCol')

        newCell5.append(deleteButton)

        newRow.appendChild(newCell0) 
        newRow.appendChild(newCell1)
        newRow.appendChild(newCell2)
        newRow.appendChild(newCell3)
        newRow.appendChild(newCell4)
        newRow.appendChild(newCell5)

        table.appendChild(newRow)
        total += item.subtotal
    })

    let totalShopCartSpan = document.getElementById('totalShopCart')
    totalShopCartSpan.innerText = `Total: ${total}$`
}

function fnAddItem(){
    let inputItem = { 
        name : document.getElementById('item'),
        quantity : document.getElementById('quantity'),
        precio : document.getElementById('precio')
    }

    if(inputItem.name.value.length === 0 || inputItem.quantity.value.length === 0 || inputItem.precio.value.length === 0){
        alert('Necesita cargas todos los campos del carrito de Items.')
        return
    }

    let tempItem = new FacturaItem(inputItem.name.value, inputItem.precio.value, inputItem.quantity.value)
    shopCart.push(tempItem)

    inputItem.name.value = ""
    inputItem.quantity.value = ""
    inputItem.precio.value = ""

    fnRefreshTable()
}

function fnDeleteItem(id){
    shopCart.splice(id, 1)
    fnRefreshTable()
}


function fnDoASell(){
    let radioButtonList = document.getElementsByName('tipoPago')
    let isContado = false
    radioButtonList.forEach(r => {
        if(r.checked){
            if(r.value == "contado"){
                isContado = true
            }
        }
    }) 

    let clientInput = document.getElementById('cliente')
    let sellerInput = document.getElementById('vendedor')

    if(shopCart.length === 0 || clientInput.value.trim().length === 0){ 
        alert('The data is invalid. Load valid data and Try again.')
        return
    }

    let clientTemp = Client.getClient(parseInt(clientInput.value))
    let selletTemp = Seller.get(parseInt(sellerInput.value))

    if(clientTemp === undefined){ 
        alert('The Client Doesny exists')
        return
    }

    if(selletTemp === undefined){
        alert('The Seller doesnt exists')
        return
    }

    let newFactura = new Factura(parseInt(clientInput.value), parseInt(sellerInput.value), isContado, shopCart, total)

    Factura.create(newFactura)
    
    shopCart.splice(0,shopCart.length)
    fnRefreshTable()

}
