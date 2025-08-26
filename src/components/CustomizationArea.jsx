import React from 'react'

/* The user can use this area to customize the song's mode, time signature, topic, or language.
 *
 */
const CustomizationArea = ({ songData, onCustomization: onCustomization, onGenerate, isGenerating }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">Customize your song</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pitch Area */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 tracking-tight">Music Settings</h3>
          
          <div className="space-y-3">
            {/* Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mode
              </label>
              <select
                value={songData.mode}
                onChange={(e) => onCustomization('mode', e.target.value)}
                className="w-48 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all duration-200 hover:border-gray-300"
              >
                <option value="major">Major</option>
                <option value="minor">Minor</option>
              </select>
            </div>

            {/* Time Signature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Signature
              </label>
              <select
                value={songData.timeSignature}
                onChange={(e) => onCustomization('timeSignature', e.target.value)}
                className="w-48 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all duration-200 hover:border-gray-300"
              >
                <option value="3">3/4</option>
                <option value="4">4/4</option>
              </select>
            </div>

            {/* Inversion */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inversion
              </label>
              <select
                value={songData.inversion}
                onChange={(e) => onCustomization('inversion', e.target.value)}
                className="w-48 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all duration-200 hover:border-gray-300"
              >
                <option value="normal">Normal</option>
                <option value="inverted">Inverted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Words Area */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 tracking-tight">Words Settings</h3>
          
          <div className="space-y-3">
            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={songData.language}
                onChange={(e) => onCustomization('language', e.target.value)}
                className="w-64 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all duration-200 hover:border-gray-300"
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
                <option value="German">German</option>
                <option value="Japanese">Japanese</option>
                <option value="Hindi">Hindi</option>
                <option value="Arabic">Arabic</option>
              </select>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic
              </label>
              <input
                type="text"
                value={songData.topic}
                onChange={(e) => onCustomization('topic', e.target.value)}
                placeholder="e.g., potatoes, space, love..."
                className="w-64 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all duration-200 hover:border-gray-300 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 ${
            isGenerating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-900 hover:bg-gray-800 active:bg-gray-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </div>
          ) : (
            'Generate Song'
          )}
        </button>
      </div>
    </div>
  )
}

export default CustomizationArea
