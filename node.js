// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle chat messages
    socket.on('chat message', (msg) => {
        console.log('Message:', msg);
        io.emit('chat message', msg);
    });

    // Handle WebRTC signaling
    socket.on('offer', (offer) => {
        console.log('Offer received:', offer);
        socket.broadcast.emit('offer', offer);
    });

    socket.on('answer', (answer) => {
        console.log('Answer received:', answer);
        socket.broadcast.emit('answer', answer);
    });

    socket.on('ice-candidate', (candidate) => {
        console.log('ICE Candidate received:', candidate);
        socket.broadcast.emit('ice-candidate', candidate);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
