const express = require('express')
const socket = require('socket.io')
const app = express()
const PORT = process.env.PORT || 3000

let server = app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`)
})

app.use(express.static('public'))

let io = socket(server)

io.on('connection', function(socket){
    console.log(`made connection to ${socket.id}`)
    socket.on('chat', function(data){
        io.sockets.emit('chat', data)
    })

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    })

    socket.on('notTyping', function(data){
        socket.broadcast.emit('notTyping', data)
    })
})

