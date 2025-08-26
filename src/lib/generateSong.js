/* This is a client-side wrapper that calls our backend API,
 * whose logic lives in server/routes/generateSong.js.
 * Go there to see where the magic happens.
 */
async function generateSong(songData, originalSongData) {
  const resp = await fetch('/api/generate-song', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ songData, originalSongData })
  });
  
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error || `Request failed with status ${resp.status}`);
  }
  
  const data = await resp.json();
  return data;
}

export default generateSong;