const users = {};

module.exports = (socket, io) => {
    console.log("Connection Built");

    socket.on("joined", ({ name }) => {
        users[socket.id] = name;
        console.log(`${name} has joined`);
        socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} has joined` });
        socket.emit('welcome', { user: "Admin", message: `Welcome to the chat, ${users[socket.id]} ` });
    });

    socket.on("joinRoom", (room) => {
        console.log("Join Yeh Wala Room: "+room);
        socket.join(room);
    });

    socket.on('message', ({ message, id, room }) => {
        io.to(room).emit('sendMessage', { user: users[id], message, id });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` });
        console.log(`user left`);
    });
};
