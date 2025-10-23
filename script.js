let quesCon = [
    "You suffer a financial setback. To what extent can you influence this situation?",
    "People respond unfavorably to your latest ideas. To what extent can you influence this situation?",
    "Your personal and work obligations are out of balance. To what extent can you influence this situation?",
    "You are not exercising regularly though you know you should. To what extent can you influence this situation?",
    "Your computer crashed for the third time this week. To what extent can you influence this situation?"
]; 

let quesOwn = [
    "You are overlooked for a promotion. To what extent do you feel responsible for improving the situation?",
    "Someone you respect ignores your attempt to discuss an important issue. To what extent do you feel responsible for improving this situation?",
    "Your workplace is understaffed. To what extent do you feel responsible for improving this situation?",
    "Your organization is not meeting its goals. To what extent do you feel responsible for improving this situation?",
    "The meeting you are in is a total waste of time. To what extent do you feel responsible for improving this situation?"
];

let quesReach = [
    "You are criticized for a big project that you just completed. The consequences of this situation will:",
    "The high-priority project you are working on gets canceled. The consequences of this situation will:",
    "You hit every red light on your way to an important appointment. The consequences of this situation will:",
    "You miss an important appointment. The consequences of this situation will:",
    "Your boss adamantly disagrees with your decision. The consequences of this situation will:"
];

let quesEnd = [
    "You accidentally delete an important email. The consequences of this situation will:",
    "You are unable to take a much-needed vacation. The consequences of this situation will:",
    "After extensive searching, you cannot find an important document. The consequences of this situation will:",
    "You never seem to have enough money. The consequences of this situation will:",
    "You lost something that is important to you. The consequences of this situation will:"
];


let quesArray = quesCon.concat(quesOwn, quesReach, quesEnd);

let conScore = [0, 0, 0, 0, 0];
let ownScore = [0, 0, 0, 0, 0];
let reachScore = [0, 0, 0, 0, 0];
let endScore = [0, 0, 0, 0, 0];

let startButton = document.getElementById("startButton");
let nextButton = document.getElementById("nextButton");
let restartButton = document.getElementById("restartButton");

startButton.addEventListener("click", function(event) {
    document.getElementById("containerTitle").style.display = "none";
    document.getElementById("questionDiv").style.display = "block";
    document.getElementById("answerDiv").style.display = "block";
    event.target.textContent = "Next Question";
    nextButton.style.display = "inline";
    displayQuestion(0);
    event.target.style.display = "none";
});

let currentQuestionIndex = 0;


function getLabelsForQuestion(index) {
    if (index < 5) {
        return { left: "Not at all", right: "Completely" };
    } else if (index < 10) {
        return { left: "Not responsible at all", right: "Completely responsible" };
    } else if (index < 15) {
        return { left: "Affect all aspects of my life", right: "Be limited to this situation" };
    } else {
        return { left: "Last forever", right: "Quickly pass" };
    }
}

function displayQuestion(index) {
    currentQuestionIndex = index;
    document.getElementById("questionText").innerText = quesArray[index];

    
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });

    const labels = getLabelsForQuestion(index);
    document.getElementById("leftLabel").textContent = labels.left;
    document.getElementById("rightLabel").textContent = labels.right;

    
};

nextButton.addEventListener("click", function() {
   
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
        const selectedValue = parseInt(selectedOption.value);
        
        if (currentQuestionIndex < 5) {
            conScore[currentQuestionIndex] = selectedValue;
        } else if (currentQuestionIndex < 10) {
            ownScore[currentQuestionIndex - 5] = selectedValue;
        } else if (currentQuestionIndex < 15) {
            reachScore[currentQuestionIndex - 10] = selectedValue;
        } else {
            endScore[currentQuestionIndex - 15] = selectedValue;
        }
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quesArray.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        nextButton.style.display = "none";
        restartButton.style.display = "inline";
        
        showResults();
    }
});

function showResults() {

    let totalCon = 0;
    let totalOwn = 0; 
    let totalReach = 0;
    let totalEnd = 0;
     
    for (let i = 0; i < conScore.length; i++) {
        totalCon = totalCon + conScore[i];
    }

    for (let i = 0; i < ownScore.length; i++) {
        totalOwn = totalOwn + ownScore[i];
    }
    
    for (let i = 0; i < reachScore.length; i++) {
        totalReach = totalReach + reachScore[i];
    }

    for (let i = 0; i < endScore.length; i++) {
        totalEnd = totalEnd + endScore[i];
    }

    let aveScore = (totalCon + totalOwn + totalReach + totalEnd) * 2;
    
    document.getElementById("resultDiv").style.display = "block";
    
    document.getElementById("conResult").textContent = totalCon;
    document.getElementById("ownResult").textContent = totalOwn;
    document.getElementById("reachScore").textContent = totalReach;
    document.getElementById("endResult").textContent = totalEnd;
    document.getElementById("aveScore").textContent = aveScore;

    restartButton.addEventListener("click", function() {
        location.reload();
    });

    document.getElementById("questionDiv").style.display = "none";
    document.getElementById("answerDiv").style.display = "none";
    document.getElementById("nextButton").style.display = "none";
  
}
