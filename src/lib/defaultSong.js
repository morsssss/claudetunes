/* 
 * Let's start out with the notes and lyrics to a song, so we can display something in the interface from the very beginning.
 * We could ask Claude for this too, but prefilling means less delay on startup.
 */

const defaultSongNotes = [
  { "pitch": "E4", "duration": "1" },
  { "pitch": "E4", "duration": "1" },
  { "pitch": "E4", "duration": "2" },

  { "pitch": "E4", "duration": "1" },
  { "pitch": "E4", "duration": "1" },
  { "pitch": "E4", "duration": "2" },

  { "pitch": "E4", "duration": "1" },
  { "pitch": "G4", "duration": "1" },
  { "pitch": "C4", "duration": "1" },
  { "pitch": "D4", "duration": "1" },

  { "pitch": "E4", "duration": "1" },

  { "pitch": "F4", "duration": "1" },
  { "pitch": "F4", "duration": "1" },
  { "pitch": "F4", "duration": "1" },
  { "pitch": "F4", "duration": "1" },

  { "pitch": "F4", "duration": "1" },
  { "pitch": "E4", "duration": "1" },
  { "pitch": "E4", "duration": "1" },
  { "pitch": "E4", "duration": "1" },

  { "pitch": "E4", "duration": "1" },
  { "pitch": "D4", "duration": "1" },
  { "pitch": "D4", "duration": "1" },
  { "pitch": "E4", "duration": "1" },

  { "pitch": "D4", "duration": "2" },
  { "pitch": "G4", "duration": "2" }
];

const defaultSongLyrics = [
  "Jingle bells,",
  "Jingle bells,",
  "Jingle all the way.",
  "Oh what fun it is to ride",
  "In a one-horse open sleigh."
];

const defaultSongData = {
  title: 'Jingle Bells',
  mode: 'major',
  timeSignature: '4',
  inversion: 'normal',
  language: 'English',
  topic: 'Christmas',
  notes: defaultSongNotes,
  lyrics: defaultSongLyrics
};

export default defaultSongData;
