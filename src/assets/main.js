

const panner1 = new Tone.Panner(-0.8).toDestination();
const panner2 = new Tone.Panner(0.8).toDestination();

//instruments = {
    djembe1 = { 
         T : new Tone.Player("./assets/wav/tone1.wav").connect(panner1),
         S : new Tone.Player("./assets/wav/slap1.wav").connect(panner1),
         B : new Tone.Player("./assets/wav/bass1.wav").connect(panner1),
         t : new Tone.Player("./assets/wav/tone2.wav").connect(panner1),
         s : new Tone.Player("./assets/wav/slap2.wav").connect(panner1),
         b : new Tone.Player("./assets/wav/bass2.wav").connect(panner1),
    };
    djembe2 = { 
         T : new Tone.Player("./assets/wav/tone1.wav").connect(panner2),
         S : new Tone.Player("./assets/wav/slap1.wav").connect(panner2),
         B : new Tone.Player("./assets/wav/bass1.wav").connect(panner2),
         t : new Tone.Player("./assets/wav/tone2.wav").connect(panner2),
         s : new Tone.Player("./assets/wav/slap2.wav").connect(panner2),
         b : new Tone.Player("./assets/wav/bass2.wav").connect(panner2),
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
    if (djembe1tablerow.cells[idx].innerHTML != "-") {  djembe1[djembe1tablerow.cells[idx].innerHTML].start(time);} 
    if (djembe2tablerow.cells[idx].innerHTML != "-") {  djembe2[djembe2tablerow.cells[idx].innerHTML].start(time);}  
},  indices ).start(0);


//async () => {
//	await Tone.start()
//	console.log('audio is ready')

document.getElementById("play-button").addEventListener("click", async () => {
    Tone.context.resume().then(() => {
        if (Tone.Transport.state !== 'started') {
            Tone.Transport.start();
        } else {
            Tone.Transport.stop();
        }
     })
});

var slider =  document.getElementById("sliderbpm")
var sliderDiv = document.getElementById("sliderAmount")
slider.onchange= function() {Tone.Transport.bpm.value = this.value;  sliderDiv.innerHTML = "BPM " + this.value};



