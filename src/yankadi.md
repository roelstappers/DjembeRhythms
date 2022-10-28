# Yankadi


```@raw html
<button data-playing="false" role="switch" aria-checked="false">
    <span>Play/Pause</span>
  </button>
<input type="range" id="volume" min="0" max="2" value="1" step="0.01" />
<input type="checkbox" id="mute" name="mute">
<label for="mute">mute</label> 


<script>
var audioContext = new window.AudioContext();
const audioElement = new Audio("wav/tone1.wav")

const track = audioContext.createMediaElementSource(audioElement)
const volumeControl = document.querySelector("#volume");

volumeControl.addEventListener(
  "input",
  () => {
    gainNode.gain.value = volumeControl.value;
  },
  false
);
//track.connect(audioContext.destination)
const gainNode = audioContext.createGain();
delayNode = audioContext.createDelay(4.0); 



track.connect(delayNode).connect(audioContext.destination);


const playButton = document.querySelector("button");

playButton.addEventListener(
  "click",
  () => {
    // Check if context is in suspended state (autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // Play or pause track depending on state
    if (playButton.dataset.playing === "false") {
      audioElement.play();
      playButton.dataset.playing = "true";
    } else if (playButton.dataset.playing === "true") {
      audioElement.pause();
      playButton.dataset.playing = "false";
    }
  },
  false
);

</script>

```

## Call

## Break

## Accompaniment 
