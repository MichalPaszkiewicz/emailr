var PNGDecoder = require('png-stream/decoder');
var concat = require('concat-frames');
var fs = require('fs');

function fromBase4(number){
	var num = 0;
	num += number[0] * Math.pow(4,3);
	num += number[1] * Math.pow(4,2);
	num += number[2] * 4;
	num += parseInt(number[3]);
	
	return num;
}

// decode a PNG file to RGB pixels
fs.createReadStream('default.png')
  .pipe(new PNGDecoder)
  .pipe(concat(function(frames) {
    for(var i = 0; i < frames.length; i++){
		var pixels = frames[i].pixels;
		
		var newText = "";
		for(var i = 0; i < pixels.length; i+=4)
		{
			if(pixels[i] < 8 && pixels[i+1] < 8 && pixels[i+2] < 8 && pixels[i+3] > 245){
				var stringLetter = fromBase4((pixels[i] + "") + (pixels[i+1] + "") + (pixels[i+2] + "") + ((255-pixels[i+3]) + ""));
				newText += String.fromCharCode(stringLetter)
			}
		}
	
		console.log(newText);
	}
  }));