let session = JSON.parse(localStorage.getItem('session'))
let sellerData = Seller.get(parseInt(session.sellerId))

function fnEditProfile(){
    let userData = fnGetUserInput()

    for (const [key, value] of Object.entries(userData)){
        if(value.value.length <= 0) {
            alert('Rellene todos los campos')
            return
        }
    }

    if(parseFloat(userData.comision.value) < 0 || parseFloat(userData.comision.value) >= 1){
        alert('La comision debe estar en decimales 0 < C < 1')
        return 
    } 

    let newSeller = new Seller(userData.name.value, userData.ruc.value, userData.addr.value, userData.phone.value, userData.comision.value)
    let newUser = new User(userData.username.value, userData.password.value, newSeller.id.value)

    Seller.update(session.sellerId, newSeller)
    User.update(session.id, newUser)
}

function fnGetUserInput(){
    return {
        username: document.getElementById('username'),
        password: document.getElementById('pswd'),
        name: document.getElementById('name'),
        ruc: document.getElementById('ruc'),
        addr: document.getElementById('addr'),
        phone: document.getElementById('phone'),
        comision : document.getElementById('comision')
    }
}


window.onload = ()=>{
    let userData = fnGetUserInput()

    userData.username.value = session.username
    userData.password.value = session.password
    userData.name.value = sellerData.name
    userData.ruc.value = sellerData.ruc
    userData.addr.value = sellerData.addr
    userData.phone.value = sellerData.phone
    userData.comision.value = sellerData.comision
}