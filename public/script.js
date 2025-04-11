
const teams = ["Équipe 1 🔴", "Équipe 2 🟢", "Équipe 3 🔵", "Équipe 4 🟡"];
let teamScores = [0, 0, 0, 0];
let currentTeam = 0;
let currentQuestion = 0;
const totalQuestions = 10;

const quiz = [
  {
    question: "Vous recevez un courriel d’un partenaire commercial avec une facture en pièce jointe (.zip). Le message semble pressant. Quelle est la meilleure approche ?",
    answers: [
      "Ouvrir le fichier car le partenaire est connu.",
      "Contacter le partenaire via un autre canal pour vérifier l'envoi.",
      "Transférer le courriel au service marketing.",
      "L’ouvrir uniquement si l’antivirus est actif."
    ],
    correct: 1
  },
  {
    question: "Quel mot de passe est le plus sécurisé pour un compte professionnel ?",
    answers: [
      "Jubinville2024",
      "Bienvenue01",
      "Z$8vL!3@jFq9?mXt",
      "M0tdep@ss3"
    ],
    correct: 2
  },
  {
    question: "Un site vous demande de désactiver temporairement votre antivirus pour télécharger un fichier. Quelle est la bonne réaction ?",
    answers: [
      "Je le désactive, puis le réactive ensuite.",
      "Je contacte le support informatique avant toute action.",
      "Je continue en mode navigation privée.",
      "Je le fais si c'est un site que j’ai déjà visité."
    ],
    correct: 1
  },
  {
    question: "Quel est un indicateur commun d’un site web frauduleux ?",
    answers: [
      "Il utilise HTTPS.",
      "Le logo de la compagnie est présent.",
      "L’URL contient des fautes ou des caractères spéciaux.",
      "Le site charge rapidement."
    ],
    correct: 2
  },
  {
    question: "Que signifie le terme 'ingénierie sociale' en cybersécurité ?",
    answers: [
      "Un type de logiciel antivirus.",
      "Une technique pour contourner les pare-feu.",
      "L’exploitation psychologique pour obtenir des données confidentielles.",
      "Une méthode de test de vitesse de connexion."
    ],
    correct: 2
  },
  {
    question: "Pourquoi faut-il utiliser un gestionnaire de mots de passe ?",
    answers: [
      "Pour ne pas avoir à en changer régulièrement.",
      "Pour créer et stocker des mots de passe complexes et uniques.",
      "Pour partager ses mots de passe avec ses collègues.",
      "Pour économiser du temps lors des connexions."
    ],
    correct: 1
  },
  {
    question: "Lorsqu’un collègue laisse son poste ouvert sans surveillance, que faire ?",
    answers: [
      "Envoyer une blague à toute l’équipe depuis son compte.",
      "Signaler la situation à la direction.",
      "Fermer ses applications.",
      "Verrouiller sa session ou l’informer à son retour."
    ],
    correct: 3
  },
  {
    question: "Pourquoi éviter de cliquer sur un lien dans un courriel inattendu, même s’il semble légitime ?",
    answers: [
      "Cela pourrait causer un ralentissement de l’ordinateur.",
      "Le lien pourrait contenir des fautes de grammaire.",
      "Le lien peut mener à un faux site qui vole vos données.",
      "Les liens dans les courriels sont toujours non sécurisés."
    ],
    correct: 2
  },
  {
    question: "Quelle est la bonne pratique pour partager un document confidentiel ?",
    answers: [
      "L’envoyer en pièce jointe par courriel.",
      "Le stocker sur un site public en lecture seule.",
      "Utiliser une plateforme sécurisée avec mot de passe.",
      "Le transférer via une clé USB à tous les membres."
    ],
    correct: 2
  },
  {
    question: "Que faire si vous pensez que votre poste a été compromis ?",
    answers: [
      "Redémarrer votre ordinateur.",
      "Prévenir immédiatement le service informatique.",
      "Supprimer les derniers fichiers téléchargés.",
      "Changer vos mots de passe sans en parler à personne."
    ],
    correct: 1
  }
];

function startQuiz(teamId) {
  document.getElementById("setup").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  currentTeam = teamId;
  currentQuestion = 0;
  loadQuestion();
}

function loadQuestion() {
  document.getElementById("nextBtn")?.remove(); // Nettoyage bouton précédent
  const q = quiz[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => checkAnswer(i, q.correct);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === correct) {
      btn.style.backgroundColor = "#28a745"; // Vert pour bonne réponse
    }
    if (index === selected && index !== correct) {
      btn.style.backgroundColor = "#dc3545"; // Rouge pour erreur
    }
  });
  if (selected === correct) {
    teamScores[currentTeam]++;
  }

  const nextBtn = document.createElement("button");
  nextBtn.id = "nextBtn";
  nextBtn.innerText = "Suivant";
  nextBtn.onclick = nextQuestion;
  nextBtn.style.marginTop = "20px";
  document.getElementById("quiz").appendChild(nextBtn);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= quiz.length) {
    showResults();
  } else {
    loadQuestion();
  }
}

function showResults() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("scoreboard").style.display = "block";
  const list = document.getElementById("finalScores");
  list.innerHTML = "";
  teams.forEach((team, i) => {
    const li = document.createElement("li");
    li.innerText = `${team} : ${teamScores[i]} point(s)`;
    list.appendChild(li);
  });
  const maxScore = Math.max(...teamScores);
  const winners = teams.filter((_, i) => teamScores[i] === maxScore);
  document.getElementById("winner").innerText = winners.length > 1
    ? `🏆 Égalité entre : ${winners.join(" & ")} !`
    : `🏆 Gagnant : ${winners[0]} 🎉`;
}
