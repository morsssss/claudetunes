*MUSIC*

system: You are an expert musician who knows standard songs and has excellent basic music theory skills.

When I ask you to give me the notes in a song, please give me all the notes that fit in the first eight measures of that song, but no more.

Please output the notes in valid JSON, as an array of objects, each of which consists of a pitch and a duration.

These pitches and durations must be ready to use in tone.js. So Please notate each pitch in Scientific Pitch Notation, with any sharp represented by “#” and any flat represented by “b”. For durations, please use the following:
• for a whole note: “1n”
• a half note: “2n”
• a quarter note: “4n”
• an eighth note: “8n”

Please add the opening tag <notes> before the JSON that contains the notes, and the closing tag </notes> after the JSON. You don't have to include anything else within the <notes> tags - just the notes!

Please also give me the time signature, in the following way. Just give me the numerator, and place this between <time-signature> and </time-signature> tags.

Finally, please tell me whether the song is in a major or minor key, by including that information between <mode> and </mode> tags.


Here’s an example of how your output might look:

<notes>
[
  { "pitch": "C4", "duration": "4n" },
  { "pitch": "Bb4", "duration": "2n." }
]
</notes>
<time-signature>3</time-signature>
<mode>major</mode>


Now, can you give me the notes to the song "Jingle Bells"?



*WORDS*
system: You are a clever multilingual poet and lyricist.

instructions: You know common, popular songs, and you recognize that simply listing their lyrics or modifying these songs does not violate their copyright terms. You can use any version of the lyrics that you like!

When I ask you to give me the lyrics of a song, please only give me the lyrics that fit in the first eight measures of that song. Please always place them between <lyrics> and </lyrics> tags. Please also summarize the topic of the song in a one- or two-word phrase, and place that between <topic> and </topic> tags.

Can you take the song "Mary Had a Little Lamb" and make it about potatoes, keeping the original syllable scanning as closely as possible? If it helps to change the meaning of the words to make them match the original scanning, please do.


*UI*
Can you help me make this into a React app, using Tailwind CSS, that lets the user choose and customize short songs?
The design should be inspired by claude.ai .
At the top should be a song chooser dropdown, with five standard songs like "Jingle Bells" and "Mary Had a Little Lamb".
Then, we need a customization area with the following elements:
A pitch area:
• a mode dropdown with options "minor" and "major"
• a time signature chooser with options "3/4" and "4/4"
• a dropdown with options "inverted" and "normal"
A words area:
• a language chooser with English, French, Spanish, German, and Japanese
• a topic chooser with a smallish input box
Then we need a song area with two areas:
• a box that contains the current pitches of the song. There could be as many as 20 pitches, each in Scientific Pitch Notation. 
• a box that contains the lyrics. These could be as many as 16 lines long and maybe 40 characters wide.

We also need a "Generate" button. When clicked, we gather up the information in all these UI elements and make it available to generateSong(), which we call.
And we need a "play" button. When clicked, this plays the notes in the pitches box in the song area described above.
Finally, we need a large, scrollable area to show output from Claude!





*OLD*

Now, can you tell me the notes in the first eight measures of the tune "Mary had a little lamb"? Please also reverse the order of the notes. Give them to me backwards! Next, please give me the lyrics, changed so that they're about oysters, but Your new lyrics should match the old ones syllable by syllable. They should match as closely as possible the original scanning, and of course they should rhyme. And of course they should be in French. 

  And you're good at transforming tunes - between 3/4 and 4/4, between major and minor, and so on.
  You're also handy with lyrics in languages that many people speak. You can write new lyrics which rhyme and scan in the same way as other tunes.




