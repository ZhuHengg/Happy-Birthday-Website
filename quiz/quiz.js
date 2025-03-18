const questions = [
    {
        question: "When is our first chat ?",
        optionA: "14 September",
        optionB: "1 October",
        optionC: "7 October",
        optionD: "13 October",
        correctOption: "optionA"
    },

    {
        question: "What did we chat about for the first time in whatsapp?",
        optionA: "Aiesec",
        optionB: "Commitment",
        optionC: "Course Rep",
        optionD: "Rbc :'",
        correctOption: "optionC"
    },

    {
        question: "When is our first call? (duration > 30mins)",
        optionA: "13 December",
        optionB: "25 December",
        optionC: "15 December",
        optionD: "23 December",
        correctOption: "optionD"
    },

    {
        question: "What did we talk about",
        optionA: "kena scratch car",
        optionB: "things related to family",
        optionC: "rbc :<",
        optionD: "bagua",
        correctOption: "optionC"
    },

    {
        question: "What did we do when we go support others in sport competition?",
        optionA: "run away",
        optionB: "give 100+",
        optionC: "didn't go hahaha",
        optionD: "zhijie subs & play yourself",
        correctOption: "optionB"
    },

    {
        question: "When did I proposed to asked you out?",
        optionA: "chor 1",
        optionB: "chor 2",
        optionC: "chor 3",
        optionD: "chor 4",
        correctOption: "optionB"
    },

    {
        question: "When is the first outing we both go together?",
        optionA: "10 Feb",
        optionB: "11 Feb",
        optionC: "12 Feb",
        optionD: "13 Feb",
        correctOption: "optionB"
    },

    {
        question: "Where is the first place we go after lunch for the first outing?",
        optionA: "Petrosains",
        optionB: "Bontanic Garden",
        optionC: "Planetarium Negara",
        optionD: "Basketball court",
        correctOption: "optionC"
    },

    {
        question: "What did we eat for lunch during our first outing?",
        optionA: "Nasi Lemak",
        optionB: "Roti Canai",
        optionC: "Chicken Rice",
        optionD: "Hotpot",
        correctOption: "optionA"
    },

    {
        question: "What is the last restaurant we ate at?",
        optionA: "Jibby & Co",
        optionB: "Hawker stall",
        optionC: "Taiwan restaurant",
        optionD: "百味小菜",
        correctOption: "optionA"
    },

    {
        question: "When did we started to get close(there's no correct ans)",
        optionA: "November",
        optionB: "December",
        optionC: "January",
        optionD: "Febuary",
        correctOption: ["optionB", "optionC"]
    },
]


let shuffledQuestions = questions; // Directly use questions in order

function handleQuestions() { 
    const currentQuestion = shuffledQuestions[index]//function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 11) { //update this to lenth of questions you want -1 i.e if you want 16 questions then <= 15
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    //handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}

function checkAnswer() {
    const options = document.getElementsByName("option");
    let selectedOption = null;

    // Check if any option is selected
    for (const option of options) {
        if (option.checked) {
            selectedOption = option.value;
            break;
        }
    }

    // If no option is selected, show a message and return early
    if (selectedOption === null) {
        alert("Please select an option before proceeding!");
        return;
    }

    // Proceed with scoring and moving to the next question
    if (selectedOption === correctAnswer) {
        playerScore++;
    }
    currentQuestionIndex++;

    // Move to next question or show results
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        displayResults();
    }
}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]; // gets current Question
    const currentQuestionAnswers = currentQuestion.correctOption; // gets current Question's answers (array)
    const options = document.getElementsByName("option"); // gets all elements with name 'option'
    let correctOption = null;

    // Find the correct option labels
    options.forEach((option) => {
        if (currentQuestionAnswers.includes(option.value)) {
            correctOption = option.labels[0].id;
        }
    });

    // Check if any option is selected
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex";
        return;
    }

    // Check if selected option is in the array of correct answers
    options.forEach((option) => {
        if (option.checked && currentQuestionAnswers.includes(option.value)) {
            document.getElementById(option.labels[0].id).style.backgroundColor = "green";
            playerScore++;
            //indexNumber++;
            setTimeout(() => {
                questionNumber++;
            }, 1000);
        } else if (option.checked && !currentQuestionAnswers.includes(option.value)) {
            const wrongLabelId = option.labels[0].id;
            document.getElementById(wrongLabelId).style.backgroundColor = "red";
            document.getElementById(correctOption).style.backgroundColor = "green";
            wrongAttempt++;
            //indexNumber++;
            setTimeout(() => {
                questionNumber++;
            }, 1000);
        }
    });
}

//called when the next button is clicked
function handleNextQuestion() {
    // Check if an answer is selected
    const options = document.getElementsByName("option");
    const isAnyOptionChecked = Array.from(options).some(option => option.checked);

    // If no option is selected, show a warning and stop
    if (!isAnyOptionChecked) {
        document.getElementById('option-modal').style.display = "flex";
        return;
    }

    // Proceed to check the answer and move to the next question
    checkForAnswer();
    unCheckRadioButtons();
    //delays next question displaying for a second
    setTimeout(() => {
        indexNumber++;
        if (indexNumber <= 10) { // Update this to the number of questions you want - 1
            NextQuestion(indexNumber);
        } else {
            handleEndGame();
        }
        resetOptionBackground();
    }, 1000);
}


//called when the next button is called
/*function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        indexNumber++;
        if (indexNumber <= 10) { //update this to number of questions you want -1. determines when there's no more question and should display answer
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}*/

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Comment:\nNoooooooooo, u bad bad 竟然fgt about this, I sad sad dy :(";
        remarkColor = "light red";
        remarkStyle = "font-weight: bold; font-size: 24px; text-shadow: 2px 2px 5px #000;";
    }
    else if (playerScore >= 4 && playerScore < 8) {
        remark = "Comment:\nEmmm, ok la ngam ngam pass, but u fgt some, I sad sad dy (cri";
        remarkColor = "orange";
        remarkStyle = "font-weight: bold; font-size: 24px; text-shadow: 2px 2px 5px #000;";
    }
    else if (playerScore >= 8) {
        remark = "Comment:\nYayyyyyyy, hepihepihepi~, u still rmb all the details!";
        remarkColor = "green";
        remarkStyle = "font-weight: bold; font-size: 24px; text-shadow: 2px 2px 5px #000;";
    }
  //playerScore divided by new length of questions
    const playerGrade = (playerScore / 11) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}




