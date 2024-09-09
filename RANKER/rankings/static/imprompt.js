var starter = document.getElementById("start");
var lmaoaudio = new Audio(audioURL);
var resetBtn = document.getElementById("reset");
var impromptBtn = document.getElementById("impromptstart");
var endimpBtn = document.getElementById("impromptend");
var timerInterval;
const playbackVideo = document.getElementById('playback');
let mediaRecorder;
let recordedChunks = [];
var dta = document.getElementById("timer");
var audio = document.getElementById("audiorecord");
var video = document.getElementById("videorecord");
var blvideo = false;
var blaudio = false;
var q1=document.getElementById("q1")
var q2=document.getElementById("q2")
var q3 = document.getElementById("q3")

audio.addEventListener("click", function(){
    if (blaudio) {
        blaudio = false;
        audio.style.backgroundColor = "darkred";
    } else {
        blaudio = true;
        audio.style.backgroundColor = "green";
    }
});

video.addEventListener("click", function(){
    if (blvideo) {
        blvideo = false;
        video.style.backgroundColor = "darkred";
    } else {
        blvideo = true;
        video.style.backgroundColor = "green";
    }
});

// Use addEventListener for start button
starter.addEventListener("click", starting);

function stopMediaTracks(stream) {
    stream.getTracks().forEach(track => {
        track.stop();
    });
}

function starting() {
    var disappear = document.getElementById("intro");
    var appear = document.getElementById("real");

    disappear.style.animation = "fade 1s linear";
    disappear.addEventListener("animationend", function() {
        disappear.style.display = "none";
        appear.style.display = "block";
        appear.style.animation = "fade_in 0.5s linear";
    });

    appear.addEventListener("animationend", function() {
        timer(dta);
    });
}

function timer(dta) {
    var sec = dta.dataset.seconds;

    clearInterval(timerInterval); // Clear any previous timer
    timerInterval = setInterval(function() {
        var second = sec % 60;
        var min = Math.floor(sec / 60);
        if (second < 10) {
            dta.innerHTML = min + ":0" + second;
        } else {
            dta.innerHTML = min + ":" + second;
        }
        sec--;
        if (sec < 0) {
            clearInterval(timerInterval);
            dta.style.color = "red";
            lmaoaudio.play();
        }
    }, 1000);
}

// Use addEventListener for reset button
resetBtn.addEventListener("click", function() {
    dta.innerHTML = "1:00";
    dta.style.fontSize = "50px";
    dta.dataset.seconds = "60";  // Reset the time to 1 minute
    dta.style.color = "black";   // Reset the color if changed
    timer(dta);                   // Restart the timer
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();  // Stop recording if it's active
    }
    playbackVideo.style.display = "none";
    playbackVideo.src = "none";
    endimpBtn.style.display = "none";
    impromptBtn.style.display = "block";
    newQuestions().catch(error => {
        console.error('Error fetching new questions:', error);
    });
});

// Async function to handle media recording
impromptBtn.addEventListener("click", async function() {
    dta.dataset.seconds = "120";  // Reset the time to 2 minutes
    dta.style.color = "black";   // Reset the color if changed
    if (blvideo || blaudio) {
        try {
            // Get user media for both video and audio
            const stream = await navigator.mediaDevices.getUserMedia({ video: blvideo, audio: blaudio });

            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            // When recording stops, create a blob from the chunks and display it
            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, {
                    type: 'video/webm'
                });
                playbackVideo.src = URL.createObjectURL(blob);
                playbackVideo.style.display = "block";
                recordedChunks = []; // Clear chunks for the next recording
                stopMediaTracks(stream);
            };

            // Start recording
            mediaRecorder.start();
            
            setTimeout(() => {
                if (mediaRecorder.state === "recording") {
                    mediaRecorder.stop();
                    endimpBtn.style.display = "none";
                    impromptBtn.style.display = "block";
                }
            }, 121000);
        } catch (err) {
            console.error("Error accessing media devices:", err);
        }
    }
    endimpBtn.style.display = "block";
    impromptBtn.style.display = "none";
    dta.style.fontSize = "100px";
    dta.innerHTML = "2:00";
    timer(dta);
});

// Ensure End Impromptu Button Works
endimpBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
    dta.style.color = "blue";
    
    // Ensure the mediaRecorder is still recording
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();  // Stop recording if it's active
    }

    // Toggle button visibility
    endimpBtn.style.display = "none";
    impromptBtn.style.display = "block";
});
function newQuestions(){
    fetch(`/impromptureq`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let q11 = data.newquestions.question1
        let q22 = data.newquestions.question2
        let q33 = data.newquestions.question3
        q1.innerHTML ="1. "+q11
        q2.innerHTML = "2. " + q22
        q3.innerHTML = "3. " + q33})}
