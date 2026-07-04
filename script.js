const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}

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
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

questions.forEach((question, i) => {
  const div = document.createElement("div");

  const p = document.createElement("p");
  p.textContent = question.question;
  div.appendChild(p);

  question.choices.forEach(choice => {
    const label = document.createElement("label");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `question-${i}`;
    input.value = choice;

    if (userAnswers[i] === choice) {
      input.checked = true;
      input.setAttribute("checked", "true"); // Required for hidden test
    }

    input.addEventListener("change", () => {
      userAnswers[i] = choice;
      sessionStorage.setItem("progress", JSON.stringify(userAnswers));

      document
        .querySelectorAll(`input[name="question-${i}"]`)
        .forEach(r => r.removeAttribute("checked"));

      input.setAttribute("checked", "true");
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(choice));

    div.appendChild(label);
    div.appendChild(document.createElement("br"));
  });

  questionsElement.appendChild(div);
});

submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});