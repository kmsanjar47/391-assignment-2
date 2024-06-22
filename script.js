function showSection(sectionId) {
  const sections = document.querySelectorAll("main > section");
  sections.forEach((section) => {
    section.classList.add("hidden");
  });
  document.getElementById(`${sectionId}-section`).classList.remove("hidden");

  if (sectionId === "fortune") {
    generateFortune();
  } else if (sectionId === "quiz") {
    generateQuiz();
  }
}

// Fortune Generator
function generateFortune() {
  const fortunes = [
    "True wisdom comes not from knowledge, but from understanding.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "An unexamined life is not worth living.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
  ];

  const fortuneBox = document.getElementById("fortune-box");
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  fortuneBox.textContent = randomFortune;
}

// Currency Converter
const exchangeRates = {
  usd: { usd: 1, gbp: 0.49246, cad: 0.98054, eur: 0.70641, aud: 1.13262 },
  gbp: { usd: 2.03032, gbp: 1, cad: 2.0, eur: 1.43448, aud: 2.29964 },
  cad: { usd: 1.01941, gbp: 0.50221, cad: 1, eur: 0.72037, aud: 1.15498 },
  eur: { usd: 1.41544, gbp: 0.69714, cad: 1.38814, eur: 1, aud: 1.60329 },
  aud: { usd: 0.88297, gbp: 0.43497, cad: 0.86613, eur: 0.62382, aud: 1 },
};

function convertCurrency(changedCurrency) {
  const value = parseFloat(document.getElementById(changedCurrency).value) || 0;
  for (const currency in exchangeRates[changedCurrency]) {
    if (currency !== changedCurrency) {
      document.getElementById(currency).value = (
        value * exchangeRates[changedCurrency][currency]
      ).toFixed(2);
    }
  }
}

// Quiz
const questions = [
  {
    question: "What is the capital of Missouri?",
    choices: ["A) Kansas City", "B) Jefferson City", "C) St. Louis"],
    correct: "B",
  },
  {
    question: "How many ounces in a pound?",
    choices: ["A) 10", "B) 12", "C) 16"],
    correct: "C",
  },
  {
    question: "Who was the first person to set foot on the moon?",
    choices: ["A) Buzz Aldrin", "B) Yuri Gagarin", "C) Neil Armstrong"],
    correct: "C",
  },
  {
    question:
      "Who holds the Major League Baseball record for most home runs in a season?",
    choices: ["A) Barry Bonds", "B) Hank Aaron", "C) Babe Ruth"],
    correct: "A",
  },
  {
    question: "In what year was University of Liverpool founded?",
    choices: ["A) 1250", "B) 1881", "C) 1901"],
    correct: "B",
  },
  {
    question: "Who painted the Mona Lisa?",
    choices: [
      "A) Vincent van Gogh",
      "B) Leonardo da Vinci",
      "C) Pablo Picasso",
    ],
    correct: "B",
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["A) Venus", "B) Jupiter", "C) Saturn"],
    correct: "B",
  },
  {
    question: "What year did the Titanic sink?",
    choices: ["A) 1912", "B) 1923", "C) 1935"],
    correct: "A",
  },
  {
    question: "What is the tallest mountain in the world?",
    choices: ["A) Mount Everest", "B) K2", "C) Mount Kilimanjaro"],
    correct: "A",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["A) Venus", "B) Mars", "C) Mercury"],
    correct: "B",
  },
];

function generateQuiz() {
  const quizForm = document.getElementById("quiz-form");
  const numQuestions =
    parseInt(prompt("Enter number of questions (default: 5)", "5")) || 5;
  const selectedQuestions = [];

  // Select random questions
  for (let i = 0; i < numQuestions; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questions.length);
    } while (selectedQuestions.includes(questions[randomIndex]));
    selectedQuestions.push(questions[randomIndex]);
  }

  selectedQuestions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <label><input type="radio" name="question${index}" value="A"> ${
      q.choices[0]
    }</label><br>
            <label><input type="radio" name="question${index}" value="B"> ${
      q.choices[1]
    }</label><br>
            <label><input type="radio" name="question${index}" value="C"> ${
      q.choices[2]
    }</label><br>
        `;
    quizForm.appendChild(questionDiv);
  });

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit Quiz";
  submitButton.onclick = (e) => {
    e.preventDefault();
    let correctAnswers = 0;
    selectedQuestions.forEach((q, index) => {
      const userAnswer = quizForm[`question${index}`].value;
      const resultDiv = document.createElement("div");
      resultDiv.classList.add("result");
      resultDiv.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                <p>You guessed ${userAnswer ? userAnswer + ")" : ""} ${
        userAnswer ? q.choices[userAnswer.charCodeAt(0) - 65] : "No Answer"
      }</p>
                <p>${
                  userAnswer === q.correct
                    ? "CORRECT"
                    : "INCORRECT: the correct answer is " +
                      q.correct +
                      ")" +
                      q.choices[q.correct.charCodeAt(0) - 65]
                }</p>
            `;
      if (userAnswer && userAnswer === q.correct) correctAnswers++;
      quizForm.appendChild(resultDiv);
    });

    const result = document.getElementById("result");
    result.innerHTML = `
            <p>You answered ${correctAnswers} out of ${numQuestions} questions correctly (${(
      (correctAnswers / numQuestions) *
      100
    ).toFixed(2)}%).</p>
        `;
  };
  quizForm.appendChild(submitButton);
}

// Initial setup
function initialize() {
  showSection("home"); // Show home section by default
  generateFortune(); // Generate initial fortune
}

// Event listener for page load
window.addEventListener("load", initialize);
