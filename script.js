 const myQuiz = [
 
{
    // 1
 question: "What was the first film Tarantino directed?",
 choices: ["Inglorious Basterds", "Kill Bill: Volume 1", "Reservoir Dogs", "Pulp Fiction"],
 correct: "Reservoir Dogs",
 },
 {
    // 2
question: "Which director has Tarantino collaborated with the most?",
choices: ["Robert Rodriguez", "Martin Scorsese", "Oliver Stone", "Eli Roth"],
correct: "Robert Rodriguez",
 },
 {
    //3
question: "Who plays the character of 'The Bride' in Kill Bill?",
choices: ["Lucy Liu", "Uma Thurman", "Daryl Hannah", "Pam Grier"],
correct: "Uma Thurman",
 },
 {
    //4
question: "Which Tarantino film features Kurt Russell as 'Stuntman Mike'?",
choices: ["Once Upon a Time...in Hollywood", "The Hateful Eight", "Death Proof", "Planet Terror"],
correct: "Death Proof",
 },
 {
    //5
question: 'Which character says the famous line "You shoot me in a dream, you better wake up and apologize"?',
choices: ["Mr. White", "Jules Winnfield", "Daisy Domergue", "Hans Landa"],
correct: "Mr. White",
 },
 {
    //6
question: "What is the name of Tim Roth's character in The Hateful Eight?",
choices: ["Ted the Bellhop", "Mr. Orange", "Pumpkin", "Oswald Mobray"],
correct: "Oswald Mobray",
 },
 {
    //7
question: 'Which actor plays Django in "Django Unchained"?',
choices: ["Christoph Waltz", "Jamie Foxx", "Leonardo DiCaprio", "Samuel L. Jackson"],
correct: "Jamie Foxx",
 },
 {
    //8
question: "What is Jackie's occupation in the movie 'Jackie Brown'?",
choices: ["Hairdresser", "Flight Attendant", "Lawyer", "Bartender"],
correct: "Flight Attendant",
 },
 {
    //9
question: "What are the names of the main duo in Pulp Fiction?",
choices: ["Mia Wallace and Butch Coolidge", "Cliff Booth and Rick Dalton", "Vincent Vega and Jules Winnfield", "Mr. White and Mr. Pink"],
correct: "Vincent Vega and Jules Winnfield",
 },
 {
    //10
question: "Both Leonardo DiCaprio and Brad Pitt appeared in which Tarantino film?",
choices: ["Reservoir Dogs", "Django Unchained", "The Inglorious Basterds", "Once Upon a Time...in Hollywood"],
correct: "Once Upon a Time...in Hollywood",
 },
{
    //11
question: "Which Tarantino film features the character 'Hanz Landa'?",
choices: ["Once Upon a Time...in Hollywood", "The Inglorious Basterds", "Pulp Fiction", "Death Proof"],
correct: "The Inglorious Basterds",
 },
 {
    //12
question: "Which actor plays the role of 'Jimmie Dimmick' in Pulp Fiction?",
choices: ["Kurt Russell", "John Travolta", "Quentin Tarantino", "Harvey Keitel"],
correct: "Quentin Tarantino",
 },
 {
    //13
question: "Which two characters were the sole survivors of the bloodbath in The Hateful Eight?",
choices: ["Joe Gage and Six-Horse Judy", "Daisy Domergue and Jody", "Major Marquis Warren and Sheriff Chris Mannix", "John Ruth and Daisy Domergue"],
correct: "Major Marquis Warren and Sheriff Chris Mannix",
 },
 {
    //14
question: "Which one of these characters were a part of the final girls in Death Proof?",
choices: ["Abernathy", "Jungle Julia", "Arlene", "Pam"],
correct: "Abernathy",
 },
  {
    //15
question: "What is O-Ren Ishii's nickname in Kill Bill?",
choices: ["Cottonmouth", "Copperhead", "California Mountain Snake", "The Black Mamba"],
correct: "Cottonmouth",
 },
 ];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");
const btnNext = document.getElementById("btnNext");
const btnRestart = document.getElementById("btnRestart");
const quizContainer = document.getElementById("quiz");
const h4 = document.querySelector("h4");

function startQuiz() {
    // currentQuestion = 0;
    // score = 0;
    // timeLeft = 15;
    // quizContainer.style.display = "block";
    // btnRestart.style.display = "none";
    showQuestion();
    startTimer();
    btnNext.style.display = "none";
    resultEl.classList.add("hidden");
}

function showQuestion() 
{
    const q = myQuiz[currentQuestion];
    questionEl.textContent = q.question;

    choicesEl.innerHTML = "";
    q.choices.forEach((choice) => 
        {
        const btn = document.createElement("button");
    btn.textContent = choice;
    btn.addEventListener("click", () => selectAnswer(btn, q.correct));
    choicesEl.appendChild(btn);
        });
}

function selectAnswer(button, correctAnswer)
{
    const selected = button.textContent;

    Array.from(choicesEl.children).forEach((btn) => 
    {
    btn.disabled = true;
        if(btn.textContent === correctAnswer)
        {
            btn.style.borderColor = "green";
        }
      if(btn.textContent === selected && selected !== correctAnswer)
           { 
            btn.style.borderColor = "red";
            
           }
    });
    if(selected === correctAnswer)
    {
        score++;
    }
    btnNext.style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;
    if(currentQuestion < myQuiz.length)
    {
        showQuestion();
        // startTimer();
        h4.textContent = `${currentQuestion + 1}/${myQuiz.length}`;
        resultEl.classList.add("hidden");
        btnNext.style.display = "none";
    }
    else
    {
        endQuiz();
    }
}
function startTimer() 
{
    timerEl.textContent = timeLeft;
    timer = setInterval(() => 
   {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if(timeLeft <= 0) 
        {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
     
}

function endQuiz() 
{
clearInterval(timer);
quizContainer.classList.add("hidden");
resultEl.innerHTML = `Quiz Over! Your scored ${score} out of ${myQuiz.length}!<br>Time Remaining: ${timeLeft} seconds.`;
resultEl.classList.remove("hidden");
btnRestart.classList.remove("hidden");
}

btnNext.addEventListener("click", nextQuestion);
btnRestart.addEventListener("click", () => 
{
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    resultEl.classList.add("hidden");
    btnRestart.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    timerEl.textContent = timeLeft;
    startQuiz();
});

startQuiz();