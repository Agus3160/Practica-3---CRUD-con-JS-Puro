let gananciasVendedor = 0

window.onload = ()=>{
    document.getElementById('vendedorGanancias').style.display = 'none'
    refreshFacturas()
}

function filterByDate(dates){
    if(dates[0] == -1){
        return (f) => f.fecha <= dates[1]
    }
    if(dates[1] == -1){
        return (f) => f.fecha >= dates[0]
        
    }
    return (f)=>{
        return (f.fecha >= dates[0] && f.fecha <= dates[1])
    }
}


function getSellerFilter(){
    let inputSeller = document.getElementById('vendedor')

    if(inputSeller.value.length === 0) return null

    let tempSeller = Seller.get(parseInt(inputSeller.value))

    if(tempSeller === undefined){
        alert('El vendedor no existe')
        fnClearParams()
        return
    }
    let sellerTempId = tempSeller.id

    return( 
        (f) => {return f.sellerId == sellerTempId}
    )
}

function getDate(){
    const FLAG_VALUE = -1
    
    let inputFromDate = document.getElementById('fromDate').value
    let inputToDate = document.getElementById('toDate').value

    if(inputFromDate.length === 0 && inputToDate.length === 0) return null 

    if(0 < inputFromDate.trim().length && inputFromDate.trim().length < 10 || inputToDate.trim().length && inputToDate.trim().length < 10){
        alert('Fecha invalida')
        return null
    }

    if(inputFromDate.length === 0 && inputToDate.length > 0) return [FLAG_VALUE, inputToDate] 
    if(inputFromDate.length > 0 && inputToDate.length === 0) return [inputFromDate, FLAG_VALUE] 

    return [inputFromDate, inputToDate]

}

function refreshFacturas(){
    let gananciasVendedorSpan = document.getElementById('vendedorGanancias')

    let facturasContainer = document.getElementById('facturasContainer')
    facturasContainer.innerHTML = ""

    let facturaList = Factura.getList()

    let dates = getDate()
    let sellerFilter = getSellerFilter()

    if(dates){
        facturaList = getFilteredList(facturaList, filterByDate(dates))
    }

    if(sellerFilter){
        gananciasVendedorSpan.style.display = 'block'
        facturaList = getFilteredList(facturaList, sellerFilter)
    }

    let ganancias = 0

    facturaList.forEach((f, index)=>{
        let mainDiv = document.createElement('div')
        mainDiv.setAttribute('class', 'factura')
        
        //HEAD 
        let headerDiv = document.createElement('div')
        headerDiv.setAttribute('class', 'headerFactura')

        let anulateButton = document.createElement('button')
        anulateButton.innerText = '❌'
        anulateButton.onclick = ()=> {fnAnularFactura(f.id)}

        let titleH4 = document.createElement('h4')
        titleH4.innerText = `Factura N° ${index}.`

        headerDiv.appendChild(titleH4)
        headerDiv.append(anulateButton)

        //CLIENT INFO
        let tempClient = Client.getClient(f.clientId)

        let clientInfoDiv = document.createElement('div')
        
        let clientName = document.createElement('p')
        clientName.innerText = `Cliente: ${tempClient.name}`
        let clientRuc = document.createElement('p')
        clientRuc.innerText = `Ruc: ${tempClient.ruc}`

        clientInfoDiv.appendChild(clientName)
        clientInfoDiv.appendChild(clientRuc)


        //SELLER INFO
        let tempSeller = Seller.get(f.sellerId)
        let sellerInfoDiv = document.createElement('div')

        let sellerName = document.createElement('p')
        sellerName.innerText = `Vendedor: ${tempSeller.name}`
        let sellerRuc = document.createElement('p')
        sellerRuc.innerText = `Ruc: ${tempSeller.ruc}`

        sellerInfoDiv.appendChild(sellerName)
        sellerInfoDiv.appendChild(sellerRuc)


        //SHOP INFO
        let shopListText = 'Items: '
        f.items.forEach(item =>{
            shopListText += `[${item.name}: ${item.quantity}] . `
        })
        let shopListElement = document.createElement('p')
        shopListElement.innerText = shopListText

        //FACTURA INFO
        let moneyDiv = document.createElement('div')
        
        let totalP = document.createElement('p')
        totalP.innerText = `Total: ${f.total}$`

        let typeOfPayP = document.createElement('p')
        typeOfPayP.innerText = f.isContado? 'Tipo de Pago: Contado' : 'Tipo de Pago: Credito'

        moneyDiv.appendChild(totalP)
        moneyDiv.appendChild(typeOfPayP)
        //If the sell is Contado then it will display the seller comision
        if(f.isContado){
            let comisionP = document.createElement('p')
            comisionP.innerText = `Comision: ${f.sellerComision}$`
            moneyDiv.appendChild(comisionP)
        }

        //DATE INFO
        let dateP = document.createElement('p')
        let date = f.fecha
        dateP.innerText = `Fecha de Venta: ${date}`

        //APPEND EVERYTHING INTO MAIN DIV
        mainDiv.appendChild(headerDiv)
        mainDiv.appendChild(clientInfoDiv)
        mainDiv.appendChild(sellerInfoDiv)
        mainDiv.appendChild(shopListElement)
        mainDiv.appendChild(moneyDiv)
        mainDiv.appendChild(dateP)

        facturasContainer.appendChild(mainDiv)

        ganancias += f.sellerComision
    })
    gananciasVendedorSpan.innerHTML = `Comision: ${ganancias}$`
}

function fnGetFilterFacturaSearch(facturaList, dateParam){
    return facturaList.filter(filterByDate(dateParam))
}

function getFilteredList(facturaList, predicate){
    return facturaList.filter(predicate)
}

function fnClearParams(){
    let inputFromDate = document.getElementById('fromDate')
    let inputToDate = document.getElementById('toDate')
    let inputSeller = document.getElementById('vendedor')

    inputFromDate.value = ""
    inputToDate.value = ""
    inputSeller.value = ""

    refreshFacturas()
}

function fnAnularFactura(id){
    Factura.delete(id)
    refreshFacturas()
}
