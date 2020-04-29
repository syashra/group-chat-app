const users=[]

function userjoin(id,username,room){
    const user={id,username,room}
    users.push(user)
    return user
}

function getCurrentUser(id){
    return users.find( user => user.id === id)
}

//User leaves chat
function leaveUser(id){
    const index=users.findIndex(user=> user.id === id)
    if(index!==-1)
    {
        return users.splice(index,1)[0]
    }
}

//Get room users
function getRoomUser(room){
    return users.filter(user=> user.room===room)
}

module.exports={
    userjoin,
    getCurrentUser,
    leaveUser,
    getRoomUser
}