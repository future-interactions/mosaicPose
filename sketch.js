var video;

var vMosaicX;
var vMosaicY;
var vW = 720; //desired width of mosaic to draw to screen
var vScale; //calculates scale from target video to display width

function setup() {
	createCanvas(windowWidth, windowHeight);
	vMosaicX = 48; //change this to change the length of a row of number of squares displayed in the mosaic
	vMosaicY = vMosaicX * 0.75;
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
	noSmooth();
}

function draw() {
	vMosaicY = vMosaicX * 0.75;

	background(200, 200, 180);

	translate((width / 2) - vW * .75 / 2, (height / 2) - vW * .75 / 2);
	stroke(100);
	noFill();
	strokeWeight(1);

	video.loadPixels();
	noStroke();
	fill(240, 240, 220);
	rect(0 - vScale * 2, 0 - vScale * 2, vW * .75 + (vScale * 4), vW * .75 + (vScale * 4));

	noFill();
	stroke(240, 240, 220);
	rect(0 - vScale * 3, 0 - vScale * 3, vW * .75 + (vScale * 6), vW * .75 + (vScale * 6));

	for (var y = 0; y < vMosaicY; y++) {
		for (var x = 0; x < vMosaicY; x++) {
			var index = (video.width - 1 - x + (y * video.width)) * 4;
			var r = video.pixels[index + 0];
			var g = video.pixels[index + 1];
			var b = video.pixels[index + 2];
			fill(r, g, b);
			//	stroke(200, 200, 180);
			rect(x * vScale, y * vScale, vScale, vScale);
			noStroke();
		}
	}
	for (var y = 0; y < vMosaicY + 4; y++) {
		for (var x = 0; x < vMosaicY + 4; x++) {
			stroke(200, 200, 180);
			noFill();
			rect(x * vScale - vScale - vScale, y * vScale - vScale - vScale, vScale, vScale);
		}
	}
}