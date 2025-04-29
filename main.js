let questionDiv = document.querySelector(".question"),
  totalQuestions = document.querySelector(".progres .score-2"),
  notaition = document.querySelector(".notaition"),
  answersBox = document.querySelector(".answers-box"),
  submitAnswer = document.querySelector(".btn"),
  score = document.querySelector(".score"),
  questionSpan = document.querySelector(".q-number span"),
  progres = document.querySelector(".progres .score-1"),
  quizApp = document.querySelector(".quiz-app"),
  countDown = document.querySelector(".countdown span"),
currentquestion = 0,
rightAnswers = 0,
question = 1,
countdownInterval;

async function getData() {
  const response = await fetch("data.josn");
  const data = await response.json();
  let qNumber = data.length;

  createBullets(qNumber);
  addData(data[currentquestion], qNumber);
  countdown(10, qNumber);

  submitAnswer.onclick = () => {
    let rightAnswer = data[currentquestion].answer;
    currentquestion++;
    checkAnswer(rightAnswer, qNumber);

    questionDiv.innerHTML = "";
    answersBox.innerHTML = "";
    addData(data[currentquestion], qNumber);
    handleBullets();
    question++;
    questionSpan.innerHTML = question;
    clearInterval(countdownInterval);
    countdown(10, qNumber);
    showResults(qNumber);
  };
}
getData();

function createBullets(num) {
  totalQuestions.innerHTML = num;
  for (let i = 0; i < 10; i++) {
    let span = document.createElement("span");
    notaition.appendChild(span);
    if (i === 0) {
      span.className = "done";
    }
  }
}

function addData(obj, count) {
  if (currentquestion < count) {
    let question = document.createElement("h2"),
      questionText = document.createTextNode(obj.question);
    question.appendChild(questionText);
    questionDiv.appendChild(question);

    for (i = 1; i <= 4; i++) {
      let answers = document.createElement("div");
      answers.className = "answer";
      let input = document.createElement("input");
      input.name = "question";
      input.type = "radio";
      input.id = `answer-${i}`;
      input.dataset.answer = obj[`answer-${i}`];
      if (i === 1) {
        input.checked = true;
      }

      let label = document.createElement("label"),
        labelText = document.createTextNode(obj[`answer-${i}`]);
      label.htmlFor = `answer-${i}`;
      label.appendChild(labelText);
      answers.appendChild(input);
      answers.appendChild(label);
      answersBox.appendChild(answers);
    }
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;
  for (i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }
  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
    progres.innerHTML = rightAnswers;
  }
}

function handleBullets() {
  let bullets = document.querySelectorAll(".notaition span");
  let arrayOfSpan = Array.from(bullets);
  arrayOfSpan.forEach((span, index) => {
    if (currentquestion === index) {
      span.className = "done";
    }
  });
}

function showResults(count) {
  let theResults;
  if (currentquestion === count) {
    questionDiv.remove();
    answersBox.remove();
    submitAnswer.remove();
    score.remove();
    let result = document.createElement("div");
    result.className = "result";

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span>Good Yor Score is </span>${rightAnswers}`;
    } else if (rightAnswers === count) {
      theResults = `<span>him Yor Score is </span>${rightAnswers}`;
    } else {
      theResults = `<span>bad Yor Score is </span>${rightAnswers}`;
    }
    result.innerHTML = theResults;
    quizApp.appendChild(result);
  }
}

function countdown(duration, count) {
  if (currentquestion < count) {
    let seconds;
    countdownInterval = setInterval(() => {
      seconds = parseInt(duration % 60);
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      countDown.innerHTML = `${seconds}`;
      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitAnswer.click();
      }
    }, 1000);
  }
}
