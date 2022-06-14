var video;

var vMosaicX = 32; //change this to change the length of a row of number of squares displayed in the mosaic
var vMosaicY = vMosaicX * 0.75; //calculates to a ratio of 4:3
var vW = 480; //desired width of mosaic to draw to screen
var vScale; //calculates scale from target video to display width

function setup() {
	createCanvas(640, 640);
	pixelDensity(1);
	video = createCapture(VIDEO);
	video.size(vMosaicX, vMosaicY);
	vScale = vW / vMosaicX;
	console.log("-----------------------------");
	console.log("Mosaic width = " + vMosaicX);
	console.log("Mosaic height = " + vMosaicY);
	console.log("vScale = " + vScale);
	console.log("desired width = " + vW);
	console.log("width/2 = " + width / 2);
	console.log("vW/2= " + vW / 2);

	video.hide();
	rectMode(CENTER);
}

function draw() {
	background(200,200,180);
	translate((width / 2) - vW*.75 / 2, (height / 2) - vW*.75 / 2);
	video.loadPixels();
	for (var y = 0; y < vMosaicY; y++) {
		for (var x = 0; x < vMosaicY; x++) {
			var index = (video.width - 1 -x + (y * video.width)) * 4;
			var r = video.pixels[index + 0];
			var g = video.pixels[index + 1];
			var b = video.pixels[index + 2];
			fill(r, g, b);
			stroke(200,200,180)
			rect(x * vScale, y * vScale, vScale, vScale);
			noStroke();
		}
	}
}