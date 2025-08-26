import React from 'react'

// Feel free to add more songs here.
// Just know that Claude doesn't like giving out lyrics to songs that might be under copyright.
const songs = [
  'Jingle Bells',
  'Baa, Baa, Black Sheep',
  'Frere Jacques',
  'Mary Had a Little Lamb',
  'This Old Man',
  'Twinkle, Twinkle, Little Star'
];

const SongChooser = ({ title, onSongChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">Choose your song</h2>
      <div className="max-w-sm">
        <select
          value={title}
          onChange={(e) => onSongChange(e.target.value)}
          className="w-80 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium text-base transition-all duration-200 hover:border-gray-300"
        >
          {songs.map((song) => (
            <option key={song} value={song}>
              {song}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SongChooser
