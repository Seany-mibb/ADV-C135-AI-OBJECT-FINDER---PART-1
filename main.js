var video = '';
var Status = '';
var object = '';

function setup()
{
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = 'Status: Object Detection has started';
}

function modelLoaded()
{
    console.log('Model is loaded')
    Status = true;
    object = document.getElementById("input").value;
    console.log(object)
}

function draw()
{
    image(video, 0, 0, 500, 400);
}