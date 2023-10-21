let genUserId = JSON.parse(localStorage.getItem('users'))?.length || 0;

class User {
    //Constructor
    constructor(username, password) {
        this.id = genUserId++;
        this.username = username;
        this.password = password;
    }

    static _actualList = User.getList() //Store the actual list from localstorage in memory

    //AUX FUNCTIONS:
    static _updateList(){
        localStorage.setItem('users', JSON.stringify(User._actualList))
    }

    static getList(){
        if(!JSON.parse(localStorage.getItem('users'))){
            localStorage.setItem('users', JSON.stringify([]))
            return []
        }
        return JSON.parse(localStorage.getItem('users'))
    }

    //CREATE USER
    static create(user){
        console.log(User._actualList)
        User._actualList.push(user)
        User._updateList()
    }

    //UPDATE USER
    static update(id, updatedUser){
        
        //Update in the list
        User._actualList.forEach(u => {
            if(u.id === id){
                u.username = updatedUser.username;
                u.password = updatedUser.password;
                return
            }
        });

        //Update the localStorage
        User._updateList()
    }

    //DELETE USER
    static delete(id){
        for(let i = 0; i< User._actualList.length; i++){
            if(User._actualList[i].id === id){
                User._actualList.splice(i,1)
                this.id++
                User._updateList()
                return
            }
        }
    }

    //GET USER
    static get(id){
        for(let i = 0; i< User._actualList.length; i++){
            if(User._actualList[i].id === id){
                return User._actualList[i]
            }
        }
    }

}