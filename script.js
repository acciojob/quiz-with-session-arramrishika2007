const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load saved progress
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Show saved score if available
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}

// Do not change code below this line
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

function renderQuestions() {
  questions.forEach((question, i) => {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(question.question));
    div.appendChild(document.createElement("br"));

    question.choices.forEach((choice) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      if (userAnswers[i] === choice) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      div.appendChild(input);
      div.appendChild(document.createTextNode(choice));
      div.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(div);
  });
}

renderQuestions();

submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", String(score));
});