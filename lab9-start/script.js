'use strict';

//constants
const totalQuestions = 5;
const base_url = `https://opentdb.com/api.php?amount=${totalQuestions}`;

//global variables
let url; //send fetch request to this url
let counter;
let score;
let correct;
let questions;

//get DOM elements
const cards = document.querySelectorAll('.card');
const categoryCard = cards[0];
const questionCard = cards[1];
const skeletonCard = cards[2];
const scoreCard = cards[3];

const categoryElements = Array.from(document.querySelectorAll('.category-item'));
const playBtn = document.querySelector('button');
const submitBtn = questionCard.querySelector('button');
const playAgainBtn = scoreCard.querySelector('button');
const questionHeaders = questionCard.querySelectorAll('span');
const questionText = questionCard.querySelector('.question-text');
const questionBody = questionCard.querySelector('.card-body');
const scoreElements = scoreCard.querySelectorAll('.stat');


categoryElements.forEach(item=>item.addEventListener('click', clickCategory));

function clickCategory(e){
    e.target.classList.toggle('selected');
    categoryElements.forEach(item=>{
        if(item.classList.contains('selected')&& item!== e.target)
            item.classList.remove('selected');
    });
}

playBtn.addEventListener('click', initGame);

function initGame() {
    //reset global variables
    counter = 0;
    score = 0;
    correct = 0;
    questions = [];
    url = base_url;

    const selectedCategory = document.querySelector('.category-item.selected');

    // If no category selected alert user to select category
    if(!selectedCategory)
    {
        alert('Please choose a category to start the game');
        return;
    }

    //Get category ID
    const categoryID = selectedCategory.dataset.category;

    url += `&category=${categoryID}`;

    categoryCard.classList.add('hidden');
    skeletonCard.classList.remove('hidden');

    getQuestions();
}

async function getQuestions() {
    try {
        const response = await fetch(url);
        if(!response.ok)
            throw Error(`Error: ${response.url} ${response.statusText}`);
        const data = await response.json();
        if(data.response_code === 0){
            processQuestions(data);
        }
        else{
            throw Error('Error: Cannot fetch questions from the API');
        }
    } catch (error) {
        console.log(error);
    }
}

function processQuestions(data) {
    questions = data.results.map(item => {
        const questionText = item.question;
        const level = item.difficulty;
        const correct = item.correct_answer;
        const incorrect = item.incorrect_answers;

        const allAnswers = [...incorrect, correct];

        const correctIndex = Math.floor(Math.random() * (incorrect.length + 1));
        allAnswers.splice(correctIndex, 0, correct);

        return {
            text: questionText,
            level: level,
            answer: allAnswers,
            correctAnswer: correctIndex

        };
    });
    showQuestions();
}

function showQuestions() {
    submitBtn.disabled = false;
    let optionElements = questionCard.querySelectorAll('.option-item');
    optionElements.forEach(element=>element.remove());

    const question = questions[counter];
    questionHeaders[0].textContent = `Question: ${counter+1} / ${totalQuestions}`;
    questionHeaders[1].textContent = `Level: ${question.level}`;
    questionHeaders[2].textContent = `Score: ${score}`;
    questionText.innerHTML = question.text;
    const fragment = document.createDocumentFragment();
    question.answers.forEach(answer=>{
        const option = document.createElement('div');
        option.innerHTML = answer;
        option.classList.add('option-item');
        fragment.append(option);
    });

    questionBody.insertBefore(fragment, submitBtn);
    skeletonCard.classList.add('hidden');
    questionCard.classList.remove('hidden');

    optionElements = questionCard.querySelectorAll('.option-item');
    optionElements.forEach(item=>item.addEventListener('click', e=>{
        optionElements.forEach(element=>{
            if(element.classList.contains('selected'))
                element.classList.remove('selected');
        });

        e.target.classList.add('selected');
    }));
}

submitBtn.addEventListener('click', submitAnswer);

function submitAnswer() {
    submitBtn.disabled = true;
    const answerSubmitted = questionBody.querySelector('.selected');
    const allAnswers = questionBody.querySelectorAll('.option-item');
    const correctAnswer = allAnswers[questions[counter].correctAnswer];

    correctAnswer.classList.add('correct');


    if(answerSubmitted === correctAnswer)
    {
        score += 10;
        correct++;
    }
    else {
        answerSubmitted.classList.add('wrong');
    }

    setTimeout(() => {
        nextQuestion();
    }, 1500);
}

function nextQuestion() {
    counter++;

    if(counter < totalQuestions)
        showQuestions();
    else
        showScore();
}

function showScore() {
    scoreElements[0].textContent = `Correct Answers: ${correct}`;
    scoreElements[1].textContent = `Score: ${score}`;

    questionCard.classList.add('hidden');
    scoreCard.classList.remove('hidden');
}

playAgainBtn.addEventListener('click', ()=>{

    counter = 0;
    score = 0;
    correct = 0;
    questions = [];
    url = base_url;

    scoreCard.classList.add('hidden');
    categoryCard.classList.remove('hidden');

    categoryElements.forEach(item => item.classList.remove('selected'));

    skeletonCard.classList.add('hidden');
    questionCard.classList.add('hidden');

});