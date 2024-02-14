// This is where I set my Questions and their answers. Along with an image that was added from the system vs a url. 
//questions can easily be added here.

const questions = [
    { 
        question: "Given x = 5 ",
        options: ["x==8", "x!==5", "x > 8 ", "x < 8 "],
        answer: "x < 8 ",
        imageUrl: "https://b1694534.smushcdn.com/1694534/wp-content/uploads/2021/06/26.png?lossy=1&strip=1&webp=1"
    },
    {
        question: "A java script identifier cannot begin with an?",
        options: ["A letter (A-Z) or (a-z)", "A $ sign", "An underscore", "A number"],
        answer: "A number",
        imageUrl: "https://miro.medium.com/max/1400/1*uWtpzHYFKQpbCOyO_g-D0A.png"
    },
    {
        question: "what are variables?",
        options:["functions","Containers for storing data","Arrays","Statements"],
        answer: "Containers for storing data",
       imageUrl: "https://b1694534.smushcdn.com/1694534/wp-content/uploads/2021/06/variable.jpeg?lossy=1&strip=1&webp=1"
    },
    {
        question: "What is Javascript",
        options: ["A Programming Language", "an Object", "JAVA", "video player"],
        answer: "A Programming Language",
        imageUrl: "https://b1694534.smushcdn.com/1694534/wp-content/uploads/2021/06/3.5-3.jpeg?lossy=1&strip=1&webp=1"
    },
    {
        question: "What is considererd an Object in Javascript?",
        options: ["Everything", "boolean", "Array", "Number"],
        answer: "Everything",
        imageUrl: "https://b1694534.smushcdn.com/1694534/wp-content/uploads/2021/06/0_fQTD4DjK71YMUtIS.gif?lossy=1&strip=1&webp=1 "
    },
    {
        question: "what are events?",
        options:["Concerts, marathons , etc ","something the user or bowser does","string","Boolean"],
        answer: "something the user or bowser does",
        imageUrl: "https://miro.medium.com/v2/resize:fit:640/format:webp/0*Vi7dVWLLqDhCsEkW"
    },
    {
        question: "which is an example of a string",
        options: ["'string'", "(string)", "[string]", ">string<"],
        answer: "'string'",
        imageUrl: "https://b1694534.smushcdn.com/1694534/wp-content/uploads/2022/01/270302591_10159694410148805_7707378469808973446_n.jpeg?size=669x376&lossy=1&strip=1&webp=1" 
    },
    {
        question: "Which is is an example of an Array?",
        options: [`const cars = ["Saab", "Volvo", "BMW"]`, `const cars = ("Saab", "Volvo", "BMW")`, `const cars = "Saab", "Volvo", "BMW"`, `const cars = /"Saab", "Volvo", "BMW"/`],
        answer: `const cars = ["Saab", "Volvo", "BMW"]`,
        imageUrl: "https://b1694534.smushcdn.com/1694534/wp-content/uploads/2022/01/Screenshot-2021-12-29-at-17.48.17-768x733.png?lossy=1&strip=1&webp=1"
    },
    {
        question: "which is not a data typr?",
        options:["String","Event","Function","Number"],
        answer: "Event",
       imageUrl: "https://www.freecodecamp.org/news/content/images/2019/07/that-string-secretly-became-a-number.jpeg"
    },
    {
        question: "what is Javascript used in?",
        options:["Python","front-end","nack-end","All of the above"],
        answer: "All of the above",
       imageUrl: "https://programmerhumor.io/wp-content/uploads/2022/05/programmerhumor-io-java-memes-javascript-memes-e4c921adf2b6cb4-758x966.jpg"
       
    }
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
let timerSeconds = 10; // Timer duration in seconds
let timerInterval;
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const finalScoreText = document.getElementById('final-score');
const timerDisplay = document.getElementById('timer-display');
const scoreDisplay = document.getElementById('score');
const imageContainer = document.getElementById('image-container');
const resultContainer = document.getElementById('result-container');
const quizContainer = document.getElementById('quiz-container');

function showQuestion() {
    resetTimer();
    updateTimerDisplay(timerSeconds);
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    imageContainer.innerHTML = `<img src="${currentQuestion.imageUrl}" alt="Question Image" />`;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option));

        optionsContainer.appendChild(optionElement);
    });

    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
            timerSeconds--;
            updateTimerDisplay(timerSeconds);
        } else {
            clearInterval(timerInterval);
            currentQuestionIndex++;
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerSeconds = 10; // Reset timer duration
}

function updateTimerDisplay(seconds) {
    timerDisplay.textContent = seconds;
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
        scoreDisplay.textContent = score;
    }

    currentQuestionIndex++;
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionText.textContent = '';
    optionsContainer.innerHTML = '';
    nextButton.style.display = 'none';
    resultContainer.style.display = 'block';
    finalScoreText.textContent = score;
    saveScore();
}

function saveScore() {
    const initialsInput = document.getElementById('initials-input').value;
    if (initialsInput.trim() !== "") {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push({ initials: initialsInput, score: score });
        localStorage.setItem('highScores', JSON.stringify(highScores));
        displayHighScores();
    } else {
        alert("Please enter your initials.");
    }
}

function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = ''; // Clear previous high scores

    highScores.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.initials}: ${entry.score}`;
        highScoresList.appendChild(listItem);
    });
}

showQuestion();