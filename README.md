# ClaudeTunes

## About

A fun demo that shows off Claude's cleverness and a few of its abilites:
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

# Project notes

## Technical approach and decisions
**Why a web app:** Making this as a Jupyter notebook would have been far easier, but the web format makes it easier to play with the features, and even though this is arguably a nongoal, I think it's nice that this is something you can show your friends who fear AI, which even kids can use.

**Why I used two agents:** I soon realized that, in order to truly access Claude's creativity, particularly in writing and translating lyrics, I needed to use the right system prompt. With two different system prompts and two different sets of instructions, Claude became much better at writing clever lyrics that rhymed and scanned well, and it performed somewhat better music transformations. I needed to access the right parts of the model!

**Why I tried cache control:** I was excited at the idea of not making Claude run through my long instructions again and again - to cache the model's state. Unfortunately I never got this to work. Claude itself thought I needed to send headers that would let me access a beta feature, but this didn't work. It simply rejected my `cache_control` parameter and my whole request. Looking back at your docs while writing this, I wonder if I needed to include the instructions to be cached among the `system` prompts, even though the docs urge me to keep the system prompt short. Hmm...

**Don't reprompt for the same information:** I had to change the system so that, if the user requested only lyrics changes, we only reprompted the lyrics agent. If the user requested only music chagnes, we only reprompted the music agent. Otherwise, sometimes the user would find that, for example, they asked for lyrics in French, but suddenly the music got shorter. LLMs are nondeterministic by design, and I did not use a `temperature` of 0.

**Our web app is stateless, and so is our agent:** Our web app stores all its state in the UI. We generate each request to Claude based on what's in the UI. Thus there's no need to store up our conversation with Claude and pass it along each time. (Although I am willing to be wrong here.)

**Web app choices:** I made what I thought were some quite interesting choices in the web app, but I know we're not as curious about those here.

## Why this demo?
My first idea was to build a quick agent that used an MCP to perform a task, like reading values from a PDF and placing them into a new spreadsheet, then contrasting that with the same task using Claude's Computer use tool. After trying out the Computer use demo, I figured this had two problems. First, a developer trying it out would need to install a docker container or something comparable to get the browser going, and I'd need to write a fair amount of code (or heavily adapt your demo), which would be a lot for developers to easily grasp. Second, all this would be too complex for this small project.

I then hit upon the idea of customizing music. I knew Claude was excellent at writing poetry and prose, that its output could be shockingly creative. A few tests revealed that it had a fairly reliable understanding of basic music theory, as long as I didn't go too deep. It didn't do well at reading or writing sheet music, but it could output pitches and durations in a variety of standard formats. From my experience doing Web DevRel at Google, I knew music experiments like those at https://musiclab.chromeexperiments.com were often popular, fun, and showed off little-known powerful web features and APIs. I figured music would be a fine addition to Anthropic's existing Claude quickstarts or cookbook!

### In defense of simplicity

My only concern was that this wouldn't show my ability to use advanced Claude features. I thought of a few ways to bring these in. On the other hand, I feel that fundamental demos are highly valuable for the development community. Developer Relations people are smart, often superdevelopers themselves, and aware of and excited about the latest of the latest. But most developers aren't in this category. Many feel left behind or left out. When I did Web DevRel at Google, sometimes people were surprised that I included examples that used the likes of jQuery and WordPress. And yet jQuery is still used on 70-80% percent of websites today, and 43% of websites use WordPress. The glamor may lie with showing off the shiniest and most complex features - but I feel that most developers are relieved when a teacher appears who says, I'm like you, and I'm not one of the world's greatest experts in the area I'm about to show off - but I was curious, I was able to dive deeply into this topic, and now I'll bring you along for the journey. You can do this too!

## Inspiring developers and showing them Claude's potential

Most people who are aware of modern tech know LLMs' ability to write creatively. But few have seen them create music. And it's pretty fun to watch Claude write lyrics on other topics or in other languages. Have you tried making "Jingle Bells" about Hanukkah? Have you seen kids make "Mary Had a Little Lamb" about horse poop? I have.

This demo should be accessible to developers who haven't tried LLM APIs. It's fun. It's not hard to write other prompts and include them as customizations. It should draw them in!

It also shows the importance of prompt optimization, of asking for data in specific formats. If I were going to make this into a tutorial, I'd show a brief version of my own journey here, from trying to prompt Claude to create both music and lyrics for a song, to realizing that if I built two specialized agents, I'd get much better lyrics and somewhat better music. And how I learned to nudge Claude to output lyrics and music in a format that was consistent and easy for me to parse, with fewer extraneous bits.

## How I used Claude to make this demo

How _didn't_ I use Claude? Here are some of the many ways in which it helped me:
* I started out by asking it the name of your browser use tool
* In Warp, using Claude 4 Sonnet, I asked it to tell me about your computer use demo and confirm what I thought I needed to do to use it - to install your docker container. It's just nice to have someone knowledgeable (and usually right) by your side when you do new things!
* I asked claude.ai and Claude Desktop so many things on the way. To confirm that I should specify that it use JSON and XML tags. To learn that the way of specifying pitches as a note plus a standard octave number, like "C4" or "Bb3", was called "Scientific Pitch Notation," and that a lowercase "b" did indeed indicate a flat. I asked it about Cursor and VSCode features. It gave me lists of commonly known songs in the public domain. It recommended tone.js to me when I'd planned to use the older midi.js, and it gave me (mostly) helpful examples of how to use it. And when I couldn't think of an efficient way to do a task with code, I asked it whether some clever JavaScript method existed that I hadn't thought of or had forgotten.
* I used [the Anthropic Workbench](https://console.anthropic.com/workbench) to try out many prompt possibilities and to hone my prompts.
* And I used Claude 4 via Cursor to create a web app shell to my specifications. Then I had to change almost everything extensively, but I was able to keep so much boilerplate, along with its fundamental design ideas. I am not a designer. And, of course, Cursor (with Claude 4) was able to add features like a basic server and router so that I could call the API server-side.

## If I had more time...
I could do so much more!

### I'd make this into a proper tutorial
Ideally we'd show how to create this more simply, bit by bit.

### I'd show off more Claude features
* Claude isn't consistent at transforming the music. It's a great use case for synthetic tools - particularly for letting it write code to perform well-defined, algorithmic transformations. Code execution tool!
* We could write  songs to files using the Files API
* It would be a lot more fun to stream Claude's thoughts as it goes
* I'd love to see how extended thinking would perform here
* I'd probably find a number of ways to use MCPs, since I'm a fan

### I could fix some bugs
* I tried to choose songs with only certain common note durations, but sometimes we still get a dotted eighth or a half tied to an eighth, especially when Claude gets to change the time signature. We don't display such things, yet.
* I'd fix some strange UI experiences. For example, the UI doesn't show what you've customized and what you haven't, even though we only pass elements the user has changed to the prompt generators.
* The UI has a number of design quirks, and it could be more compact.

### I'd add more error handling, ensure code was clear, refine comments
Enough said.

### I'd add more features
* There's so much more we could do to transform the music - things Claude can do! It can generate accompaniments. We could play tunes backwards. We could transpose them.
* The killer feature would be letting the web app sing the melodies. I didn't find an API for this, but perhaps a text-to-speech solution exists that lets you choose the pitch or prosody.
