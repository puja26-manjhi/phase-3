
// Quiz Questions
const quizData = [
    {
        question: "What does HTML stand for?",
        answers: ["Hyper Text Markup Language", "High Text Machine Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"],
        correct: 0
    },
    {
        question: "Which language is used for styling a webpage?",
        answers: ["HTML", "CSS", "JavaScript", "Python"],
        correct: 1
    },
    {
        question: "Which keyword is used to declare a variable?",
        answers: ["print", "style", "let", "write"],
        correct: 2
    },
    {
        question: "Which method selects an element by ID?",
        answers: ["querySelectorAll()", "getElementById()", "createElement()", "append()"],
        correct: 1
    },
    {
        question: "Which method is used to add an event?",
        answers: ["addEventListener()", "appendChild()", "innerHTML", "textContent"],
        correct: 0
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: ["##", "//", "<!-- -->", "**"],
        correct: 1
    },
    {
        question: "Which method adds an element at the end of an array?",
        answers: ["pop()", "shift()", "push()", "slice()"],
        correct: 2
    },
    {
        question: "Which keyword is used to create a function?",
        answers: ["function", "loop", "return", "const"],
        correct: 0
    },
    {
        question: "What does DOM stand for?",
        answers: ["Data Object Model", "Document Object Model", "Digital Output Method", "Document Order Method"],
        correct: 1
    },
    {
        question: "Which method converts JSON text into a JavaScript object?",
        answers: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.object()"],
        correct: 1
    }
];

// DOM Selection
const questionElement = document.querySelector("#question");
const answers = document.querySelector("#answers");
const nextBtn = document.querySelector("#nextBtn");
const progress = document.querySelector(".progress");

// Variables
let currentQuestionIndex = 0;
let selectedAnswerIndex = null;
let score = 0;
let answerChecked = false;

// Load Question
function loadQuestion() {

    const currentQuestion = quizData[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    answers.innerHTML = "";

    selectedAnswerIndex = null;
    answerChecked = false;

    nextBtn.style.display = "block";
    nextBtn.textContent = "Next Question";
    nextBtn.disabled = true;

    progress.textContent =
        `${currentQuestionIndex + 1}/${quizData.length}`;

    currentQuestion.answers.forEach((answer, index) => {

        const answerBtn = document.createElement("button");

        answerBtn.className = "answer-btn";
        answerBtn.textContent = answer;

        answerBtn.addEventListener("click", () => {
            selectAnswer(answerBtn, index);
        });

        answers.append(answerBtn);
    });
}

// Select Answer
function selectAnswer(clickedAnswer, index) {

    if (answerChecked) return;

    selectedAnswerIndex = index;

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((button) => {
        button.classList.remove("selected");
    });

    clickedAnswer.classList.add("selected");

    nextBtn.disabled = false;
}

// Check Answer
function checkAnswer() {

    const currentQuestion = quizData[currentQuestionIndex];

    const buttons = document.querySelectorAll(".answer-btn");

    if (selectedAnswerIndex === currentQuestion.correct) {

        buttons[selectedAnswerIndex].classList.add("correct");
        score++;

    } else {
        buttons[selectedAnswerIndex].classList.add("wrong");

        buttons[currentQuestion.correct].classList.add("correct");
    }

    buttons.forEach((button) => {
        button.disabled = true;
    });

    answerChecked = true;

    nextBtn.textContent = "Next Question →";
}

// Next Question
function nextQuestion() {

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {

        loadQuestion();
    } else {
       showResult();
    }
}
// Show Result
function showResult() {

    questionElement.textContent = " Quiz Completed!";

    answers.innerHTML = `
        <h3>Your Score: ${score}/${quizData.length}</h3>
        <p>Great job! Keep learning.</p>
    `;
    progress.textContent = "Completed";

    nextBtn.style.display = "none";
}
// Button Event
nextBtn.addEventListener("click", () => {

    if (selectedAnswerIndex === null) return;

    if (!answerChecked) {

        checkAnswer();

    } else {

        nextQuestion();
    }
});

// Start Quiz
loadQuestion();
