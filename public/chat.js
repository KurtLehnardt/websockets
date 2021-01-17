let socket = io.connect('http://parler-chat.herokuapp.com/')
// // for dev
// let socket = io.connect('http://localhost:3000/')
let timer

function chat() {
    console.log('chatting...')
    socket.emit('chat', {
        message: $('#message').val(),
        handle: $('#handle').val()
    })
    $('#message').val('')
}

$(()=>{
    $('#message').on('keyup change', function(e){
    if (e.which === 13){
        $('#send').click()
        }
    })
})

function typing(currently){
    currently 
    ? socket.emit('typing', handle.value)
    : socket.emit('notTyping', handle.value)
}

function postMessage(data) {
    $('#feedback').val('')
    $('#output').prepend(`<p>${data.handle}: ${data.message}</p>`)
}

socket.on('chat', postMessage)

socket.on('typing', function(data){
    if ($('#feedback').text() === ""){
        $('#feedback').html(`<p><em>${data} is typing a message...</em></p>`)
    }
    clearTimeout(timer)
});

socket.on('notTyping', function(data){
    timer = setTimeout(function(){$('#feedback').empty()}, 600)
})