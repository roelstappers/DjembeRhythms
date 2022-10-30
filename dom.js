
    djembe1 = { 
        T : new Tone.Player("./wav/tone1.wav").toDestination(), //onnect(panner1),
        S : new Tone.Player("./wav/slap1.wav").toDestination(),//connect(panner1),
        B : new Tone.Player("./wav/bass1.wav").toDestination(),//onnect(panner1),
        t : new Tone.Player("./wav/tone2.wav").toDestination(),//connect(panner1),
        s : new Tone.Player("./wav/slap2.wav").toDestination(),//connect(panner1),
        b : new Tone.Player("./wav/bass2.wav").toDestination()//connect(panner1),
   };
//   djembe2 = { 
 //       T : new Tone.Player("./wav/tone1.wav").connect(panner2),
 //       S : new Tone.Player("./wav/slap1.wav").connect(panner2),
 //       B : new Tone.Player("./wav/bass1.wav").connect(panner2),
 //       t : new Tone.Player("./wav/tone2.wav").connect(panner2),
 //       s : new Tone.Player("./wav/slap2.wav").connect(panner2),
 //       b : new Tone.Player("./wav/bass2.wav").connect(panner2),
 //  }




// Create a class for the element
class DjembeRhythm extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
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
    gainSlider.type = "range"; gainSlider.min = "1"; gainSlider.max = "200";
    gainSlider.value = "50"; gainSlider.id = "myRange"


    // Create table 
    table = document.createElement("table")
    outerdiv.append(table)

    const controlsrow = table.insertRow(0)

    const metronoomrow = table.insertRow(1)
    const rhythmrow = table.insertRow(2)


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
    const seq = new Tone.Sequence((time, note) => {
        if (note !='-') {djembe1[note].start(time)}
           cell = document.getElementById("m"+i);
           cell.backgroundColor = "black"
    }, rhythm)
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
