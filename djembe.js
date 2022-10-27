

export class Djembe {
 //   constructor(
   //    readAsBuffer("wav/tone1.wav","T");
    t  = readAsBuffer("wav/tone2.wav");
    
} 

function readAsBuffer(filename) {
    const audioData = await fetch(filename).then(r => r.arrayBuffer());
    const audioCtx = new AudioContext();
    const decodedData = await audioCtx.decodeAudioData(audioData); // audio is resampled to the AudioContext's sampling rate
    console.log(decodedData)
    this.T  decodedData;
 }

 export default Djembe
 