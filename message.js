var socket = new WebSocket("ws://localhost:8080");
		
socket.onopen = logOpen;
socket.onmessage = logMessage;
socket.onclose = logClose;
		
function logOpen() {
	console.log("connected to WebSocket");
	
	sendMessage("get-img");
}

var logProcess = [];

function logMessage(msg) {
	console.log(msg);
	for(var i = 0; i < logProcess.length; i++){
		logProcess[i](msg);
	}
}

function logClose() {
	console.log("connection to WebSocket failed");
}

var Email = function(from, time, subject, body, to, cc, bcc){
	this.from = from;
	this.time = time;
	this.subject = subject;
	this.body = body;
	this.cc = cc;
	this.bcc = bcc;
	this.to = to;
	return this;
}

function sendMessage(type, message){
	var item = {type: type, message: message};
	socket.send(JSON.stringify(item));
}