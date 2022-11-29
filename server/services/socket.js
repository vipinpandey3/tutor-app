const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
let listener
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin: "*"
      }
});

io.on("connection", (socket) => {
  // ..
  listener = socket
  socket.on('on_ping', data => {
    console.log('Notificatio recieved', data);

   io.sockets.emit('on_pong', {text: 'pong'});
  })
});

httpServer.listen(4000);

module.exports = {
    io: io,
    listener: listener
}

// const express = require('express');
// const app = express();
// const cors = require('cors');

// app.use(cors());
// app.use(express.json())

// const server = app.listen(process.env.SOCKET_SERVER_PORT, () => {
//     console.log('socket Server is up and running');
// })

// var listener = require('socket.io')(server, {
//     cors: {
//         origin: "*"
//     }
// });
// listener.on('connection', (socket) => {
//     console.log('Socket is connected & id is:', socket.id);
// });

// module.exports = {
//     listener: listener
// }