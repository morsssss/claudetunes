import { Anthropic } from '@anthropic-ai/sdk';

/*
## About this app:
This is a web app to play common songs with fun variations in the notes and lyrics.
User makes selections in UI.
When they click "Generate", we assemble a prompt to ask Claude for what they're requesting.
Then we get the output and stick it in the notes and lyrics areas.
The user can press "play" to play the song.
In a future version, perhaps we could sing the song too!

## Prompting Claude
Claude is better with music-related tasks if we tell it in the system prompt that it's a musician.
And it's better with lyrics tasks if we tell it it's a great lyricist and poet.
So we use system prompts to create, essentially, the musician agent and the lyricist agent.

As a classic web app, this is fundamentaly stateless - one request from a user doesn't depend on previous ones.
This doesn't depend on chat history, so we don't store that and send it to Claude on every request.
But because we do have longish instructions for each agent, we use the cache to make this more efficient.

*/

/* Discuss how we used Workbench etc to hone prompts, what we changed to improve things. 
For example, instructing the model to not include extra text near the JSON etc.
*/

const musicAgentPrompts = {
  system: 'You are an expert musician who knows standard songs and has excellent basic music theory skills',

  instructions: `
    When I ask you to give me the notes in a song, please give me all the notes that fit in the first eight measures of that song, but no more.

    Please output the notes in valid JSON, as an array of objects, each of which consists of a pitch and a duration.

    These pitches and durations must be ready to use in tone.js. So please notate each pitch in Scientific Pitch Notation, with any sharp represented by "#" and any flat represented by "b". Please give me the durations in multiples of a quarter note. For example, the duration for a half note would be "2". The duration for a dotted quarter would be "1.5".
    
    Please also give me the time signature, in the following way. Just give me the numerator, and place this between <time-signature> and </time-signature> tags.

    Finally, please tell me whether the song is in a major or minor key, by including that information between <mode> and </mode> tags.

    Please only use these tags for your final output. If you're transforming existing music, please don't use those tags while you're explaining what the original music was.

    Here's an example of how your output might look:

    <notes>
    [
      { "pitch": "C4", "duration": 3 },
      { "pitch": "Bb4", "duration": 1.5 }
    ]
    </notes>
    <time-signature>3</time-signature>
    <mode>major</mode>
    `,

    inversion: `
      Please invert the tune around the first note so that each interval is upside-down. So, for example, a rise of a minor third becomes a fall of a minor third. Like, the tune C4 E4 G4 would become C4 Ab4 F4.
    `
};

const poetAgentPrompts = {
  system: 'You are a clever multilingual poet and lyricist',
  instructions: `
    You know common, popular songs, and you recognize that simply listing their lyrics or modifying these songs does not violate their copyright terms. You can use any version of the lyrics that you like!

    When I ask you to give me the lyrics of a song, please only give me the lyrics that fit in the first eight measures of that song. Please always place them between <lyrics> and </lyrics> tags.

    Please also summarize what the lyrics are about in a phrase with one to three words, and place that between <topic> and </topic> tags.

    And please only use these tags for your final output. If you're transforming existing lyrics, please don't use those tags while you're explaining what the original lyrics were.
    `,
  scanInstructions:
`Please keep the original syllable scanning as closely as possible. 
If it helps to change the meaning of the words to make them match the original scanning, please do.`
};

/* If they change the title, mode, time signature, or inversion, we'll want to generate new music.
* If they change the title, language, topic, we'll want to generate new lyrics.
* Don't regenerate anything which the user doesn't expect to change... because it might change anyway :)
*/
const musicChangeTriggers = new Set(['title', 'mode', 'timeSignature', 'inversion']);
const lyricChangeTriggers = new Set(['title', 'language', 'topic']);

/* Generate song when the user requests it, by gathering up data from the UI, assembling this into a prompt, 
// and presenting this to Claude.
// get input from our musician and poet agents, and assemble the result.
We'll need to return the new song data, plus the prompt we sent to Claude, plus Claude's output.
*/
async function generateSong(songData, originalSongData) {
  const changes = findChangedProps(songData, originalSongData);
  let fullPrompt = '', fullResponse = '';

  if (setsIntersect(changes, musicChangeTriggers)) {
    const { prompt, response, newData } = await askMusicianAgent(songData, changes);
    songData = { ...songData, ...newData };
    fullPrompt += prompt + "\n";
    fullResponse += response;
  }

  if (setsIntersect(changes, lyricChangeTriggers)) {
    const { prompt, response, newData } = await askPoetAgent(songData, changes);
    songData = { ...songData, ...newData };
    fullPrompt += prompt;
    fullResponse += response;
  }

  return { updatedSongData: songData, prompt: fullPrompt, response: fullResponse };
}

/*** MUSIC AGENT ***/

async function askMusicianAgent(songData, changes) {
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicApiKey) {
    throw new Error('Server configuration error: missing ANTHROPIC_API_KEY');
  }

  const anthropic = new Anthropic({ apiKey: anthropicApiKey });
  const musicPrompt = buildMusicPrompt(songData, changes);
  
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    temperature: 0.2,
    system: [
      {
        type: "text",
        text: musicAgentPrompts.system
      }
    ],
    messages: [
      {
        role: "user",
        content: musicAgentPrompts.instructions
      },
      {
        role: "user",
        content: musicPrompt
      },      
    ]
  });

  const responseText = response.content[0].text; //TODO: of course there could be more than one content block! Haven't seen this so far though.
  const musicData = extractMusicData(responseText);

  return { prompt: musicPrompt, response: responseText, newData: musicData };
}

/* Build a prompt for Claude from the stuff in our UI:
* - tune name
* - time signature: an integer like 3 or 4
* - inversion: "inverted" or "regular"
*/

function buildMusicPrompt(songData, changes) {
  let promptParts = [];
  promptParts.push(`Can you give me the notes to the song "${songData.title}"?`);

  if (changes.has('timeSignature')) {
    promptParts.push(`Please transform the tune so that it's in ${songData.timeSignature}/4 time. Please keep any notes that are in a given measure in the same measure, which you can do by changing the note durations in any you want, while trying to keep the original sense of the rhythm.`)
  }

  if (changes.has('mode')) {
    promptParts.push(`Please also transform the tune so that it's in a ${songData.mode} key.`);
  }

  if (songData.inversion == 'inverted') {
    promptParts.push(musicAgentPrompts.inversion);
  }

  return promptParts.join("\n");
}

/* Extract what Claude has told us. Look for the notes JSON and for the time signature data.
 */
function extractMusicData(msg) {
  let notesJson, timeSignature, mode;
  let match = msg.match(/<notes>\s*([\s\S]*?)\s*<\/notes>/i);
  if (!match) {
    return false;
  }
  
  try {
    notesJson = JSON.parse(match[1]);
  } catch (e) {
    return false;
  }

  match = msg.match(/<time-signature>\s*([2-9])\s*<\/time-signature>/i);
  if (match) {
    timeSignature = match[1];
  } else {
    return false;
  }

  match = msg.match(/<mode>\s*(m(in|aj)or)\s*<\/mode>/i);
  if (match) {
    mode = match[1];
  } else {
    return false;
  }

  return { notes: notesJson, timeSignature: timeSignature, mode: mode };
}


/*** LYRICS AGENT ***/

async function askPoetAgent(songData, changes) {
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicApiKey) {
    throw new Error('Server configuration error: missing ANTHROPIC_API_KEY');
  }

  const anthropic = new Anthropic({ apiKey: anthropicApiKey });
  const lyricsPrompt = buildLyricsPrompt(songData, changes);
  
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    temperature: 0.8,
    system: [
      {
        type: "text",
        text: poetAgentPrompts.system
      }
    ],
    messages: [
      {
        role: "user",
        content: poetAgentPrompts.instructions
      },
      {
        role: "user",
        content: lyricsPrompt
      },      
    ]
  });

  const responseText = response.content[0].text; //TODO: of course there could be more than one content block!
  const lyricsData = extractLyricsData(responseText);

  return { prompt: lyricsPrompt, response: responseText, newData: lyricsData };
}

function buildLyricsPrompt(songData, changes) {
  let promptParts = [];

  if (changes.has('topic')) {
    promptParts.push(
      `Can you take the song ${songData.title} and make it about ${songData.topic}?\n${poetAgentPrompts.scanInstructions}`
    );
  } else {
    promptParts.push(`Can you give me the lyrics to the song "${songData.title}"?`);
  }

  if (songData.language != 'English') {
    promptParts.push(`And of course your new lyrics should be in ${songData.language}.\n${poetAgentPrompts.scanInstructions}`);
  }

  return promptParts.join("\n");
}

/* Extract what Claude has told us. Look for the notes JSON and for the time signature data.
 */
function extractLyricsData(msg) {
  let lyricsArray, topic;

  let match = msg.match(/<lyrics>\s*([\s\S]*?)\s*<\/lyrics>/i);
  if (match) {
    const lyricsText = match[1];
    lyricsArray = lyricsText.split("\n");
  } else {
    return false; //TODO: we need to handle these false cases above
  }

  match = msg.match(/<topic>\s*([\s\S]*?)\s*<\/topic>/i);
  if (match) {
    topic = match[1];
  } else {
    return false; //TODO: we need to handle these false cases above
  }

  return { lyrics: lyricsArray, topic: topic };
}

/* For two objects which have the same properties, accumulate a set of properties whose values are different.
*/
function findChangedProps(obj1, obj2) {
  const changes = new Set();

  for (const key in obj1) {
    if (obj1[key] != obj2[key]) {
      changes.add(key);
    }
  }

  return changes;
}

function setsIntersect(s1, s2) {
  for (const value of s1) {
    if (s2.has(value)) {
        return true;
    }
  }

  return false;
}

// Express route handler
export default async function generateSongHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { songData, originalSongData } = req.body || {};
    if (!songData || !originalSongData) {
      return res.status(400).json({ error: 'songData and originalSongData are required' });
    }

    const result = await generateSong(songData, originalSongData);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}


