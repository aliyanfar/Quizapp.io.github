const startBtn = document.getElementById('start-btn');
const quizSection = document.getElementById('quiz-section');
const usernameInput = document.getElementById('username');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultSection = document.getElementById('result-section');
const resultElement = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let username = '';

const questions = [
    {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
        answer: 'Paris'
    },
    {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: '4'
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        answer: 'Mars'
    },
    {
        question: 'Intake the gas of living organism?',
        options: ['Oxygen', 'Hillium', 'carbo-hydrate', 'carbon-dioxide'],
        answer: 'Oxygen'
    }
];

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    username = usernameInput.value;
    if (!username) {
        alert('Please enter your name');
        return;
    }
    usernameInput.classList.add('hidden');
    startBtn.classList.add('hidden');
    quizSection.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option');
        button.addEventListener('click', selectOption);
        optionsElement.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add('hidden');
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
}

function selectOption(e) {
    const selectedOption = e.target.innerText;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    const buttons = optionsElement.querySelectorAll('.option');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.innerText === currentQuestion.answer) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
    });

    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    resultElement.innerText = `${username}, your score: ${score} out of ${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    usernameInput.value = '';
    usernameInput.classList.remove('hidden');
    startBtn.classList.remove('hidden');
    resultSection.classList.add('hidden');
}
