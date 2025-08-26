import React from 'react'
/* 
 * We store durations as multiples of a quarter note.
 * Here, we map some common durations to musical notation.
 * This works fine for the songs we're working with here,
 * but as Claude transforms music, it sometimes chooses other durations.
 * We could do better!
 */

const durationToSymbolsMap = {
 '4': '𝅝',
 '3': '𝅗𝅥.',
 '2': '𝅗𝅥',
 '1.5': '♩.',
 '1': '♩',
 '0.5': '♪'
};

const SongArea = ({ notes, lyrics, onPlay }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">Song preview</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Notes Box */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 tracking-tight">Notes</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-[160px] max-h-[240px] overflow-y-auto">
            {notes.length > 0 ? (
              <div className="space-y-2">
                {notes.map((note, index) => (
                  <div key={index} className="inline-block bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg mr-2 mb-2 font-mono text-sm font-medium">
                    <span>
                      {note.pitch}
                    </span>
                    <span className="ml-2 text-base text-violet-600">
                      {durationToSymbolsMap[note.duration.toString()]}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-sm">No notes generated yet. Click "Generate" to create your song!</p>
            )}
          </div>
        </div>

        {/* Lyrics Box */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 tracking-tight">Lyrics</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-[160px] max-h-[240px] overflow-y-auto">
            {lyrics.length > 0 ? (
              <div className="space-y-1">
                {lyrics.map((line, index) => (
                  <p key={index} className="text-gray-800 text-sm leading-relaxed font-medium">
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-sm">No lyrics generated yet. Click "Generate" to create your song!</p>
            )}
          </div>
        </div>
      </div>

      {/* Play Button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onPlay}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Play Song
          </div>
        </button>
      </div>
    </div>
  )
}

export default SongArea
