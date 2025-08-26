/*
 * This is our audio player!
 * The player expects to get notes as objects with pitch in Scientific Pitch Notation
 * and durations in quantities of quarter notes,
 * so, like "1" is a quarter note, "3" is a dotted half, etc.
 * 
 * Great feature to add: a stop button.
 */

import * as Tone from 'tone';

const TEMPO = 120; // beats per minute, or bpm, for you EDM fans
const quarterNoteTime = 60 / TEMPO;

async function playSong(notes) {
  await Tone.start();
  const transport = Tone.getTransport();
  const synth = new Tone.Synth().toDestination()

// Stop any currently playing audio before starting new playback
  if (transport.state === 'started') {
    transport.stop();
    transport.cancel(0); // Remove all scheduled events
  }

// Schedule each note to play at the right time, accumulating total time as we go
  let totalTime = 0;

  for (let i = 0; i < notes.length; i++) {
    let noteTime = notes[i].duration * quarterNoteTime;

    transport.schedule(
      () => synth.triggerAttackRelease(notes[i].pitch, noteTime),
      totalTime
    );

    totalTime += noteTime;
  }

  transport.start();
}

export default playSong;

/*
export function stopAudio() {
  if (synth) {
    synth.triggerRelease()
  }
}
*/