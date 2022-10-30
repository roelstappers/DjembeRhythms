
//https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
var audioContext = new window.AudioContext();

const noteMap = {
  "T": { file: "wav/tone1.wav", hand: "r" },
  "t": { file: "wav/tone2.wav", hand: "l" },
  "S": { file: "wav/slap1.wav", hand: "r" },
  "s": { file: "wav/slap2.wav", hand: "l" },
  "B": { file: "wav/bass1.wav", hand: "r" },
  "b": { file: "wav/bass2.wav", hand: "r" }
};



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

          notes = []
          notetimes = []  // time of note in notes[] relative to start of rhythm
          for (let i = 0; i < rhythm.length; i++) {
            if (rhythm[i] !== 'x' && rhythm[i] !== '-') {
              notes.push(rhythm[i])
              notetimes.push(i * duration)
            }
          }
 
          const ctime=  audioContext.currentTime
          Schedule(0,ctime+0.1)
          Schedule(1,ctime+0.1)
        }


        else if (playbutton.dataset.playing === "true") {

          playbutton.dataset.playing = "false";
        }
      },
      false
    );


    // Schedules notes[i] at time notetimes[i]
    function Schedule(i, tref) {
      if (playbutton.dataset.playing == "false") { return }
      //  https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData
      // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createBufferSource

      
      const tttt = tref + notetimes[i];
      const lr = noteMap[notes[i]].hand;
      const filename = noteMap[notes[i]].file;
      const source = audioContext.createBufferSource();
      const req = new XMLHttpRequest();
      req.open('GET', filename, true);
      req.responseType = 'arraybuffer';

      req.onload = () => {
        const audioData = req.response;
        audioContext.decodeAudioData(audioData).then(buffer => {
          // console.log(buffer)     
          source.buffer = buffer;

          let merger = new ChannelMergerNode(audioContext, { numberOfInputs: 2 });
          merger.connect(audioContext.destination);
          //dominanthandr = "r" // document.getElementById("dominanthandr").value
          const dh = document.querySelector('input[name="DominantHand"]:checked').value;
          if (dh === "l") { var l = 1; var r = 0 } else { var l = 0; var r = 1 }

          if (lr === "l") { source.connect(merger, 0, l); }
          else { source.connect(merger, 0, r) }

          //source.connect(audioContext.destination);

          source.start(tttt);   // add 
          source.addEventListener("ended", () => {

            if ((i + 2) >= notes.length) {
              Schedule(i + 2 - notes.length, tref + totaltime)
            } else {
              Schedule(i + 2, tref);
            }// loop sound
          })


        })
      }
      req.send()

    }







  
    const inputbox = document.createElement('input');
    inputbox.setAttribute('type', 'text');
    inputbox.setAttribute('value', rhythm);
    //inputbox.setAttribute('readonly', '');
    inputbox.style.width = rhythm.length + "ch"; // ;setAttribute('width',  '5ch');

    const inputbox2 = document.createElement('input');
    inputbox2.setAttribute('type', 'text');
    const numbers = "12345678901234567890";
    const string = numbers.slice(0,bars+1).split('').join('-'.repeat(bpb-1)).slice(0,-1);
    inputbox2.setAttribute('placeholder',string)

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


