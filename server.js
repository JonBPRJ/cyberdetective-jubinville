const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

let scores = [0, 0, 0, 0]; // 4 équipes

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoint pour enregistrer une réponse
app.post('/api/answer', (req, res) => {
  const { teamId, isCorrect } = req.body;
  if (typeof teamId === 'number' && teamId >= 0 && teamId < 4 && isCorrect === true) {
    scores[teamId]++;
  }
  res.sendStatus(200);
});

// Endpoint pour voir les scores
app.get('/api/scores', (req, res) => {
  res.json(scores);
});

app.listen(port, () => {
  console.log(`CyberDetective server listening on port ${port}`);
});
