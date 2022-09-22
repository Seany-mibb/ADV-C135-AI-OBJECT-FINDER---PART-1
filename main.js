var video = '';
var Status = '';
var object = '';
var objects = [];

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

    if(Status != '')
    {
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("item").innerHTML = "Right now the object that you are trying to find isn't being found...";
            document.getElementById("status").innerHTML = 'COCOSSD Model is currently working...';

            label = document.getElementById("input").value;

            confidence = objects[i].confidence + "%";
            fill('#abdbe3')
            text(objects[i].label + confidence, objects[i].x+15, objects[i].y+15)
            noFill()
            stroke('#abdbe3')
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)


            if(objects[i].label == label)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("item").innerHTML = "It seems that the COCOSSD Model has successfuly found your object.";

                var synth = window.speechSynthesis;
                speak_data = objects[i].label;
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("item").innerHTML = "Right now the object that you are trying to find isn't being found...";
            }
        }
    }
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);

    objects = results;
}