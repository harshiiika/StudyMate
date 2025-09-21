document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".quiz-container").style.display = "none";
    document.getElementById("start-btn").addEventListener("click", () => {
        document.getElementById("start-screen").style.display = "none";
        document.querySelector(".quiz-container").style.display = "block";
        initializeQuiz("APT"); // Default subject APT
    });
});

const allQuestions =  {
    apt:[
    {
        question: "What comes next in the series? <br> 2, 6, 12, 20, 30, ?",
        options: ["36", "40", "42", "56"],
        correctAnswer: 2
    },
    {
        question: "Pointing to a photograph, a man says, “I have no siblings, but the father of the man in the photo is my father's son.” Who is the man in the photo?",
        options: ["His son", "His nephew", "Himself", "His cousin"],
        correctAnswer: 0 
    },
    {
        question: "A man walks 5 km North, then turns right and walks 3 km, then again turns right and walks 5 km. In which direction is he from the starting point?",
        options: ["North", "South", "East", "West"],
        correctAnswer: 1 
    },
    {
        question: "If in a code, COLD is written as DPME, how is HEAT written?",
        options: ["IFBU", "IDBV", "IDBU", "JGBV"],
        correctAnswer: 0
    },
    {
        question: "Five people A, B, C, D, and E are sitting in a row. A is to the right of B and to the left of C. E is at the extreme right. Who is in the middle?",
        options: ["A", "B", "C", "D"],
        correctAnswer: 2
    },

    {
        question: "What will be the output of the following code snippet in C++? <br> int a = 5; <br> int b = 2; <br> float result = a / b; <br> cout << result;",
        options: ["2", "2.5", "3", "3.0"],
        correctAnswer: 0
    },

    {
        question: "What day of the week was 1st January 2020?",
        options: [ "Wednesday" ,"Thursday","Tuesday","Friday"],  
        correctAnswer: 0
    },

    {
        question: "At what time between 3 and 4 o’clock will the hands of the clock be at right angles?",
       options: ["3:15", "3:21.8", "3:22.5", "3:18"], 
        correctAnswer: 2
    },

    {
        question: "If 3 cats can catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 50 minutes?",
        options: ["6", "9", "12", "15"],        
        correctAnswer: 0
    },

    {
        question: "A train leaves a station and travels at a speed of 60 km/hfor 2 hours. How far has it traveled?",
        options: ["120 km", "150 km", "180 km", "240 km"],
        correctAnswer: 0
    }
],
    dsa:[],
    php:[],
    daa:[],
    ai:[],
    dip:[],
    java:[],
    maths:[]

};

const allExplanations ={
    apt: [
    "The differences are 4, 6, 8, 10, so next difference is 12 → 30 + 12 = 42.",
    "His father's son (himself) is the father of the man → The man is his son.",
    "He ends up going South (back to the starting point line), 3 km away.",
    "Each letter is shifted by +1 alphabetically: H→I, E→F, A→B, T→U → IFBU.",
    "Arrangement: B A C D E → C is in the middle.",
    "Integer division (5/2 = 2), assigned to float → prints 2.0.",
    "1st Jan 2020 was a Wednesday.",
    "At 3:22.5, the angle between the hands is 90°.",
    "3 cats → 3 mice in 3 mins → 1 cat = 1 mouse in 3 mins → To catch 100 in 50 mins, we need 6 cats.",
    "60 km/h × 2 hours = 120 km."
]};

const subjectBackgrounds = {
    "dsa": "url('planets/dsa.png')",
    "php": "url('planets/php.png')",
    "daa": "url('planets/daa.png')",
    "apt": "url('planets/apt.png')", // cd renamed to apt
    "ai": "url('planets/ai.png')" ,
    "dip": "url('planets/dip.png')",
    "java": "url('planets/java.png')",
    "maths": "url('planets/mats.png')"
};



const urlParams = new URLSearchParams(window.location.search);
let subject = urlParams.get("subject") || "dsa";
let timer;
let timeLeft = 20;
let questions = [];
let explanations = [];


function startTimer() {
   timeLeft = 20; // Reset timer to 20 seconds
   document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            goToNextQuestion();
        }
    }, 1000);
}   

let currentQuestion = 0;
let score = 0;
let answers = Array(questions.length).fill(null);
let shuffledOptionsList = [];

const questionElement = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const currentQuestionElement = document.getElementById("current-question");
const totalQuestionsElement = document.getElementById("total-questions");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const quizContent = document.getElementById("quiz-content");
const restartButton = document.getElementById("restart-btn");

function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}


function initializeQuiz(subjectName = "APT") {
questions = allQuestions[subjectName.toLowerCase()] || [];
explanations = allExplanations[subjectName.toLowerCase()] || [];

if (!questions.length) {
    questionElement.innerText = "No questions found for this subject.";
    return;
}

    totalQuestionsElement.textContent = questions.length;

    setQuizBackground(subject);

    // Prepare shuffled options for each question
    shuffledOptionsList = questions.map((q) => {
        const shuffled = shuffleArray(q.options);
        return {
            options: shuffled,
            correctIndex: shuffled.indexOf(q.options[q.correctAnswer])
        };

    });

    loadQuestion();
    prevButton.addEventListener("click", goToPreviousQuestion);
    nextButton.addEventListener("click", goToNextQuestion);
    restartButton.addEventListener("click", restartQuiz);
}

function loadQuestion() {
    clearInterval(timer);  //Stop any existing timer
    startTimer();          // Start a fresh timer


   

    const currentquestions = questions[currentQuestion];
    const shuffledData = shuffledOptionsList[currentQuestion];

    currentQuestionElement.textContent = currentQuestion + 1;
    questionElement.innerHTML = currentquestions.question;
    optionsContainer.innerHTML = "";

    shuffledData.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        if (answers[currentQuestion] === index) {
            optionElement.classList.add("selected");
        }
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });

    updateButtonStates();

    document.getElementById("explanation").style.display = "none";

   document.querySelectorAll(".option").forEach(btn => {
    btn.style.backgroundColor = ""; // remove old color
    btn.disabled = false;
});

}



function selectOption(optionIndex) {
    clearInterval(timer);  // Stop the timer when an option is selected
    answers[currentQuestion] = optionIndex;

    const options = optionsContainer.querySelectorAll(".option");
    options.forEach((option, index) => {
        option.classList.toggle("selected", index === optionIndex);
    });

    nextButton.disabled = false;

            const explanationBox = document.getElementById("explanation");
        const isCorrect = optionIndex === shuffledOptionsList[currentQuestion].correctIndex;

        // Highlight options
        document.querySelectorAll(".option").forEach((btn, idx) => {
            if (idx === shuffledOptionsList[currentQuestion].correctIndex) {
                btn.style.backgroundColor = "#a5d6a7"; // green for correct
            } else if (idx === optionIndex) {
                btn.style.backgroundColor = "#ef9a9a"; // red for wrong
            }
            btn.disabled = true; // Disable all buttons
        });

        // Show explanation always
        explanationBox.innerText = `Explanation: ${explanations[currentQuestion]}`;
        explanationBox.style.display = "block";

}

function goToPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function goToNextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
}

function updateButtonStates() {
    prevButton.disabled = currentQuestion === 0;
    nextButton.textContent = currentQuestion === questions.length - 1 ? "Finish" : "Next";
    nextButton.disabled = answers[currentQuestion] === null;
}

function showResult() {
    clearInterval(timer);
    //hide the timer
    document.getElementById("timer").style.display = "none";

    score = 0;

    for (let i = 0; i < questions.length; i++) {
        if (answers[i] === shuffledOptionsList[i].correctIndex) {
            score++;
        }
    }

    scoreElement.textContent = `${score}/${questions.length}`;
    quizContent.style.display = "none";
    resultElement.style.display = "block";
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answers = Array(questions.length).fill(null);
    shuffledOptionsList = [];
    quizContent.style.display = "block";
    resultElement.style.display = "none";
    initializeQuiz();
}

//set background
function setQuizBackground(subject) {
   // se
}

//back
document.getElementById("back-btn").addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "block";
    document.querySelector(".quiz-container").style.display = "none";

    // Optional: Reset progress if needed
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz").innerHTML = "";
    document.getElementById("next-btn").style.display = "none";
});
