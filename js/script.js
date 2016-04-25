window.onload = function() {

	// Normalize the various vendor prefixed versions of getUserMedia.
	navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia || 
                              navigator.msGetUserMedia);

	// Grab elements, create settings, etc.
	var canvas = document.getElementById("canvas"), context = canvas.getContext("2d");						  
	
	// Check that the browser supports getUserMedia.
	// If it doesn't show an alert, otherwise continue.
	if (navigator.getUserMedia) {
		// Request the camera.
		navigator.getUserMedia(
			// Constraints
			{
				video: true
			},

			// Success Callback
			function(localMediaStream) {
				// Get a reference to the video element on the page.
				var vid = document.getElementById('camera-stream');

				// Create an object URL for the video stream and use this 
				// to set the video source.
				vid.src = window.URL.createObjectURL(localMediaStream);
				// Trigger photo take
				document.getElementById("snap").addEventListener("click", function() {
					context.drawImage(vid, 0, 0, 640, 480);
				});
				// Create Download
				var button = document.getElementById('btn-download');
				button.addEventListener('click', function (e) {
					var dataURL = canvas.toDataURL('image/png');
					button.href = dataURL;
				});
			},

			// Error Callback
			function(err) {
				// Log the error to the console.
				console.log('The following error occurred when trying to use getUserMedia: ' + err);
			}
		);

	} else {
	  alert('Sorry, your browser does not support getUserMedia');
	}
}

function changeFilter(filter) {
	var element = document.getElementById("canvas");
	element.setAttribute("style", "-webkit-filter : " + filter + ";");
}