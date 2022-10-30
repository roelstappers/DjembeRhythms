
//instrument :{
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


const instruments = {"djembe1" : djembe1, "djembe2": djembe2}
console.log("pp",instruments["djembe1"])

// Create a class for the element
class DjembeRhythm extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        this.instrument = instruments[this.getAttribute("instrument")]
        this.gain = new Tone.Gain(1);
        this.gain.toDestination()
        this.instrument.connect(this.gain)
   
        this.createTable();
        this.scheduleOnTransport();
    }
}

DjembeRhythm.prototype.createTable = createTable
DjembeRhythm.prototype.scheduleOnTransport = scheduleOnTransport

function createTable() {
    const rhythm = this.getAttribute("rhythm")
 
    const name = this.getAttribute("name")
    //    console.log(rhythm)

    outerdiv = document.createElement("div");
    const button = document.createElement("button"); button.innerHTML = "Play"
    const gainSlider = document.createElement("input");
    gainSlider.type = "range"; gainSlider.min = "0"; gainSlider.max = "1";
    gainSlider.step = "0.1"
    gainSlider.value =   this.getAttribute("gain")  || 1;
    gainSlider.id = "myRange"
    this.gain.gain.rampTo(gainSlider.value)
    gainSlider.onchange = () => {console.log(gainSlider.value); this.gain.gain.rampTo(gainSlider.value)} 
    
    
    // Create table 
    table = document.createElement("table")
    outerdiv.append(table)

    const controlsrow = table.insertRow(0)

    const metronoomrow = table.insertRow(1)
    const rhythmrow = table.insertRow(2)
    this.metronoomrow = metronoomrow; 

    const cellstyle = "padding: 10px;   border: 1px solid goldenrod; ";
    for (let i = 0; i < rhythm.length; i++) {
        controlsrow.insertCell(i)
        const val = (i % 4 == 0) ? Math.floor(i / 4) + 1 : '-';
       // console.log(val)
        const cell = metronoomrow.insertCell(i);
        cell.innerHTML = val;
        cell.style = cellstyle;
        cell.id = "m" + (i + 1);
        cell2 = rhythmrow.insertCell(i);
        cell2.innerHTML = rhythm[i];
        cell2.style = cellstyle;
        cell2.id = "n" + (i + 1);
    }

    controlsrow.cells[0].colSpan = 4
    controlsrow.cells[1].colSpan = 4
    controlsrow.cells[2].colSpan = 4

    controlsrow.cells[0].append(name);
    controlsrow.cells[1].append(button);
    controlsrow.cells[2].append(gainSlider);


    button.onclick =   function starttone(){
        console.log("hi")
        Tone.context.resume().then(() => {
    
        if (Tone.Transport.state !== 'started' ) {
           //djembe1["T"].start()
           Tone.Transport.start(0.1);
        } else {
            Tone.Transport.stop();
        }})
      }
    

    table.style = "text-align: center; background-color: lemonchiffon; border-collapse: collapse;"
    //metronoomrow.style = "background-color: goldenrod; color: white; "
    controlsrow.style = "background-color: goldenrod; color: white; "
    this.append(outerdiv)
}
//console.log(table)

function scheduleOnTransport() {
    const rhythm = this.getAttribute("rhythm").split("")
    console.log(rhythm)
    indices = [...Array(rhythm.length).keys()]; // 0,1,2.......
    const seq = new Tone.Sequence((time, ind) => {
        if (rhythm[ind] !='-') {this.instrument.player(rhythm[ind]).start(time)}
          // console.log(
            this.metronoomrow.cells[ind].style.backgroundColor = "green"
            const indm1 = (ind==0) ? rhythm.length-1 : ind -1
            this.metronoomrow.cells[indm1].style.backgroundColor = "lemonchiffon"
            
           //cell.backgroundColor = "black"
    }, indices)
    // singal always started before other
    if (this.getAttribute('name') == "Signal" ) {
        seq.loop=false
        seq.start(0)

    } else {
       seq.start("2m")
    }
}
console.log(Tone.Transport)
Tone.Transport.bpm.value=140
customElements.define('djembe-rhythm', DjembeRhythm);
