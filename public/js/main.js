const chatForm= document.getElementById('chat-form')
const chatMessages=document.querySelector('.chat-messages')
const roomname=document.getElementById('room-name')
const userList=document.getElementById('users')

//get username androom from url
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix: true
})

const socket=io()

socket.emit('joinRoom',{username,room})

socket.on('roomUsers',({users,room})=>{
    outputroomname(room)
    outputusers(users)
})

//message from server
socket.on('message',message =>{
    console.log(message)
    outputMessage(message)
    //scroll down
    chatMessages.scrollTop=chatMessages.scrollHeight
})

//message submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=document.getElementById('msg').value;
    //emitting a message to server
    socket.emit('chatMessage',msg)

    document.getElementById('msg').value=''
    document.getElementById('msg').focus()
})
function outputMessage(message){
    const div=document.createElement('div')
    div.classList.add('message')
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

function outputroomname(room){
    roomname.innerText=room
}

function outputusers(users){
    userList.innerHTML=`${users.map(user=> `<li>${user.username}</li>`).join('')}`
}