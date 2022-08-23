var gesture = "";
var speech;

Webcam.set({
      width: 350,
      height: 300,
      image_format: 'png',
      png_quality: 90
});
camera = document.getElementById('camera');
Webcam.attach('#camera')

function take_snapshot(){
      Webcam.snap(function(data_uri){
            document.getElementById('results').innerHTML = "<img id='captured_image' src='" + data_uri + "'/>";
      });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/FwvdxrJMi/model.json', modelLoaded);

function modelLoaded(){
      console.log("Model Loaded");
}

function check(){
      img = document.getElementById('captured_image');
      classifier.classify(img, gotResult);
}
function gotResult(error, results){
      if(error){
            console.log(error);
      }else{
            console.log(results);
            document.getElementById("predictedEmoji").innerHTML = results[0].label;
            speak();
            if(results[0].label == "Awesome"){
                  document.getElementById("predictedEmoji").innerHTML = "&#128076;";
            }
            if(results[0].label == "Thumbs up"){
                  document.getElementById("predictedEmoji").innerHTML = "&#128077;";
            }
            if(results[0].label == "Peace"){
                  document.getElementById("predictedEmoji").innerHTML = "&#9996;";
            }
      }
}
function speak(){
      if(results[0].label == "Awesome"){
            speechSynthesis = window.speechSynthesis;
            gesture = results[0].label;
            speech = SpeechSynthesisUtterance(gesture);
            speechSynthesis.speak(speech);
      }
}