function fnGetUserInput(){
    return {
        username: document.getElementById('username')?.value,
        password: document.getElementById('pswd')?.value,
        name: document.getElementById('name')?.value,
        ruc: document.getElementById('ruc')?.value,
        addr: document.getElementById('addr')?.value,
        phone: document.getElementById('phone')?.value,
        comision : document.getElementById('comision')?.value
    }
}

function fnGetUserInputLogin(){
    return {
        username: document.getElementById('username')?.value,
        password: document.getElementById('pswd')?.value,
    }
}

function fnSignUp(){

    let userData = fnGetUserInput()

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
    let newUser = new User(userData.username, userData.password, newSeller.id)

    Seller.create(newSeller)
    User.create(newUser)
    
}

function fnLogin(){
    let userData = fnGetUserInputLogin()

    for (const [key, value] of Object.entries(userData)){
        if(value.length <= 0) {
            alert(`Rellene todos los campos: ${key}`)
            return
        }
    }

    for(u of User._actualList){
        if(u.username === userData.username && u.password === userData.password){
            console.log('logueado')
            localStorage.setItem('session', JSON.stringify(u))
            window.location.href = '/dashboard.html'
            return
        }
    }

    alert('Credenciales incorrectos')
}

