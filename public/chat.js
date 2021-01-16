let socket = io.connect('http://localhost:3000')

function chat() {
    console.log('chatting...')
    socket.emit('chat', {
        message: $('#message').val(),
        handle: $('#handle').val()
    })
    $('#message').empty()
}

$('#message').keypress(function(){
    socket.emit('typing', handle.value)
})

socket.on('chat', function(data) {
    $('#feedback').empty()
    $('#output').html(`<p>${data.handle} says ${data.message}</p>`)
})

socket.on('typing', function(data){
    $('#feedback').html(`<p><em>${data} is typing a message...</em></p>`)
});