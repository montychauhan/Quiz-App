const questions = [
    {
        question: "What is the capital of France?",
        options: {
            A: "London",
            B: "Berlin",
            C: "Paris",
            D: "Madrid"
        },
        correct: "C"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: {
            A: "Venus",
            B: "Mars",
            C: "Jupiter",
            D: "Saturn"
        },
        correct: "B"
    },
    {
        question: "What is 2 + 2 × 3?",
        options: {
            A: "8",
            B: "12",
            C: "6",
            D: "10"
        },
        correct: "A"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: {
            A: "Charles Dickens",
            B: "William Shakespeare",
            C: "Jane Austen",
            D: "Mark Twain"
        },
        correct: "B"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: {
            A: "Atlantic Ocean",
            B: "Indian Ocean",
            C: "Arctic Ocean",
            D: "Pacific Ocean"
        },
        correct: "D"
    },
    {
        question: "Which programming language is known as the 'mother of all languages'?",
        options: {
            A: "C",
            B: "Python",
            C: "Java",
            D: "Assembly"
        },
        correct: "A"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: {
            A: "Go",
            B: "Gd",
            C: "Au",
            D: "Ag"
        },
        correct: "C"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: {
            A: "China",
            B: "Thailand",
            C: "Japan",
            D: "South Korea"
        },
        correct: "C"
    },
    {
        question: "What is the square root of 144?",
        options: {
            A: "10",
            B: "12",
            C: "14",
            D: "16"
        },
        correct: "B"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: {
            A: "Oxygen",
            B: "Nitrogen",
            C: "Carbon Dioxide",
            D: "Hydrogen"
        },
        correct: "C"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const questionElement = document.getElementById('question');
const optionButtons = document.querySelectorAll('.option-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const percentageElement = document.getElementById('percentage');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    optionButtons.forEach((button, index) => {
        const optionKey = String.fromCharCode(65 + index); // A, B, C, D
        button.textContent = currentQuestion.options[optionKey];
        button.classList.remove('selected', 'correct', 'incorrect');
        button.disabled = false;
    });
    
    selectedAnswer = null;
    nextButton.disabled = true;
}

function selectAnswer(option) {
    if (selectedAnswer) return;
    
    selectedAnswer = option;
    const currentQuestion = questions[currentQuestionIndex];
    
    optionButtons.forEach(button => {
        button.classList.remove('selected');
        if (button.dataset.option === option) {
            button.classList.add('selected');
        }
    });
    
    // Show correct/incorrect immediately
    setTimeout(() => {
        showAnswer();
    }, 500);
}

function showAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    
    optionButtons.forEach(button => {
        const option = button.dataset.option;
        if (option === currentQuestion.correct) {
            button.classList.add('correct');
        } else if (option === selectedAnswer) {
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });
    
    if (selectedAnswer === currentQuestion.correct) {
        score++;
    }
    
    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    
    const percentage = Math.round((score / questions.length) * 100);
    scoreElement.textContent = `Your Score: ${score} out of ${questions.length}`;
    percentageElement.textContent = `Percentage: ${percentage}%`;
    
    restartButton.style.display = 'inline-block';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    
    restartButton.style.display = 'none';
    loadQuestion();
}

// Event listeners
optionButtons.forEach(button => {
    button.addEventListener('click', () => selectAnswer(button.dataset.option));
});

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

// Initialize quiz
loadQuestion();