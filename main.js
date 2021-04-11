var music1="";
var music2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftWristscore=0;
rightWristscore=0;
song1Status="";
song2Status="";
function preload(){
    music1=loadSound("music.mp3");
    music2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    song1Status=song1.isPlaying();
    song2Status=song2.isPlaying();
    image(video,0,0,500,500);

    fill("#FF0000");
    stroke("#FF0000");

    if(rightWristscore>0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1Status==false){
            song1.play();
            document.getElementById("Song_Name").innerHTML="song1";
        }
    }
    if(leftWristscore>0.2){
        circle(lefttWristX,lefttWristY,20);
        song1.stop();
        if(song2Status==false){
            song2.play();
            document.getElementById("Song_Name").innerHTML="song2";
        }
    }
}
function modelLoaded(){
    console.log("PoseNet is Initialized!");
}
function gotPoses(results){
    if(results.length>0){
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
        rightWristscore=results[0].pose.keypoints[10].score;

        lefttWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);
        leftWristscore=results[0].pose.keypoints[9].score;
    }
}