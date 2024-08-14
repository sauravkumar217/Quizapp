const questions = [
    {
        question : "Who is the father of computers?",
        answers:[
            {text: "james gosling", correct: false},
            {text: "charles babbage", correct: true},
            {text: "Dennis Ritchie", correct: false},
            {text: "Bjarne Stroustup", correct: false},

        ]
    },

    {
        question : "What is the full form of CPU?",
        answers:[
            {text: "Computer Proceesing Unit", correct: false},
            {text: "Computer Principle Unit", correct: false},
            {text: "Central Proceesing Unit", correct: true},
            {text: "Control Proceesing Unit", correct: false},

        ]
    },

    {
        question : "Which of the following is the smallest unit of data in a computer",
        answers:[
            {text: "Bit", correct: true},
            {text: "KB", correct: false},
            {text: "Nibble", correct: false},
            {text: "Byte", correct: false},

        ]
    },

    {
        question : "Which of the following is not a type of computer code?",
        answers:[
            {text: "EDIC", correct: true},
            {text: "ASII", correct: false},
            {text: "BCD", correct: false},
            {text: "EBCDIC", correct: false},

        ]
    },

    {
        question : "Which of the following are physical devices?",
        answers:[
            {text: "Hardware", correct: true},
            {text: "Software", correct: false},
            {text: "System Software", correct: false},
            {text: "Package", correct: false},

        ]
    },

    {
        question : "Which of the following can access the server?",
        answers:[
            {text: "Web client", correct: true},
            {text: "User", correct: false},
            {text: "Web Browser", correct: false},
            {text: "Web Server", correct: false},

        ]
    }

];

const questionElement= document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHtml="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + ". "+ currentQuestion.
    question;

    currentQuestion.answers.forEach(answer =>{
        const button=  document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn =e.target;
    const iscorrect= selectedBtn.dataset.correct==="true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();