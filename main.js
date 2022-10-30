document.getElementById("play-button").addEventListener("click", async () => {
    Tone.context.resume().then(() => {
        if (Tone.Transport.state !== 'started') {
            Tone.Transport.start();
        } else {
            Tone.Transport.stop();
        }
     })
});

var sliderGain1 =  document.getElementById("gain1")
const gain1 = new Tone.Gain(sliderGain1.value).toDestination();
sliderGain1.onchange= function() {gain1.gain.rampTo(this.value); this.innerHTML = this.value};

var sliderGain2 =  document.getElementById("gain2")
const gain2 = new Tone.Gain(sliderGain2.value).toDestination();
sliderGain2.onchange= function() {gain2.gain.rampTo(this.value); this.innerHTML = this.value};



var slider =  document.getElementById("sliderbpm")
var sliderDiv = document.getElementById("sliderAmount")
slider.onchange= function() {Tone.Transport.bpm.value = this.value;  sliderDiv.innerHTML = "BPM " + this.value};


var sliderPanner1 =  document.getElementById("panner1")
const panner1 = new Tone.Panner(sliderPanner1.value).connect(gain1);
sliderPanner1.onchange= function() {panner1.pan.rampTo(this.value);};

var sliderPanner2 =  document.getElementById("panner2")
console.log(sliderPanner2.value)
const panner2 = new Tone.Panner(sliderPanner2.value).connect(gain2);
sliderPanner2.onchange= function() {panner2.pan.rampTo(this.value);};


//instruments = {
    djembe1 = { 
         T : new Tone.Player("./wav/tone1.wav").connect(panner1),
         S : new Tone.Player("./wav/slap1.wav").connect(panner1),
         B : new Tone.Player("./wav/bass1.wav").connect(panner1),
         t : new Tone.Player("./wav/tone2.wav").connect(panner1),
         s : new Tone.Player("./wav/slap2.wav").connect(panner1),
         b : new Tone.Player("./wav/bass2.wav").connect(panner1),
    };
    djembe2 = { 
         T : new Tone.Player("./wav/tone1.wav").connect(panner2),
         S : new Tone.Player("./wav/slap1.wav").connect(panner2),
         B : new Tone.Player("./wav/bass1.wav").connect(panner2),
         t : new Tone.Player("./wav/tone2.wav").connect(panner2),
         s : new Tone.Player("./wav/slap2.wav").connect(panner2),
         b : new Tone.Player("./wav/bass2.wav").connect(panner2),
    }
//};


const table =  document.getElementsByTagName("table")[0] // only first table

Tone.Transport.bpm.value=180
Tone.Transport.timeSignature = 3;
Tone.Transport.humanize=1;

indices = new Array(); 


var metronoomtablerow = table.rows[0] 
var djembe1tablerow   = table.rows[1] 
var djembe2tablerow   = table.rows[2] 


for (let i=1; i < metronoomtablerow.cells.length; i++) { 
    indices.push(i)
    var c=metronoomtablerow.cells[i]; 
    c.id="d"+i;  // Set id for easy access later
}

const seq = new Tone.Sequence((time, idx) => {
    var idxm1;
    if (idx==1) {idxm1 = metronoomtablerow.cells.length-1} else {idxm1 = idx-1} 
    // console.log(idx, " ", idxm1 )
    m = document.getElementById("d"+idxm1); m.style.backgroundColor = "";
    m = document.getElementById("d"+idx); m.style.backgroundColor="#d7d9f2";
    if (djembe2tablerow.cells[idx].innerHTML != "-") {  djembe2[djembe2tablerow.cells[idx].innerHTML].start(time);}  
    if (djembe1tablerow.cells[idx].innerHTML != "-") {  djembe1[djembe1tablerow.cells[idx].innerHTML].start(time);} 
},  indices ).start(0);
