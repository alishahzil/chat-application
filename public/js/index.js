var socket = io();
socket.on('connect',function(){
    console.log('Connected to the server');
    socket.emit('createMessage',{
        from: 'shahzil',
        text:'Hey!'
    });


});

socket.on('diconnect',function(){
    console.log('Server is disconnected');
});

socket.on('newMessage',function(message){
    console.log('newEmail',message);

}); 