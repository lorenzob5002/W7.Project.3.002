let audioCtx;
let osc, modOsc, modGain, gainNode;

document.getElementById("start").addEventListener("click", () => {
    if (!audioCtx || audioCtx.state === 'closed') {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        osc = audioCtx.createOscillator();
        modOsc = audioCtx.createOscillator();
        modGain = audioCtx.createGain();
        gainNode = audioCtx.createGain();
        
        osc.type = document.getElementById("waveform").value;
        osc.frequency.value = 440;
        modOsc.frequency.value = document.getElementById("modFreq").value;
        modGain.gain.value = 200; 
        gainNode.gain.value = 0.5; 
        
        modOsc.connect(modGain);
        modGain.connect(osc.frequency);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        modOsc.start();
    }
});

document.getElementById("stop").addEventListener("click", () => {
    if (audioCtx) {
        osc.stop();
        modOsc.stop();
        osc.disconnect();
        modOsc.disconnect();
        modGain.disconnect();
        gainNode.disconnect();
        audioCtx.close().then(() => {
            audioCtx = null;
        });
    }
});

document.getElementById("waveform").addEventListener("change", (event) => {
    if (osc) osc.type = event.target.value;
});

document.getElementById("modFreq").addEventListener("input", (event) => {
    document.getElementById("modFreqVal").textContent = event.target.value;
    if (modOsc) modOsc.frequency.value = event.target.value;
});