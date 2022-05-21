/* eslint-disable camelcase */
var http = require('http');
var express = require('express');
// var fs = require('fs');
var client = null;

// Create a http or https server based on the config
var server = null;
server = http.createServer(express());
var listener = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});
server.listen(process.env.SOCKET_SERVER_PORT, function () {
    console.log(`Listening socket on ${process.env.SOCKET_SERVER_PORT}`);
});
listener.on('connection', function (socket) {
  client = socket;
  socket.on('join_room', data => {
      console.log("Data for room join", data);
      socket.join(data)
  })
  socket.emit('status', 'connection to server made');
//   socket.on('instruct_escalate', function (uniqueUserId) {
//     socket.join(uniqueUserId);
//   });
  socket.on('disconnect', function () {
    console.log('user disconnected from socket');
  });
});

module.exports = {
  listener: listener,
  client: client
};
