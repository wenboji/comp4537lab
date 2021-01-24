window.onload = () => {
  readLocalStorage();
  readOnly();
  uncheckRightAnswer();
  document
    .getElementById('submitBtn')
    .addEventListener('click', submitListener);
  onlyAllowOneChecked();
};
// change inputs and textarea to read only
const readOnly = () => {
  inputs = document.querySelectorAll('input[type=text]');
  for (let input of inputs) {
    input.readOnly = true;
  }

  let textareas = document.getElementsByTagName('textarea');
  for (let textarea of textareas) {
    textarea.readOnly = true;
  }
};

const uncheckRightAnswer = () => {
  inputs = document.querySelectorAll('input[type=checkBox]');
  for (let input of inputs) {
    input.checked = false;
  }
};

const submitListener = () => {
  let score = 0;
  const rightAnswers = [];
  if (typeof localStorage !== 'undefined') {
    let questionsStr = localStorage.getItem('questions');
    if (questionsStr) {
      let objs = JSON.parse(questionsStr);
      let quizs = document.getElementById('quizs');
      inputs = document.querySelectorAll('input[type=checkBox]');
      for (let obj of objs) {
        rightAnswers.push(obj.rightAnswer);
      }
      let index = 0;
      for (let input of inputs) {
        if (input.checked) {
          if (input.nextSibling.value === rightAnswers[index]) {
            score++;
            index++;
          }
        }
      }
    }
  } else {
    console.log('web storage it is not support in this browser...');
  }
  alert('you got ' + score + ' questions right');
};
