var WebSocket = require('ws');
var emailr = require("./emailr.js");
var fs = require("fs");

var WebSocketServer = WebSocket.Server;

var wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function (ws) {

	function sendMessage(type, message){
		var item = {type: type, message: message};
		ws.send(JSON.stringify(item));
	}

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
				emailr.generateEmail(theMsg.subject,theMsg.body,theMsg.to,theMsg.cc,theMsg.bcc,function(err){sendMessage("err",err);}); 
				break;
			case "get-img":
				sendMessage("img",fs.readFileSync("./dataURL.txt").toString());
				break;
			case "set-img":
				console.log("received image");
				var base64Data = dataJSON.message.replace(/data:image\/png;base64,/g, "");
				
				fs.writeFile("default.png", base64Data, 'base64', function(err) {
					console.log(err);
				});
				break;
			default:
				console.log("Unknown message type");
		}
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