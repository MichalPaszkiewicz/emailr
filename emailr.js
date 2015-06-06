var email   = require("emailjs/email");
var fs = require("fs");

var server  = email.server.connect({
   user:    "noreply.testemail@gmail.com", 
   password:"NotForLiveApps2014", 
   host:    "smtp.gmail.com", 
   ssl:     true
});

function w(html, wrapper, otherCss){
	if(otherCss == null){otherCss = "";}
	return "<" + wrapper + " style='" + otherCss + "' >" + html + "</" + wrapper + ">";
}

function sendEmail(subject, msg){
	// send the message and get a callback with an error or details of the message that was sent
	server.send({
	   text:    "This text will not be displayed", 
	   from:    "Michal's node app noreply.testemail@gmail.com", 
	   to:      "michalpaszkiewicz@hotmail.com",
	   subject: subject,
	   attachment: 
	   [
		  {data:msg, alternative:true}
	   ]
	}, function(err, message) { console.log(err || "e-mail sent"); });
}

exports.generateEmail = function(subject, text){
	fs.readFile('template.html', function(err, data){
		console.log("Getting template");
		if(err){ throw err; }
		
		var dataString = data.toString();
		
		var txt = text;
		var msg = w(subject,"h1") + w(txt,"p");
		console.log("message: \r\n" + msg);
		
		var finalMsg = dataString.replace(/{TEXT}/g,msg);
		
		sendEmail(subject, finalMsg);
	});
}

