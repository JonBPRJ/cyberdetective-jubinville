const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

let scores = [0, 0, 0, 0]; // Scores pour 4 équipes

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoint pour enregistrer une réponse
app.post('/api/answer', (req, res) => {
  const { teamId, isCorrect } = req.body;
  if (typeof teamId === 'number' && isCorrect === true && teamId >= 0 && teamId < scores.length) {
    scores[teamId]++;
  }
  res.sendStatus(200);
});

// Endpoint pour récupérer les scores
app.get('/api/scores', (req, res) => {
  res.json(scores);
});

// Reset des scores (optionnel, pour tests)
app.post('/api/reset', (req, res) => {
  scores = [0, 0, 0, 0];
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`CyberDétective server running on port ${port}`);
});
