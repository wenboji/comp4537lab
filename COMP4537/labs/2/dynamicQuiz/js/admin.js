window.onload = () => {
  //buttons event listener
  //add
  document.getElementById('add').addEventListener('click', addQuestion);
  //delete
  document.getElementById('delete').addEventListener('click', deleteQuestion);
  //save
  document.getElementById('save').addEventListener('click', saveQuestion);
  //load questions from localStorage
  readLocalStorage();
  //
  onlyAllowOneChecked();
};
const addQuestion = () => {
  let lastQuestionNumber;
  if (document.getElementById('quizs').lastChild.firstChild) {
    dtQuizs = document.getElementById('quizs').getElementsByTagName('dt');
    lastQuestionNumber = dtQuizs[dtQuizs.length - 1].innerHTML
      .trim()
      .replace(/^\D+/g, '');
  }
  element = generateQuestion({
    questionNumber: lastQuestionNumber ? 1 + +lastQuestionNumber : 1,
  });
  console.log(element);
  quizs.appendChild(element);
};

const deleteQuestion = () => {
  document.getElementById('quizs').lastChild.remove();
  saveQuestion();
};
const saveQuestion = () => {
  let dlElements = document.getElementsByTagName('dl');
  const questions = [];
  for (let childElement of dlElements) {
    let answers = [];
    let rightAnswer = '';
    let questionNumber;
    let questionText = '';
    for (let child of childElement.children) {
      if (child.localName === 'dt') {
        questionNumber = child.innerHTML.trim().replace(/^\D+/g, '');
      } else if (child.localName === 'textarea') {
        questionText = child.value.trim();
      } else if (child.localName === 'div') {
        if (child.firstChild.checked) {
          rightAnswer = child.lastChild.value.trim();
          answers.push(rightAnswer);
        } else {
          answers.push(child.lastChild.value.trim());
        }
      }
    }
    questions.push(
      new Question({
        questionNumber: questionNumber,
        questionText: questionText,
        answers: answers,
        rightAnswer: rightAnswer,
      })
    );
  }
  localStorage.setItem('questions', JSON.stringify(questions));
};
// export { readLocalStorage };
