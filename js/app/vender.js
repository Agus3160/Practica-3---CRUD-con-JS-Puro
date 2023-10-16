const shopCart = []

window.onload = ()=>{
    let vendedorInput = document.getElementById('vendedor')
    vendedorInput.value = Seller.get(JSON.parse(localStorage.getItem('session')).sellerId).name
}

function fnRefreshTable(){
    let table = document.getElementById('tableBodyShopCart')

    table.innerHTML = ""

    let total = 0
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
        name : document.getElementById('item').value,
        quantity : document.getElementById('quantity').value,
        precio : document.getElementById('precio').value
    }

    if(inputItem.name.length === 0 || inputItem.quantity.length === 0 || inputItem.precio.length === 0){
        alert('Necesita cargas todos los campos del carrito de Items.')
        return
    }

    let tempItem = new FacturaItem(inputItem.name, inputItem.precio, inputItem.quantity)
    shopCart.push(tempItem)

    fnRefreshTable()
}



function fnDeleteItem(id){
    shopCart.splice(id, 1)
    fnRefreshTable()
}