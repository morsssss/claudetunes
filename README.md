# ClaudeTunes

## About

A fun demo that shows off a few of Claude's abilites:
* It knows the lyrics and music to common songs
* It knows some standard ways of representing pitches and durations
* It can perform simple melodic transformations
* It can write new lyrics to an existing tune on a new topic with similar or precisely the same scanning
* It can write rhyming lyrics in many languages

It also demonstrates good prompting practices and correct use of the system prompt,
showing that specialized agents often perform better than multi-purpose.

(I'd hoped to show off other capabilities like cache control, augmenting Claude with existing and synthetic tools,
and the Files API, but this would have required more time.)

Most of the files in this project make the web app work.
To see how we build quick agents that specialize in music and in lyrics,
how we prompt them, and how we extract data and send it back to the web app,
check out `server/routes/generateSong.js`.

## Features

- **Song Selection**: Choose from 5 classic songs including "Jingle Bells", "Mary Had a Little Lamb", and more
- **Pitch Customization**: 
  - Mode selection (Major/Minor)
  - Time signature (3/4 or 4/4)
  - Inversion options (Normal/Inverted)
- **Words Customization**:
  - Language selection (English, French, Spanish, German, Japanese)
  - Topic input for custom lyrics
- **Song Preview**: View generated pitches and lyrics in real-time
- **AI Integration**: Uses Claude AI to generate customized songs
- **Audio Playback**: Play generated songs using Tone.js

## Getting Started
### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Getting your Anthropic API key

1. Visit [console.anthropic.com](https://console.anthropic.com/dashboard)
2. Sign up or log in to your account
3. Click on "Get API keys"
4. Copy the key

### Using your Anthropic API key in this project
Method 1. Create a `.env.local` file in the root directory with the following:
```
ANTHROPIC_API_KEY={your Anthropic API key}
```

Method 2. Include your Anthropic key in your shell resource file. For example, if you're using zsh, include this line in `~./zshrc`:
```
ANTHROPIC_API_KEY={your Anthropic API key}
```

Of course, in either of those cases, use your actual API key, not "{your Anthropic API key}"!

### Installation

1. Clone this repository.
1. Install dependencies: `npm install`
1. Ensure your Anthropic API key is ready as described above.
1. Start the development server: `npm run dev:all`
4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Select a song**: Choose among the songs in the dropdown.
1. **Customize the words and music**: Feel free to customize your chosen song with the options under "Customize your song".
1. **Generate**: When you're ready, click "Generate Song" to ask Claude to create a song to your specifications.
1. **Behind the magic**: You can see the prompts we send Claude, and its responses, in the "Conversation with Claude" box.
1. **See the notes**: When song generation is done, the new notes and lyrics will appear in the "Song preview" area.
1. **Hear the song**: Click "Play Song" at any point to play back the melody.

Feel free to change the songs in the dropdown as well.
Just know that you should choose songs that are in the public domain,
because Claude is wary of providing or modifying anything that might be copyrighted.
