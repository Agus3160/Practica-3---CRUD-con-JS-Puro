window.onload = () => {
    if(!JSON.parse(localStorage.getItem('session'))){
        alert('You can not be here. Login first')
        window.location.href = '/index.html'
    }
}

function fnOnLogout(){
    alert('Session closed')
    localStorage.setItem('session', null)
}