

const panner1 = new Tone.Panner(-0.5).toDestination();
const panner2 = new Tone.Panner(0.5).toDestination();

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



Tone.Transport.bpm.value=180
Tone.Transport.timeSignature = 3;
Tone.Transport.humanize=1;

//metronoom="1-----2-----3-----4-----"
//rhythm1  ="B--t-sB---s-BtTtTtB---s-"
//rhythm2  ="B--t-sB-TtTtB--t--B-TtTt"
indices = new Array(); 

const table =  document.getElementsByTagName("table")[0] // only first table
//table.style = "font-family: monospace;"
// var header = rhythmtable.createTHead();

var metronoomtablerow = table.rows[0] // header.insertRow(0);
var djembe1tablerow = table.rows[1] // rhythmtable.insertRow(1);
var djembe2tablerow = table.rows[2] // rhythmtable.insertRow(1);

console.log("length ", djembe1tablerow.cells)
//var djembe2tablerow = rhythmtable.insertRow(2);

//var fontsize="60px"
//var cell=metronoomtablerow.insertCell(0); cell.innerHTML = "";       cell.style.fontSize = fontsize 

//for (let i=0; i < table.rows[0].length; i++){
//    const inst = table.rows[i].cells[0].innerHTML;
//    console.log(inst)

//}
 
//var cell=djembe1tablerow.insertCell(0); cell.innerHTML = "Djembe 1"; cell.style.fontSize = fontsize
//var cell=djembe2tablerow.insertCell(0); cell.innerHTML = "Djembe 2"; cell.style.fontSize = fontsize
console.log(metronoomtablerow.cells.length)

for (let i=0; i < metronoomtablerow.cells.length-1; i++) { 
  indices.push(i)

 var c=metronoomtablerow.cells[i+1]; 
 console.log(c)
 c.id="d"+i;  // c.style.fontSize = fontsize
 //var c=djembe1tablerow.insertCell(i+1); c.innerHTML = rhythm1[i]; c.style.fontSize = fontsize
 //var c=djembe2tablerow.insertCell(i+1); c.innerHTML = rhythm2[i];  c.style.fontSize = fontsize 

}
console.log("indices", indices)

//rhythmarray=rhythm.split("")

//Tone.scheduleRepeat(djembe1["T"],1/3)

const seq = new Tone.Sequence((time, idx) => {
  //console.log(djembe.get(note))
 // console.log(rhythm1[idx])
 console.log("In seq")
 var idxm1;
  if (idx==0) {idxm1 = metronoomtablerow.length-1} else {idxm1 =idx-1} 
  console.log(idxm1)
  m = document.getElementById("d"+idxm1); m.style.backgroundColor = "";
  m = document.getElementById("d"+idx); m.style.backgroundColor="#d7d9f2";
  if (djembe1tablerow.cells[idx].innerHTML != "-") {  djembe1[djembe1tablerow.cells[idx].innerHTML].start(time);} 
  if (djembe2tablerow.cells[idx].innerHTML != "-") {  djembe2[djembe2tablerow.cells[idx].innerHTML].start(time);}  
},  indices ).start(0);


//async () => {
//	await Tone.start()
//	console.log('audio is ready')

document.getElementById("play-button").addEventListener("click", async () => {
  console.log(Tone.context)
  Tone.context.resume().then(() => 
  {if (Tone.Transport.state !== 'started') {
    console.log("starting")
     djembe1["T"].start()    
     Tone.Transport.start();
    console.log('audio is ready')

  } else {
    Tone.Transport.stop();
  }}
  )
});

var slider =  document.getElementById("sliderbpm")
var sliderDiv = document.getElementById("sliderAmount")
slider.onchange= function() {Tone.Transport.bpm.value = this.value;  sliderDiv.innerHTML = "BPM " + this.value};



