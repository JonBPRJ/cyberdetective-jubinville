const quiz = [
  {
    question: "Un courriel avec une pièce jointe suspecte est reçu. Que faire ?",
    answers: ["Ouvrir", "Ignorer", "Vérifier l'expéditeur", "Transférer à un collègue"],
    correct: 2
  },
  {
    question: "Quel est un bon mot de passe ?",
    answers: ["123456", "Bienvenue1", "L#k8Tz!9vF@2", "plomberie"],
    correct: 2
  }
];

let teamId = null;
let currentQuestion = 0;

function startQuiz(id) {
  teamId = id;
  document.querySelector(".teams").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const q = quiz[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const answers = document.getElementById("answers");
  answers.innerHTML = "";
  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(i === q.correct);
    answers.appendChild(btn);
  });
}

function checkAnswer(isCorrect) {
  fetch('/api/answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamId, isCorrect })
  }).then(() => {
    currentQuestion++;
    if (currentQuestion < quiz.length) {
      loadQuestion();
    } else {
      document.getElementById("quiz").innerHTML = "<h2>Merci d'avoir joué !</h2>";
    }
  });
}
