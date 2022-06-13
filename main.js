Status = "";
input_text = "";
objects = [];

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start(){
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_text = document.getElementById("input_id").value;
}
function modelLoaded(){
    console.log("Model_Loaded");
    Status = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);

if (Status != "") {
    r = random(255);
    b = random(255);
    g = random(255);
    object_Detector.detect(video, gotResults);
    for (i = 0; i < objects.length; i++) {
document.getElementById("status").innerHTML = "Status: Object Detected";
fill (r,g,b);
percent = floor(objects[i].confidence * 100);
text (objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
noFill();
stroke(r,g,b);
rect (objects[i].x, objects[i].y, objects[i].width, objects[i].height);

if (objects[i].label == input_text) {
    video.stop();
    object_Detector.detect(gotResults);
    document.getElementById("object_found").innerHTML = input_text + " found";

    var synth = window.speechSynthesis;
    var utterthis = new SpeechSynthesisUtterance(input_text + "found");
    synth.speak(utterthis);

}

else {
    document.getElementById("object_found").innerHTML = input_text + " not found";
}
    }
}

}