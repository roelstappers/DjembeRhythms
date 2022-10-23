
//https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
var audioContext = new window.AudioContext();

const noteMap= {
   "T" : {file: "wav/tone1.wav", hand : "r"},
   "t" : {file: "wav/tone2.wav", hand : "l"},
   "S" : {file: "wav/slap1.wav", hand : "r"},
   "s" : {file: "wav/slap2.wav", hand : "l"},
   "B" : {file: "wav/bass1.wav", hand : "r"},
   "b" : {file: "wav/bass2.wav", hand : "r"}
  };



// Create a class for the element
class DjembeRhythm extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // Create a shadow root
      const shadow = this.attachShadow({mode: 'open'});
  
      // Create spans
      const wrapper = document.createElement('span');
      wrapper.setAttribute('class', 'wrapper');
  
      
      // Create info box
      const info = document.createElement('span');
      info.setAttribute('class', 'info');
  
      // Take attribute content and put it inside the info span
      const text = this.getAttribute('data-text');
      const rhythm = this.getAttribute('rhythm');
      const bpb  = Number(this.getAttribute('bpb')) || 4;  //beats per bar
      const bars = rhythm.length/bpb; // Number(this.getAttribute('bars')) || 4  //number of  bars
      
      const bpm = 60;
      
      const duration= 1/bpb/(bpm/60); // 0.18
      console.log(duration, bpb)

      //console.log(duration)
      //if isNu
      //} else {
        // const duration = 0.12;
     //}        
      
      //console.log(swing)
      info.textContent = text;
  
      // Insert djembe icon
      //const icon = document.createElement('span');
      //icon.setAttribute('class', 'icon');
      //icon.setAttribute('tabindex', 0);
      //const img = document.createElement('img');
      //img.src = 'djembe.jpeg';
      //icon.appendChild(img);
  
      // create Play button 
      const playbutton = document.createElement('button')
      //playbutton.setAttribute("rhythm",rhythmstring)
     // playbutton.setAttribute("onclick",'playZ("'.concat(rhythmstring).concat('")'));
      //playbutton.setAttribute('innerHTML', '<img src="djembe.jpeg" />');
      playbutton.textContent= 'Play';
      playbutton.dataset.playing = "false";
      playbutton.addEventListener(
    "click",
     () => {
       console.log("tt")
    // Check if context is in suspended state (autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume();
      }

    // Play or pause track depending on state
    if (playbutton.dataset.playing === "false") {
      playbutton.dataset.playing = "true";
      console.log(rhythm)
      console.log(audioContext.currentTime);
      const reftime = audioContext.currentTime;
      const totaltime = duration*rhythm.length; 
      console.log(totaltime)
      for (let i=0; i < rhythm.length; i++) { 
         if (rhythm[i] !== "-" && rhythm[i] !=="x" ) { 
            Schedule(reftime+(duration*i),duration,totaltime,noteMap[rhythm[i]].hand,noteMap[rhythm[i]].file)
         }
      }

      
      
    } else if (playbutton.dataset.playing === "true") {
     
      playbutton.dataset.playing = "false";
    }
  },
  false
);


 //-------------------
 function Schedule(t,duration,dt,lr,filename) {  
  if (playbutton.dataset.playing == "false" ) { return } 
  //  https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData
  // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createBufferSource
  const source = audioContext.createBufferSource();  
  const req  = new XMLHttpRequest();
  req.open('GET',filename,true);
  req.responseType='arraybuffer';
  
  req.onload = () => {
      const audioData = req.response;
      audioContext.decodeAudioData(audioData).then(buffer => {
     // console.log(buffer)     
      source.buffer = buffer;

      let merger = new ChannelMergerNode(audioContext, {numberOfInputs: 2});
      merger.connect(audioContext.destination);
      //dominanthandr = "r" // document.getElementById("dominanthandr").value
      const dh = document.querySelector('input[name="DominantHand"]:checked').value;
      if (dh === "l") {var l=1; var r=0} else {var l=0; var r=1} 

      if (lr ==="l") { source.connect(merger,0,l);} 
      else {source.connect(merger,0,r)}

      //source.connect(audioContext.destination);
  
      source.start(t);   // add 
      source.addEventListener("ended",()=>Schedule(t+dt,duration,dt,lr,filename));  // loop sound
      
      
    })
  }
  req.send()
}






      // Create input box with rhythm
      const inputbox = document.createElement('input');
      inputbox.setAttribute('type','text');
      inputbox.setAttribute('value',rhythm);
      inputbox.setAttribute('readonly','');
      inputbox.style.width = rhythm.length + "ch"; // ;setAttribute('width',  '5ch');
     
      const inputbox2 = document.createElement('input');
      inputbox2.setAttribute('type','text');
      const numbers="12345678901234567890";
      const string = numbers.slice(0,bars+1).split('').join('-'.repeat(bpb-1)).slice(0,-1);
      inputbox2.setAttribute('placeholder',string)
     
      inputbox2.setAttribute('readonly','');
      inputbox2.style.width = rhythm.length + "ch"; // ;setAttribute('width',  '5ch');
      
      
  
      // Create some CSS to apply to the shadow dom
      const style = document.createElement('style');
     // console.log(style.isConnected);
  
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
      wrapper.appendChild(info);
      wrapper.appendChild(inputbox2);
      wrapper.appendChild(document.createElement('br'));
      wrapper.appendChild(inputbox);
      wrapper.appendChild(document.createElement('br'));
      wrapper.appendChild(playbutton);
      
    }
  }
  
  // Define the new element
  customElements.define('djembe-rhythm', DjembeRhythm);


 