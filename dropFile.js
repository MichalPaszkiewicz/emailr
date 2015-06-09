var dropCanvas, dropContext;
(function () {
	dropCanvas = document.getElementById("drop-canvas");
	dropContext = dropCanvas.getContext("2d");
	var	img = document.createElement("img"),
		clearCanvas = function () {
			dropContext.clearRect(0, 0, dropCanvas.width, dropCanvas.height);
		};
		
	dropCanvas.width = 100;
	dropCanvas.height = 100;
		
	// Image for loading	
	img.addEventListener("load", function () {
		clearCanvas();
		dropContext.drawImage(img, 0, 0);
	}, false);
	
	// To enable drag and drop
	dropCanvas.addEventListener("dragover", function (evt) {
		evt.preventDefault();
	}, false);

	// Handle dropped image file - only Firefox and Google Chrome
	dropCanvas.addEventListener("drop", function (evt) {
		clearCanvas();
		var files = evt.dataTransfer.files;
		if (files.length > 0) {
			var file = files[0];
			if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
				var reader = new FileReader();
				// Note: addEventListener doesn't work in Google Chrome for this event
				reader.onload = function (evt) {
					img.src = evt.target.result;
				};
				reader.readAsDataURL(file);
			}
		}
		evt.preventDefault();
	}, false);
})();