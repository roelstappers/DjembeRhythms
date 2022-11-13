
// instruments 
const djembe0 = new Tone.Players({ 
        "T" : "./wav/tone1.wav",
        "S" : "./wav/slap1.wav",
        "B" : "./wav/bass1.wav",
        "t" : "./wav/tone2.wav",
        "s" : "./wav/slap2.wav",
        "b" : "./wav/bass2.wav"
   });



const djembe1 = new Tone.Players({ 
        "T" : "./wav/tone1.wav",
        "S" : "./wav/slap1.wav",
        "B" : "./wav/bass1.wav",
        "t" : "./wav/tone2.wav",
        "s" : "./wav/slap2.wav",
        "b" : "./wav/bass2.wav"
   });

const djembe2 = new Tone.Players({ 
    "T" : "./wav/tone1.wav",
    "S" : "./wav/slap1.wav",
    "B" : "./wav/bass1.wav",
    "t" : "./wav/tone2.wav",
    "s" : "./wav/slap2.wav",
    "b" : "./wav/bass2.wav"
});


const instruments = {"djembe0" : djembe0, "djembe1" : djembe1, "djembe2": djembe2}

//----------------------------------------

// Create a class for the element
class DjembeRhythm extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
 
        this.name = this.getAttribute("name")
 
        this.instrument = instruments[this.getAttribute("instrument")]
        this.bpb       = this.getAttribute("bpb")
        Tone.Transport.timeSignature = this.bpb

        const gainval = parseFloat(this.getAttribute("gain")) || 0.9;
        this.gain = new Tone.Gain(gainval);
        this.gain.toDestination()
        this.instrument.connect(this.gain)
        this.rhythm = this.getAttribute("rhythm")
   
        console.log("init gain", this.gain.gain.value)
        this.createControlsrow();
        this.createTable();
        this.scheduleOnTransport();
    }
}

DjembeRhythm.prototype.createTable = createTable
DjembeRhythm.prototype.createControlsrow = createControlsrow

DjembeRhythm.prototype.scheduleOnTransport = scheduleOnTransport


function createControlsrow() {

    const rowdiv = document.createElement("div")
    rowdiv.setAttribute("class","row bg-warning ")

    // Create cols
    const coldiv1 = document.createElement("div")
    coldiv1.setAttribute("class","col")

    const coldiv2 = document.createElement("div")
    coldiv2.setAttribute("class","col")
    const coldiv3 = document.createElement("div")
    coldiv3.setAttribute("class","col")


    rowdiv.append(coldiv1,coldiv2,coldiv3)

    // Name
    const span = document.createElement("span")
    span.innerText = this.name
    coldiv1.append(span)
    //span.setAttribute("class","align-baseline");
    
    // Create button 
  //  const button = document.createElement("button"); button.innerHTML = "Play"

    
    
   // coldiv2.append(button)



    // Create Gain slider 
    const gainSlider = document.createElement("input");
    gainSlider.type = "range"; gainSlider.min = 0.0; gainSlider.max = 1.0;
    gainSlider.class = "form-range"
    gainSlider.step = 0.1
    gainSlider.value =   this.gain.gain.value // getAttribute("gain")  || 1;
    gainSlider.id = "myRange"
    this.gain.gain.rampTo(gainSlider.value)
    gainSlider.onchange = () => {console.log(gainSlider.value); this.gain.gain.rampTo(parseFloat(gainSlider.value),0.1);console.log(this.gain.gain.value)} 
    
    coldiv3.append(gainSlider)
    this.append(rowdiv)
    //

}


function createTable() {
   // const rhythm = this.getAttribute("rhythm")
    //    console.log(rhythm)

    //outerdiv = document.createElement("div");
    //outerdiv.setAttribute("class","table-responsive")
    // Create table 
    row = document.createElement("div")
    row.setAttribute("class","row")

    table = document.createElement("table")
    table.setAttribute("class","table  table-sm table-responsive table-bordered")
    table.style.tableLayout = "fixed"
    row.append(table)

    const metronoomrow = table.insertRow(0)

    const rhythmrow = table.insertRow(1)
    this.metronoomrow = metronoomrow; 

   //  const cellstyle = "padding: 10px;   border: 1px solid goldenrod; ";
    for (let i = 0; i < this.rhythm.length; i++) {
        const val = (i % this.bpb == 0) ? Math.floor(i / this.bpb) + 1 : '-';

        const cell = metronoomrow.insertCell(i);
        cell.innerHTML = val;
        cell.id = "m" + (i + 1);
        cell.setAttribute("class","text-center")
        cell.style.width = 100/this.rhythm.length; 
       // cell.setAttribute("padding","0")
       // cell.setAttribute("margin","0")
      //  cell.style = "border: 1px solid black;   border-collapse: collapse;"
          
        
        const cell2 = rhythmrow.insertCell(i);
        cell2.innerHTML = this.rhythm[i];
        cell2.setAttribute("class","text-center")
        cell2.style.width = 100/this.rhythm.length; 
        
       //   cell2.setAttribute("padding","0")
      //  cell2.setAttribute("margin","0")
        cell2.id = "n" + (i + 1);
     //   cell2.style = "border: 1px solid black;   border-collapse: collapse;"
       
    }

    this.append(row) //outerdiv)
}

function scheduleOnTransport() {
    indices = [...Array(this.rhythm.length).keys()]; // 0,1,2.......
    const seq = new Tone.Sequence((time, ind) => {
        if (this.rhythm[ind] !='-') {this.instrument.player(this.rhythm[ind]).start(time)}
          // console.log(
            this.metronoomrow.cells[ind].style.backgroundColor = "green"
            const indm1 = (ind==0) ? this.rhythm.length-1 : ind -1
            this.metronoomrow.cells[indm1].style.backgroundColor = "lemonchiffon"
     }, indices)
     seq.humanize = false 
    // singal always started before other
    if (this.getAttribute('name') == "Signal" ) {
        seq.loop=false
        seq.start(0)

    } else {
       seq.start("2m")
    }
}
customElements.define('djembe-rhythm', DjembeRhythm);


// Header
const header = document.getElementById("header")
header.style.backgroundColor = "#90bd84"
header.setAttribute("class","row")

const titlediv = document.createElement("div")
titlediv.setAttribute("class","col")

const sliderdiv = document.createElement("div")
sliderdiv.setAttribute("class","col")

const playbuttondiv = document.createElement("div")
playbuttondiv.setAttribute("class","col")


const title = document.createElement("h1")
titlediv.append(title)
const bpmslider = document.createElement("input")
sliderdiv.append(bpmslider)
const playbutton = document.createElement("button")
playbuttondiv.append(playbutton)

header.append(titlediv,playbuttondiv,sliderdiv)


// Title
title.innerText = document.title


// bpmslider
bpmslider.setAttribute("type","range")
bpmslider.setAttribute("min","60")
bpmslider.setAttribute("max","300")
bpmslider.setAttribute("value","200")
Tone.Transport.bpm.value = bpmslider.value
bpmslider.oninput = () => {  Tone.Transport.bpm.rampTo(bpmslider.value) } 

// Playbutton
playbutton.setAttribute("class","btn btn-primary btn");
playbutton.setAttribute("type","button") 
playbutton.innerText="Play"
playbutton.onclick =   function starttone(){
    Tone.context.resume().then(() => {
    if (Tone.Transport.state !== 'started' ) {
       Tone.Transport.start();
    } else {
        Tone.Transport.pause();
    }})
  }


