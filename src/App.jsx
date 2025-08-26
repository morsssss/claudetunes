import React, { useState } from 'react';
import SongChooser from './components/SongChooser';
import CustomizationArea from './components/CustomizationArea';
import SongArea from './components/SongArea';
import ClaudeConversation from './components/ClaudeConversation';
import generateSong from './lib/generateSong';
import playSong from './lib/audioPlayer';
import defaultSongData from './lib/defaultSong';

let originalSongData = { ...defaultSongData };

function App() {
  let [songData, setSongData] = useState(defaultSongData);
  const [claudeConversation, setClaudeConversation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Instead of erasing the contents of the Conversation Area each time we want to put something there,
  // append new content to existing content.
  function addToConversation (text) {
    setClaudeConversation(prev => prev ? `${prev}\n\n${text}` : text);
  };

  function handleSongChange (song) {
    setSongData(prev => ({ ...prev, title: song }));
  }

  function handleCustomization (field, value) {
    setSongData(prev => ({ ...prev, [field]: value }));
  }

  async function handleGenerate() {
    setIsGenerating(true);
    addToConversation('🌞 Waking up Claude...');
    
    try {
      const { updatedSongData, prompt, response } = await generateSong(songData, originalSongData);
      
      addToConversation(`🙋‍♀️ We asked: ${prompt}\n\n🤖 Claude responded: ${response}`);
      
      // Update the song data with generated content
      setSongData(updatedSongData);
      originalSongData = updatedSongData;

    } catch (error) {
      addToConversation('Error generating song: ' + error.message);
      console.error('Generation error:', error);

    } finally {
      setIsGenerating(false);
    }
  }

  async function handlePlay() {
    if (songData.notes.length === 0) {
      addToConversation('No notes to play. Please generate a song first.');
      return;
    }
    
    try {
      await playSong(songData.notes);
      
    } catch (error) {
      addToConversation('Error playing song: ' + error.message);
      console.error('Playback error:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-semibold text-gray-900 mb-2 tracking-tight">ClaudeTunes</h1>
          <p className="text-2xl text-gray-600 font-normal">Customize your favorite songs with Claude!</p>
        </div>

        {/* Song Chooser */}
        <SongChooser 
          selectedSong={songData.title}
          onSongChange={handleSongChange}
        />

        {/* Customization Area */}
        <CustomizationArea 
          songData={songData}
          onCustomization={handleCustomization}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {/* Song Area */}
        <SongArea 
          notes={songData.notes}
          lyrics={songData.lyrics}
          onPlay={handlePlay}
        />

        {/* Claude Output */}
        <ClaudeConversation output={claudeConversation} />
      </div>
    </div>
  );
}

export default App;
