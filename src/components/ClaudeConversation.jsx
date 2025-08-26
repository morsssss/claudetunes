import React from 'react'

const ClaudeConversation = ({ output }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">Conversation with Claude</h2>
      
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-[200px] max-h-[320px] overflow-y-auto">
        {output ? (
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm font-medium">
            {output}
          </div>
        ) : (
          <p className="text-gray-500 italic text-sm">
            Claude's responses will appear here after you generate a song.
          </p>
        )}
      </div>
    </div>
  )
}

export default ClaudeConversation
