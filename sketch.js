let capture;
let captureW;
let captureH;
let mosaicRes = 50;
let mosaicWidth, mosaicHeight;
let posX, posY;

function setup() {
	createCanvas(windowWidth, windowHeight);
	capture = createCapture(VIDEO);
	captureH = mosaicRes;
	captureW = mosaicRes * 4 / 3;
	capture.size(captureW, captureH);
	capture.hide();

}

function draw() {
	background(0);
	drawMosaic(20, 20, 480, 480, 100);
}

function drawMosaic(posX, posY, mosaicWidth, mosaicHeight, mosaicRes) {
	if (capture.loadedmetadata) {
		let c = capture.get(0, 0, captureH, captureH);
		image(c, posX, posY, mosaicWidth, mosaicHeight);
	}
}

//get(x, y, w, h)