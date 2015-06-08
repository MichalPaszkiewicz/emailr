var WebSocket = require('ws');
var emailr = require("./emailr.js");

var WebSocketServer = WebSocket.Server;

var wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function (ws) {

    ws.on('message', function (message) {
        var logmsg = ('received: ' + message);
        if(message.length > 70){
            logmsg = logmsg.substring(0,70) + "...";
        }
        console.log(logmsg);

		var dataJSON = JSON.parse(message);
		
		switch(dataJSON.type){
			case "email":
				var theMsg = dataJSON.message;
				emailr.generateEmail(theMsg.subject,theMsg.body,theMsg.to,theMsg.cc,theMsg.bcc); 
				break;
			default:
				console.log("Unknown message type");
		}
		
        //ws.send();
    });

    ws.on("close", function () {
        console.log("connection lost");
    });

    console.log("new connection made!");
});

console.log("server open on: ws:localhost:8080");

var open = require("open");

open("index.html", function(err){
	if(err)throw err;
	console.log("browser closed");
});