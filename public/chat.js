let socket = io.connect('http://localhost:3000')
let timer

function chat() {
    console.log('chatting...')
    socket.emit('chat', {
        message: $('#message').val(),
        handle: $('#handle').val()
    })
    $('#message').val('')
}

function typing(currently){
    currently 
    ? socket.emit('typing', handle.value)
    : socket.emit('notTyping', handle.value)
}

socket.on('chat', function(data) {
    $('#feedback').val('')
    $('#output').append(`<p>${data.handle}: ${data.message}</p>`)
})

socket.on('typing', function(data){
    console.log(' is typing a message..')
    if ($('#feedback').text() === ""){
        $('#feedback').html(`<p><em>${data} is typing a message...</em></p>`)
    }
    clearTimeout(timer)
});

socket.on('notTyping', function(data){
    console.log('stopped typing..')
    timer = setTimeout(function(){$('#feedback').empty()}, 300)
})