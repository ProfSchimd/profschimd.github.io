const SUCCESS_STRING = "Corretto";
const FAIL_STRING = "Sbagliato";
const POINTS_STRING = "Punti";
const CHECK_STRING = "Verifica";
const RESET_STRING = "Reset";

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

let questions = null;
let checked = false;

function makeContentDiv(qId) {
    var mainDiv = document.createElement('div');
    mainDiv.id = `question-${qId}`;
    mainDiv.classList.add('mx-3', 'my-2', 'py-2', 'px-4', 'border');
    return mainDiv;
}

function makeQuestionText(preText, questionText) {
    var mainDiv = document.createElement('div');
    mainDiv.classList.add('py-1');
    mainDiv.innerHTML = `${preText} ${questionText}`;
    return mainDiv;
}

function makeOptionsDiv() {
    var mainDiv = document.createElement('div');
    mainDiv.classList.add('px-3');
    return mainDiv;
}

// ToDo: change second param to option number and then construct id's
function makeRadioOption(optText, optId, questionId) {
    // div containing the radio option (this will be returned)
    var mainDiv = document.createElement('div');
    mainDiv.classList.add('form-check');

    // the content: a pair of 'input' and 'label'
    var optInput = document.createElement('input');
    optInput.type = 'radio';
    optInput.id = `ans-${optId}`
    optInput.name = `q-${questionId}`
    optInput.classList.add('form-check-input')

    var optLabel = document.createElement('label');
    optLabel.innerHTML = optText;
    optLabel.classList.add('form-check-label');

    mainDiv.appendChild(optInput);
    mainDiv.appendChild(optLabel);
    return mainDiv;
}

function makeCheckBoxOption(optText, optId, questionId) {
    // div containing the radio option (this will be returned)
    var mainDiv = document.createElement('div');
    mainDiv.classList.add('form-check');

    // the content: a pair of 'input' and 'label'
    var optInput = document.createElement('input');
    optInput.type = 'checkbox';
    optInput.id = `ans-${optId}`
    optInput.name = `q-${questionId}`
    optInput.classList.add('form-check-input')

    var optLabel = document.createElement('label');
    optLabel.innerHTML = optText;
    optLabel.classList.add('form-check-label');

    mainDiv.appendChild(optInput);
    mainDiv.appendChild(optLabel);
    return mainDiv;
}

function makeCheckButton(text, callback) {
    var mainDiv = document.createElement('div');
    mainDiv.classList.add('px-3', 'py-2')
    var checkResultButton = document.createElement('input');
    checkResultButton.id = 'check-button';
    checkResultButton.type = 'button';
    checkResultButton.value = text;
    checkResultButton.onclick = callback;
    mainDiv.appendChild(checkResultButton);
    return mainDiv;
}

function makeSingleTypeQuestion(question) {
    var optionsDiv = makeOptionsDiv();
    // shuffle answers: make an array of div's and then suffle the array
    var optionsArray = []
    for (const l in question.options) {
        var ansId = `${question.id}-${l}`
        optionsArray.push(makeRadioOption(question.options[l], ansId, question.id));
    }
    optionsArray = shuffle(optionsArray);
    for (const l in optionsArray) {
        optionsDiv.appendChild(optionsArray[l]);
    }
    return optionsDiv;
}

function makeMultipleTypeQuestion(question) {
    var optionsDiv = makeOptionsDiv();
    // shuffle answers: make an array of div's and then suffle the array
    var optionsArray = []
    for (const l in question.options) {
        var ansId = `${question.id}-${l}`
        optionsArray.push(makeCheckBoxOption(question.options[l], ansId, question.id));
    }
    optionsArray = shuffle(optionsArray);
    for (const l in optionsArray) {
        optionsDiv.appendChild(optionsArray[l]);
    }
    return optionsDiv;
}

function makeFillTypeQuestion(question, questionNumber) {
    
    var questionDisplayNumber = parseInt(questionNumber) + 1;
    var textDiv = makeQuestionText(`${questionDisplayNumber}.`, question.text);
    var substituted = `${questionDisplayNumber}. ${question.text}`;
    for(var i = 0; i < question.correct.length; i++) {
        var searchPattern = `{{${i}}}`;
        var inputHTML = `<input type="text" id="ans-${question.id}-${i}" aria-label="inpt risposta">`
        substituted = substituted.replace(searchPattern, inputHTML);
    }
    textDiv.innerHTML = substituted;
    return textDiv;
}

function makeResultMessage(correct) {
    var mainDiv = document.createElement('div');
    var textClass = correct ? 'text-success' : 'text-danger';
    var textContent = correct ? SUCCESS_STRING : FAIL_STRING;
    mainDiv.classList.add(textClass);
    mainDiv.innerHTML = textContent;
    return mainDiv;
}

function makePointsMessage(points, maxPoints, minPoints) {
    var mainDiv = document.createElement('div');
    var textClass = 'text-success';
    if (points < maxPoints) {
        textClass = points > minPoints ? 'text-warning' : 'text-danger';
    }
    var textContent = `${POINTS_STRING}: ${points}/${maxPoints}`;
    mainDiv.classList.add(textClass);
    mainDiv.innerHTML = textContent;
    return mainDiv;

}

function checkAnswer(event) {
    if (!checked) {
        for (const i in questions) {
            var question = questions[i];
            switch (question.type) {
                case "single":
                    var correctRadio = document.querySelector(`#ans-${question.id}-${question.correct}`);
                    var contentDiv = document.querySelector(`#question-${question.id}`);
                    contentDiv.appendChild(makeResultMessage(correctRadio.checked));
                    break;
                case "multiple":
                    // in this case this is an array of correct statements
                    var correctAns = question.correct;
                    // make a score +1 correctly checked / unchecked , -1 wrongly checked / unchecked
                    // this score will be the sum of the elements in the following array
                    // (code improvements later...)
                    var scoreArray = new Array(question.options.length);
                    var correctness = question.correct;
                    
                    for (var opt = 0; opt < correctness.length; opt++) {
                        var checkBox = document.querySelector(`#ans-${question.id}-${opt}`);
                        if (correctness[opt] === 1) {
                            scoreArray[opt] = checkBox.checked ? 1 : -1;
                        } else {
                            scoreArray[opt] = checkBox.checked ? -1 : 1;
                        }
                    }
                    var totalScore = scoreArray.reduce(
                        (prevVal, currVal) => prevVal + currVal, 0
                    );
                    var contentDiv = document.querySelector(`#question-${question.id}`);
                    contentDiv.appendChild(makePointsMessage(totalScore, correctness.length, -correctness.length));
                    break;
                case "fill":
                    var answers = question.correct;
                    var scoreArray = new Array(answers.length);
                    for (var j = 0; j < answers.length; j++) {
                        var inputId = `#ans-${question.id}-${j}`;
                        var inputEl = document.querySelector(inputId);
                        ans = inputEl.value;
                        scoreArray[j] = (answers[j] === ans) ? 1 : 0;
                    }
                    var totalScore = scoreArray.reduce(
                        (prevVal, curVal) => prevVal + curVal, 0
                    );
                    var contentDiv = document.querySelector(`#question-${question.id}`);
                    contentDiv.appendChild(makePointsMessage(totalScore, answers.length, 0));
                    break;
                default:
                    break;
            }
        }
        checked = true;
        document.querySelector('#check-button').disabled = true;
    }
}

function showQuestions(data, parentDivId) {
    var parentDiv = document.querySelector(`#${parentDivId}`)
    // shuffle questions
    questions = shuffle(data);
    for (const i in questions) {
        var question = questions[i];
        var contentDiv = makeContentDiv(`${question.id}`);
        var questionDisplayNumber = parseInt(i) + 1;
        var questionDiv = makeQuestionText(`${questionDisplayNumber}.`, question.text);
        var optionsDiv = null;
        switch (question.type) {
            case "single":
                optionsDiv = makeSingleTypeQuestion(question);
                break;
            case "multiple":
                optionsDiv = makeMultipleTypeQuestion(question);
                break;
            case "fill":
                questionDiv = makeFillTypeQuestion(question, i);
                break;
            default:
                break;
        }

        var checkResultButton = makeCheckButton(CHECK_STRING, checkAnswer);
        contentDiv.appendChild(questionDiv);
        if (optionsDiv) {
            contentDiv.appendChild(optionsDiv);
        }
        parentDiv.appendChild(contentDiv);

    }
    parentDiv.appendChild(checkResultButton);
}

function quizStart(questFile, parentDivId) {
    fetch(questFile)
        .then(response => {
            return response.json();
        })
        .then(jsonData => showQuestions(jsonData, parentDivId));
}