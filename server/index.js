import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import generateSongHandler from './routes/generateSong.js';

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

app.post('/api/generate-song', generateSongHandler);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${PORT}`);
});


