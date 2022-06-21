let video;
let hiResImg;
let lowResImg;
let poseNet;
let pose;
var vMosaicX = 48; //change this to change the length of a row of number of squares displayed in the mosaic
var vMosaicY = vMosaicX * 0.75;
var vW = 720; //desired width of mosaic to draw to screen
var vScale = vW / vMosaicX; //calculates scale from target video to display width

function setup() {
	createCanvas(windowWidth, windowHeight);
	pixelDensity(1);
	video = createCapture(VIDEO);
	video.size(640, 480);
	hiResImg = createGraphics(640, 480);
	lowResImg = createGraphics(vMosaicX, vMosaicY);

	video.hide();
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
	noSmooth();
}

function draw() {
	background(200, 200, 180);
	translate((width / 2) - vW * .75 / 2, (height / 2) - vW * .75 / 2);
	stroke(100);
	noFill();
	strokeWeight(1);
	hiResImg.copy(video, 0, 0, video.width, video.height, 0, 0, hiResImg.width, hiResImg.height);
	if (pose) {
		hiResImg.noStroke();
		hiResImg.fill(255, 0, 0);
		hiResImg.ellipse(pose.nose.x, pose.nose.y, 100, 100);
		//hiResImg.updatePixels();
		//ellipse(pose.nose.x * vScale - vScale - vScale, pose.nose.y * vScale - vScale - vScale, vScale * 10, vScale * 10)
	}
	lowResImg.copy(hiResImg, 0, 0, hiResImg.width, hiResImg.height, 0, 0, vMosaicX, vMosaicY);
	noStroke();
	fill(240, 240, 220);
	rect(0 - vScale * 2, 0 - vScale * 2, vW * .75 + (vScale * 4), vW * .75 + (vScale * 4));
	lowResImg.loadPixels();
	noFill();
	stroke(240, 240, 220);
	rect(0 - vScale * 3, 0 - vScale * 3, vW * .75 + (vScale * 6), vW * .75 + (vScale * 6));
	for (var y = 0; y < vMosaicY; y++) {
		for (var x = 0; x < vMosaicY; x++) {
			var index = (lowResImg.width -1 - x + (y  * lowResImg.width)) * 4;
			var r = lowResImg.pixels[index + 0];
			var g = lowResImg.pixels[index + 1];
			var b = lowResImg.pixels[index + 2];
			fill(r, g, b);
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


	//image(hiResImg,-vMosaicX*vScale, 0); //show hiResImg as thumbnail video
}

function modelLoaded() {
	//	console.log("model loaded");
}

function gotPoses(poses) {
	//	console.log(poses);
	if (poses.length > 0) {
		pose = poses[0].pose;
	}
}