let capture;
let captureW;
let captureH;
let numMosBlocks = 40;
let mosaicWidth, mosaicHeight;
let posX = 60;
let posY = 60;
let col;
let pg;

function setup() {
	createCanvas(windowWidth, windowHeight);
	capture = createCapture(VIDEO);
	captureH = numMosBlocks * .75;
	captureW = numMosBlocks;
	capture.size(captureW, captureH);
	pg = createGraphics(captureW, captureH);
	//capture.hide();
	console.log(captureW);

}

function draw() {
	background(0);
	drawMosaic(posX, posY, 480, 480, 100);
}

function drawMosaic(posX, posY, mosaicWidth, mosaicHeight, mosaicRes) {
	if (capture.loadedmetadata) {
		let c = capture.get(0, 0, captureH, captureH);

		image(c, posX, posY, mosaicWidth, mosaicHeight);
		let inc = Math.round(mosaicWidth / numMosBlocks);
		console.log(inc);
		for (let x = posX; x < mosaicWidth + posX; x += inc) {
			for (let y = posY; y < mosaicHeight + posY; y += inc) {
				col = get(x, y);
				//console.log(col);
				fill(col);
				noStroke();
				rect(x, y, inc, inc);
			}

		}
	}
}