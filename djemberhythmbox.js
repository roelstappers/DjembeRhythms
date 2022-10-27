//https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements

//import Djembe from './djembe.js';

const audioContext = new window.AudioContext();


//const djembe = new Djembe()

//console.log(djembe)

let v;
fetch("wav/tone1.wav").then(r => r.arrayBuffer()).then(v => console.log(v))

console.log(v[1])
//readAsBuffer("wav/tone1.wav")
//const buffer = readwav2buffer("wav/tone1.wav");


//console.log(buffer)

//{ 
// console.log(var)
//}
// Create a class for the element
class DjembeRhythm extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();


    const rhythm = this.getAttribute('rhythm');


    var bufferSourceNotes = [];
    for (let i = 0; i < rhythm.length; i++) {
      //console.log(noteMap["T"])
      // bufferSourceNotes[i] = createDjembeBufferSource(noteMap[rhythm[i]]);
    }

    //console.log(bufferSourceNotes[1])

    const bpb = Number(this.getAttribute('bpb')) || 4;  //beats per bar
    const bars = rhythm.length / bpb; // Number(this.getAttribute('bars')) || 4  //number of  bars

    const bpm = 60;

    const duration = 1 / bpb / (bpm / 60); // 0.18
    const totaltime = rhythm.length * duration
    var notes = []
    var notetimes = []  // time of note in notes[] relative to start of rhythm
    for (let i = 0; i < rhythm.length; i++) {
      if (rhythm[i] !== 'x' && rhythm[i] !== '-') {
        notes.push(rhythm[i])
        notetimes.push(i * duration)
      }
    }


    // create Play button 
    const playbutton = document.createElement('button')
    //playbutton.setAttribute("rhythm",rhythmstring)
    // playbutton.setAttribute("onclick",'playZ("'.concat(rhythmstring).concat('")'));
    //playbutton.setAttribute('innerHTML', '<img src="djembe.jpeg" />');
    playbutton.textContent = 'Play';
    playbutton.dataset.playing = "false";
    playbutton.addEventListener(
      "click",
      () => {
        // Check if context is in suspended state (autoplay policy)
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }

        // Play or pause track depending on state
        if (playbutton.dataset.playing === "false") {
          playbutton.dataset.playing = "true";
          //const rhythm = this.getAttribute('rhythm');
          const rhythm = inputbox.value
          console.log(rhythm)
          const bpb = Number(this.getAttribute('bpb')) || 4;  //beats per bar
          const bars = rhythm.length / bpb; // Number(this.getAttribute('bars')) || 4  //number of  bars

          const bpm = 60;

          const duration = 1 / bpb / (bpm / 60); // 0.18
          const totaltime = rhythm.length * duration

          const ctime = audioContext.currentTime
          Schedule(0, ctime + 0.1)
          Schedule(1, ctime + 0.1)
        }


        else if (playbutton.dataset.playing === "true") {

          playbutton.dataset.playing = "false";
        }
      },
      false
    );


    // Schedules bufferSourceNotesnotes[i] 
    function Schedule(i, tref) {
      const tttt = tref + 0.2 * i;
      bufferSourceNotes[i].start(tttt);
    }




    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create spans
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');




    const inputbox = document.createElement('input');
    inputbox.setAttribute('type', 'text');
    inputbox.setAttribute('value', rhythm);
    //inputbox.setAttribute('readonly', '');
    inputbox.style.width = rhythm.length + "ch"; // ;setAttribute('width',  '5ch');

    const inputbox2 = document.createElement('input');
    inputbox2.setAttribute('type', 'text');
    const numbers = "12345678901234567890";
    const string = numbers.slice(0, bars + 1).split('').join('-'.repeat(bpb - 1)).slice(0, -1);
    inputbox2.setAttribute('placeholder', string)

    inputbox2.setAttribute('readonly', '');
    inputbox2.style.width = rhythm.length + "ch"; // ;setAttribute('width',  '5ch');



    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');

    style.textContent = `
        .wrapper {
          position: relative;
        }
        .info {
          font-size: 0.8rem;
          width: 200px;
          display: inline-block;
          border: 1px solid black;
          padding: 10px;
          background: white;
          border-radius: 10px;
          opacity: 0;
          transition: 0.6s all;
          position: absolute;
          bottom: 20px;
          left: 10px;
          z-index: 3;
        }
        img {
          width: 1.2rem;
        }
        input {
          font-size: 24px;
          font-family: monospace; 
          
        }
        .icon:hover + .info, .icon:focus + .info {
          opacity: 1;
        }
      `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    //  console.log(style.isConnected);
    shadow.appendChild(wrapper);
    //      wrapper.appendChild(icon);
    //wrapper.appendChild(info);
    wrapper.appendChild(inputbox2);
    wrapper.appendChild(document.createElement('br'));
    wrapper.appendChild(inputbox);
    wrapper.appendChild(document.createElement('br'));
    wrapper.appendChild(playbutton);

  }
}

// Define the new element
customElements.define('djembe-rhythm', DjembeRhythm);



// noteMap should be input so it can also work for Sangban etc. 






const nmap = [
  { "T": "wav/tone1.wav" },
  { "t": "wav/tone2.wav" },
  { "S": "wav/slap1.wav" },
  { "s": "wav/slap2.wav" },
  { "B": "wav/bass1.wav" },
  { "b": "wav/bass2.wav" },
  { "x": "wav/bass2.wav" },
  { "-": "wav/bass2.wav" }
]

/*
function readwav2buffer(filename) {
  // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/arrayBuffer
  
  let audioData = await fetch(filename).then(r => r.arrayBuffer());

  let audioCtx = new AudioContext({sampleRate:44100});

  let decodedData = await audioCtx.decodeAudioData(audioData); // audio is resampled to the AudioContext's sampling rate

  return decodedData;
}

*/
// This returns an AudioBufferSourceNode that automatically recreates when it ends playing  
function createDjembeBufferSource(buffer) {
  const source = audioContext.createBufferSource();
  //console.log(buffer)
  source.buffer = buffer;
  source.addEventListener("ended", () => {
    console.log("Recreating SourceNode");
    createDjembeBufferSource(buffer);
  })
  return source;

}

