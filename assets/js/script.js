console.log("Javascript is linked!");

// Global variables
var button = document.querySelector("#button");
var buttonDiv = document.querySelector("#div-button");
var message = document.querySelector("#message");
var timerDisplay = document.querySelector("#timer-display");
var questionDisplay = document.querySelector("#question-display");
var parentSection = document.querySelector("#parent");
var timerNote = document.querySelector("#timer-note");
var correctIncorrect = document.querySelector("#correct-incorrect");
//initialize timer at 20 secs
var timerSecondsLeft = 20;
//initialize endChecker as false
var endChecker = false;
//initialize clicked on answer var (for use in comparing user answers array to correct answers array)
var clickedOnAnswer;
//initialize userScore var as 0
var userScore = 0;
i = 0;

// Create objects for each question
question1 = {
    question: "What does HTML stand for?",
    option1: "Hot Temperature Machine Learning",
    option2: "High Targets Mean Little",
    option3: "Hypertext Markup Language",
    option4: "Horizon Turtle Monster Lion",
    // answer: 
};

question2 = {
    question: "What does CSS stand for?",
    option1: "Constant Style Sheets",
    option2: "Correct Styling Scores",
    option3: "Concorde Sheet Styles",
    option4: "Cascading Style Sheets",
    // answer: option4
};

question3 = {
    question: "What company invented Javascript?",
    option1: "Microsoft",
    option2: "Netscape",
    option3: "Google",
    option4: "Apple",
    // answer: option2
};

question4 = {
    question: "What company invented the World Wide Web?",
    option1: "CERN",
    option2: "Microsoft",
    option3: "Mozilla",
    option4: "Dell"
};

question5 = {
    question: "What kind of characters are Javascript arrays stored in between?",
    option1: "()",
    option2: "[]",
    option3: "{}",
    option4: "||"
};


//create answer array to store user answers, for later comparison to predetermined correct answers array
var userAnswersArray = [];
var correctAnswersArray = [question1.option3, question2.option4, question3.option2, question4.option1, question5.option2];

// make array of all the question objects
var questionsArray = [question1, question2, question3, question4, question5];


// define function timerFunc() - countdown to 0 then end function
function timerFunc() {
    var timerInterval = setInterval(function () {
        timerSecondsLeft--;
        timerDisplay.textContent = timerSecondsLeft + " seconds remaining until game end";
        console.log(timerSecondsLeft + " seconds left in game");

        if (timerSecondsLeft <= 0 || endChecker) {
            clearInterval(timerInterval);
            endChecker = true; // added this so nextQuestion func cannot run if timer is out
            timerDisplay.textContent = "GAME OVER!"
            console.log("Game has ended");
            timerSecondsLeft = 0; // this reset the timer, to avoid a countdown going negative
            endGame();
        };
    }, 1000);
};


//function questionsStart() - initiates the changes of the HTML content to display questions and answers
function questionsStart() {

    if (i < questionsArray.length - 1) {
        buttonDiv.remove(); // added this to remove the start quiz button
        questionDisplay.textContent = ""; // this clears the welcome message before adding new content
        questionDisplay.textContent = questionsArray[i].question;
        // creates ol, and appends it to the questionDisplay
        var optionsList = document.createElement("ol");
        questionDisplay.appendChild(optionsList);
        //creates <li> items under the <ol>
        var option1 = document.createElement("li");
        option1.setAttribute("id", "option-1");
        optionsList.appendChild(option1);
        var option2 = document.createElement("li");
        option2.setAttribute("id", "option-2");
        optionsList.appendChild(option2);
        var option3 = document.createElement("li");
        option3.setAttribute("id", "option-3");
        optionsList.appendChild(option3);
        var option4 = document.createElement("li");
        option4.setAttribute("id", "option-4");
        optionsList.appendChild(option4);

        //fill the <li> items with content from t he question arrays
        option1.textContent = questionsArray[i].option1;
        option2.textContent = questionsArray[i].option2;
        option3.textContent = questionsArray[i].option3;
        option4.textContent = questionsArray[i].option4;

        // add 1 to i each iteration
        i++;

        //listen for user click on any option
        optionsList.removeEventListener("click", nextQuestion); //  to remove event listener to prevent from stacking
        optionsList.addEventListener("click", function (event) {
            clickedOnAnswer = event.target.innerText;
            userAnswersArray.push(clickedOnAnswer);
            //check if answer is wrong, if so deduct time from timerSecondsLeft
            if (clickedOnAnswer !== correctAnswersArray[i - 1]) {
                timerSecondsLeft = timerSecondsLeft - 3;
                //also, display incorrect
                correctIncorrect.innerHTML = "<h4>Incorrect! Minus 3 seconds</h4>";
            } else {
                correctIncorrect.innerHTML = "<h4>Correct!</h4>"
            };
            nextQuestion();
        });
        //add else if i = 4 instance for the final run of the questions
    } else if (i === 4) {
        buttonDiv.remove(); // added this to remove the start quiz button
        questionDisplay.textContent = ""; // this clears the welcome message before adding new content
        questionDisplay.textContent = questionsArray[i].question;
        // creates ol, and appends it to the questionDisplay
        var optionsList = document.createElement("ol");
        questionDisplay.appendChild(optionsList);
        //creates <li> items under the <ol> - setAttribute to assign ID's
        var option1 = document.createElement("li");
        option1.setAttribute("id", "option-1");
        optionsList.appendChild(option1);
        var option2 = document.createElement("li");
        option2.setAttribute("id", "option-2");
        optionsList.appendChild(option2);
        var option3 = document.createElement("li");
        option3.setAttribute("id", "option-3");
        optionsList.appendChild(option3);
        var option4 = document.createElement("li");
        option4.setAttribute("id", "option-4");
        optionsList.appendChild(option4);

        // fill the <li> items with content fromt he question arrays
        option1.textContent = questionsArray[i].option1;
        option2.textContent = questionsArray[i].option2;
        option3.textContent = questionsArray[i].option3;
        option4.textContent = questionsArray[i].option4;

        // add 1 to i each iteration
        i++;
        //listen for user click on any option
        optionsList.removeEventListener("click", nextQuestion); // new add, to remove event listener to prevent from stacking
        optionsList.addEventListener("click", function (event) {
            clickedOnAnswer = event.target.innerText;
            userAnswersArray.push(clickedOnAnswer);
            // check if answer is wrong, if so deduct time
            if (clickedOnAnswer !== correctAnswersArray[i - 1]) {
                timerSecondsLeft = timerSecondsLeft - 3;
            };
            endGame();
        });
    };
};

//nextQuestion func
function nextQuestion() {
    //if all questions have been presented, it exits and does NOT run questionsStart again
    if (!endChecker) {
        questionsStart();
    } else {
        return;
    };
};

//startQuiz function - launches timerFunc() and questionsStart() functions
function startQuiz() {
    console.log("Quiz has started");
    // start timer using set interval (run timer function)
    timerFunc();
    // displays the first question (replacing html elements dynamically)
    questionsStart();
    // erase the element that has the timer note
    timerNote.remove();
};

//  endGame function below - runs some processes that end the game - calculates the userScore for later use by saveScore function
function endGame() {
    //create var to be checked by timerFUnc (ends that function if variable is true)
    endChecker = true;
    //calculate user score - for loop comparing arrays to each other, adds 1 to userScore for each correct answer
    for (var ans = 0; ans < questionsArray.length; ans++) {
        if (correctAnswersArray[ans] === userAnswersArray[ans]) {
            userScore = userScore + 1;
            // console.log("User score: ", userScore);
        } else {
            // console.log('None correct')
        };
    };
    //remove question from display & display the user's score
    questionDisplay.innerHTML = `<h2>Quiz finished! User score: ${userScore}</h2>
    <label>Enter Initials</label>
    <input id="initials" type="text"></input>
    <button id="submit">Submit</button>
    `;
    //clear the timer display text
    timerDisplay.textContent = "";
    //clear the array of user answers
    userAnswersArray = [];
    //clear the correct/incorrect display element
    correctIncorrect.innerHTML = "";
    //run SaveScore function
    saveScore();
};

// function to save the score to local storage
function saveScore() {
    // take the input of the forms
    var initials = document.querySelector("#initials");
    var finalSubmit = document.querySelector("#submit");

    //when the submit button is clicked: IF there are contents in highScores (local mem) add the current scores in localStorage to the scoresArray, otherwise create empty array
    finalSubmit.addEventListener("click", function () {
        var scoresArray = JSON.parse(localStorage.getItem("highScores")) || [];

        var newScore = {
            initials: initials.value,
            score: userScore
        };
        //add the new score to the scoresArray array
        scoresArray.push(newScore);
        //add the scoresArray to local storegae under key highScores
        localStorage.setItem('highScores', JSON.stringify(scoresArray));

        // display the current score to the page using getItem, remove submit button
        var highScoresString = localStorage.getItem("highScores");
        // make string back into array
        var highScoresArray = JSON.parse(highScoresString);
        // example/filler scores for when high scores display
        highScoresArray.push({ initials: "AB", score: 3 });
        highScoresArray.push({ initials: "CD", score: 2 });
        highScoresArray.push({ initials: "EF", score: 1 });

        // sort the highScoresArray - create a inline function to compare score element
        highScoresArray.sort(function (x, y) {
            return y.score - x.score;
        });
        // console.log("Ordered score list: " + highScoresArray);
        // update the display to show the 3 top score/initial pairs stored in memory, in descending order
        questionDisplay.innerHTML = "Top 3 User Scores: <br>" + highScoresArray[0].initials + " : " + highScoresArray[0].score +
            "<br>" + highScoresArray[1].initials + " : " + highScoresArray[1].score + "<br>" + highScoresArray[2].initials + " : " + highScoresArray[2].score +
            "<br/> <button id='button'>Restart Quiz!</button> <br> <button id='clear-scores'>Clear Scores</button>";
        var button = document.querySelector("#button");
        //event listener for click on the submit user score button
        button.addEventListener("click", function () {
            if (endChecker) {
                //resets variables to initial conditions
                timerSecondsLeft = 20;
                endChecker = false;
                userScore = 0;
                i = 0;
                //clear scores display
                questionDisplay.textContent = "";
                // restarts the quiz
                startQuiz();
            } else if (!endChecker) {
                questionDisplay.textContent = "";
                startQuiz();
            };
        });
        // add event listener for clear scores button
        var clearScores = document.querySelector("#clear-scores");
        clearScores.addEventListener("click", function () {
            localStorage.removeItem("highScores");
            questionDisplay.innerHTML = "Scores cleared! <br/> <button id='button'>Restart Quiz!</button>";
            var button = document.querySelector("#button");
            button.addEventListener("click", function () {
                if (endChecker) {
                    timerSecondsLeft = 20;
                    endChecker = false;
                    userScore = 0;
                    i = 0;
                    questionDisplay.textContent = "";
                    startQuiz();
                } else if (!endChecker) {
                    questionDisplay.textContent = "";
                    startQuiz();
                }
            })
        });
    });
};

// addEventListener for a click on the Start Quiz button, which then runs the startQuiz function
button.addEventListener("click", startQuiz);

