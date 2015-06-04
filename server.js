var WebSocket = require('ws');

var WebSocketServer = WebSocket.Server;

var wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function (ws) {

    ws.on('message', function (message) {
        var logmsg = ('received: ' + message);
        if(message.length > 70){
            logmsg = logmsg.substring(0,70) + "...";
        }
        console.log(logmsg);

        //ws.send();
    });

    ws.on("close", function () {
        console.log("connection to " + ws.connectionID + " lost");
    });

    console.log("connected to " + ws.connectionID);
});

console.log("server open on: ws:localhost:8080");