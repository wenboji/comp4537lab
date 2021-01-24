//question class
class Question {
  constructor({ questionNumber, questionText, answers, rightAnswer } = {}) {
    this.questionNumber = questionNumber;
    this.questionText = questionText;
    this.answers = answers ? answers : ['', '', '', ''];
    this.rightAnswer = rightAnswer;
  }
}
//read local storage and show on the page
const readLocalStorage = () => {
  if (typeof localStorage !== 'undefined') {
    let questionsStr = localStorage.getItem('questions');
    if (questionsStr) {
      let objs = JSON.parse(questionsStr);
      let quizs = document.getElementById('quizs');
      for (let obj of objs) {
        let question = new Question(obj);
        let questionHTML = generateQuestion(question);
        quizs.appendChild(questionHTML);
      }
    }
  } else {
    console.log('web storage it is not support in this browser...');
  }
};

const questionTemplate = (question) => {
  return (
    `
      <dl>
        <dt>
        Question ` +
    question.questionNumber +
    `
    </dt>
    <br />
        <textarea id="w3review" name="w3review" rows="4" cols="50">

          ` +
    question.questionText +
    `

        </textarea> ` +
    question.answers.map((answer) => {
      return (
        `<div><input type='checkBox' ` +
        checked(answer, question.rightAnswer) +
        ` 
        ><input type='text' value=` +
        answer +
        `></div>`
      );
    }) +
    `
      </dl>
  `
  );
};
//transfer html string to dom elements
const htmlToElement = (html) => {
  let template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
};

const saveObjToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

//generate a question
const generateQuestion = ({
  questionNumber,
  questionText,
  answers,
  rightAnswer,
} = {}) => {
  let htmlCode = questionTemplate(
    new Question({
      questionNumber: parseInt(questionNumber),
      questionText: questionText,
      answers: answers,
      rightAnswer: rightAnswer,
    })
  );
  //clear the null and undefined
  htmlCode = htmlCode
    .replaceAll('>,', '>')
    // .replaceAll('null', '')
    .replaceAll(/[\s]{2,}undefined[\s]{2,}/g, '');
  return htmlToElement(htmlCode);
};

const checked = (answer, rightAnswer) => {
  return answer === rightAnswer ? 'checked' : '';
};
const onlyAllowOneChecked = () => {
  inputs = document.querySelectorAll('input[type=checkBox]');
  for (let input of inputs) {
    input.addEventListener('change', function () {
      if (this.checked) {
        let parent = this.parentNode.parentNode;
        let checkboxs = parent.getElementsByTagName('input');
        for (let checkbox of checkboxs) {
          if (checkbox.type == 'checkbox') {
            checkbox.checked = false;
          }
        }
        this.checked = true;
      } else {
        console.log('Checkbox is not checked..');
      }
    });
  }
};
