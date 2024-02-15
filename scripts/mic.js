var lastScore = JSON.parse(localStorage.getItem("lastScoreSave"));
var highScore = JSON.parse(localStorage.getItem("highScoreSave"));

if(lastScore == null){
    lastScore = 0;
}
if(highScore == null){
    highScore = 0;
}

document.getElementById("last").innerHTML = lastScore;
document.getElementById("high").innerHTML = highScore;

function init() {
    var button = document.getElementById("play");
    button.parentNode.removeChild(button);
    var audioContext = new(window.AudioContext || window.webkitAudioContext)();
    var microphone;

    var analyser = audioContext.createAnalyser();

    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        var constraints = { audio: true }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
                //analyser.connect(audioContext.destination);
                beginRecording();
            })
            .catch(function(err) {
                console.error('error: ' + err);
            })
    } else {
        console.error('getUserMedia unsupported by browser');
    }

    function beginRecording() {
        analyser.fftSize = 1024; // power of 2, between 32 and max unsigned integer
        var bufferLength = analyser.fftSize;

        var freqBinDataArray = new Uint8Array(bufferLength);

        var c = document.getElementById("circle");

        var scream = false;

        var score = 0;
        var multi;

        var checkAudio = function() {
            analyser.getByteFrequencyData(freqBinDataArray);

            var vol = getRMS(freqBinDataArray);
            var freq = getIndexOfMax(freqBinDataArray);

            console.log('Volume: ' + vol);
            console.log('Freq Bin: ' + freq);
            //console.log(freqBinDataArray);

            if(vol >= 100){
                c.src = "../resources/P1/BigCircle.png";
                c.width = 387 + vol;
                c.height = 387 + vol;
            }
            else if(vol >= 75){
                c.src = "../resources/P1/Circle.png";
                c.width = 287 + vol;
                c.height = 287 + vol;
            }
            else{
                c.src = "../resources/P1/SmallCircle.png";
                c.width = 187 + vol;
                c.height = 187 + vol;
            }

            if(getRMS(freqBinDataArray) > 50){

                scream = true;
                multi = Math.round(vol / 50);
                console.log(multi);

                score += 1 * multi;
                document.getElementById("num").innerHTML = score;

                if(score > highScore){
                    highScore = score;
                    document.getElementById("high").innerHTML = score;
                    localStorage.setItem("highScoreSave", score);
                }
            } else if(scream){
                lastScore = score;
                document.getElementById("last").innerHTML = score;
                localStorage.setItem("lastScoreSave", score);
                score = 0;
                document.getElementById("num").innerHTML = score;
                scream = false;
            }
        }

        setInterval(checkAudio, 64);
    }
}

function getRMS(spectrum) {
    var rms = 0;
    for (var i = 0; i < spectrum.length; i++) {
        rms += spectrum[i] * spectrum[i];
    }
    rms /= spectrum.length;
    rms = Math.sqrt(rms);
    return rms;
}

function getIndexOfMax(array) {
    return array.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
}

function resetScores(){
    highScore = 0;
    lastScore = 0;
    document.getElementById("last").innerHTML = 0;
    document.getElementById("high").innerHTML = 0;
    localStorage.setItem("highScoreSave", 0);
    localStorage.setItem("lastScoreSave", 0);
}