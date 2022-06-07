video="";
status="";
objects= [];

function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}

function start(){
objectDetector=ml5.objectDetector("cocoSSD",modelLoaded);
document.getElementById("status").innerHTML="Status:  Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw(){
   image(video,0,0,480,380);
   if(status!=""){
       objectDetector.detect(video,gotResult);
       for(i=0;i<=objects.length;i++){
           document.getElementById("number_of_objects").innerHTML="Number Of Objects Detected are: "+objects.length;
           document.getElementById("status").innerHTML="Status: Objects Detected";

           percent=Math.floor(objects[i].confidence * 100);

           fill("yellow");
           noFill();
           stroke("yellow");
          
           text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
       }
       
   }
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects= results;
    }
}