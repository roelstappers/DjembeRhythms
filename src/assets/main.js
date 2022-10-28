<script>

const panner1 = new Tone.Panner(-0.5).toDestination();
const panner2 = new Tone.Panner(0.5).toDestination();

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
};



Tone.Transport.bpm.value=180
Tone.Transport.timeSignature = 3;
Tone.Transport.humanize=1;

metronoom="1-----2-----3-----4-----"
rhythm1  ="B--t-sB---s-BtTtTtB---s-"
rhythm2  ="B--t-sB-TtTtB--t--B-TtTt"
indices = new Array(); 

var rhythmtable =  document.getElementById("rhythm")
rhythmtable.style = "font-family: monospace;"
var header = rhythmtable.createTHead();

var metronoomtablerow = header.insertRow(0);
var djembe1tablerow = rhythmtable.insertRow(1);
var djembe2tablerow = rhythmtable.insertRow(2);

var fontsize="60px"
var cell=metronoomtablerow.insertCell(0); cell.innerHTML = "";       cell.style.fontSize = fontsize 
var cell=djembe1tablerow.insertCell(0); cell.innerHTML = "Djembe 1"; cell.style.fontSize = fontsize
var cell=djembe2tablerow.insertCell(0); cell.innerHTML = "Djembe 2"; cell.style.fontSize = fontsize

for (let i=0; i < rhythm1.length; i++) { 
  indices.push(i)
 var c=metronoomtablerow.insertCell(i+1); c.innerHTML = metronoom[i]; c.id="d"+i; c.style.fontSize = fontsize
  var c=djembe1tablerow.insertCell(i+1); c.innerHTML = rhythm1[i]; c.style.fontSize = fontsize
 var c=djembe2tablerow.insertCell(i+1); c.innerHTML = rhythm2[i];  c.style.fontSize = fontsize 

}


//rhythmarray=rhythm.split("")

//Tone.scheduleRepeat(playrhythm,1/3)

const seq = new Tone.Sequence((time, idx) => {
  //console.log(djembe.get(note))
 // console.log(rhythm1[idx])
 var idxm1;
  if (idx==0) {idxm1 = rhythm1.length-1} else {idxm1 =idx-1} 
  console.log(idxm1)
  m = document.getElementById("d"+idxm1); m.style.backgroundColor = "";
  m = document.getElementById("d"+idx); m.style.backgroundColor="#d7d9f2";
  if (rhythm1[idx] != "-") {  djembe1[rhythm1[idx]].start(time);} 
  if (rhythm2[idx] != "-") {  djembe2[rhythm2[idx]].start(time);}  
},  indices ).start(0);




document.getElementById("play-button").addEventListener("click", function() {
  if (Tone.Transport.state !== 'started') {
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
});

var slider =  document.getElementById("sliderbpm")
var sliderDiv = document.getElementById("sliderAmount")
slider.onchange= function() {Tone.Transport.bpm.value = this.value;  sliderDiv.innerHTML = "BPM " + this.value};

</script>

