const path=require('path')
const http=require('http')
const express=require('express')
const socketio=require('socket.io')
const formatMessage=require('./utils/messages')
const {userjoin,getCurrentUser,leaveUser,getRoomUser}=require('./utils/users')
const app=express()
const server=http.createServer(app)
const io=socketio(server)

app.use(express.static(path.join(__dirname,'public')))

const port=process.env.PORT || 3000

const botname='Admin'

//Run when client connects
io.on('connection',socket =>{
    socket.on('joinRoom',({username,room})=>{
        const user=userjoin(socket.id,username,room)
        socket.join(user.room)
        //to logger
    socket.emit('message',formatMessage(botname,'Welcome to chat'))

    //to all but logger
    socket.broadcast.to(user.room).emit('message',
    formatMessage(botname,`${user.username} has joined the chat`))
    
    //send users and room info
    io.to(user.room).emit('roomUsers',{
        room:user.room,
        users: getRoomUser(user.room)
    })
})
    socket.on('chatMessage',msg=>{
        const user=getCurrentUser(socket.id)
        io.to(user.room).emit('message',formatMessage(user.username,msg))
    })
    //runs when client disconnects
    socket.on('disconnect',()=>{
        const user =leaveUser(socket.id)
        if(user){
            //to all the users
            io.to(user.room).emit('message',formatMessage(botname,`${user.username} has left the chat`))

             //send users and room info
            io.to(user.room).emit('roomUsers',{
            room:user.room,
            users: getRoomUser(user.room)
    })
        }
        
    })
})

server.listen(port,()=>{
    console.log("server is running on port "+port)
})