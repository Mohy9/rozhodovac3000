/*Geting Value*/
function changeText(val) {
  document.getElementById("question").innerHTML = val;

  const show = document.getElementById("question");
  show.classList.remove("hidden");
}

function doStuff(val) {
  document.body.style.background = val;
}

// This is the array that will hold the answer list items
let answerItems = [];

function renderAnswerItem(answerItem) {
  // Select the first element with a class of `js-answer-list`
  const list = document.getElementById("js-answer-list");
  const item = document.querySelector(`[data-key='${answerItem.id}']`);

  if (answerItem.deleted) {
    item.remove();
    if (answerItems.length === 0) list.innerHTML = "";
    return;
  }

  // create an 'li' element and assign it to 'node'
  const node = document.createElement("li");
  node.setAttribute("class", `answer-item shadow-box`);
  node.setAttribute("data-key", answerItem.id);
  node.innerHTML = `
    <label for="${answerItem.id}" class="tick js-tick"></label>
    <span>${answerItem.text.toUpperCase()}</span>
    <button class="delete-button js-delete-button">
    <svg> <use href="#delete-icon"></use> </svg>
    </button>
    `;
  // list.append(node);
  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

// This function will create a new answer object based on the
// text that was entered in the text input, and push it into
// the `answerItems` array
function addanswerItem(text) {
  const answerItem = {
    text,
    id: Date.now(),
  };

  answerItems.push(answerItem);
  renderAnswerItem(answerItem);
  handleChange();
}

function deleteAnswerItem(key) {
  // find the corresponding answerItem object in the answerItems array
  const index = answerItems.findIndex((item) => item.id === Number(key));
  // Create a new object with properties of the current answerItem item
  // and a `deleted` property which is set to true
  const answerItem = {
    deleted: true,
    ...answerItems[index],
  };
  // remove the answerItem item from the array by filtering it out
  answerItems = answerItems.filter((item) => item.id !== Number(key));
  renderAnswerItem(answerItem);
  handleChange();
}

// Select the form element
const form = document.getElementById("js-form");

// Add a submit event listener
form.addEventListener("submit", (event) => {
  // prevent page refresh on form submission
  event.preventDefault();
  // select the text input
  const input = document.getElementById("js-answer-input");

  // Get the value of the input and remove whitespace
  const text = input.value.trim();
  if (text !== "") {
    addanswerItem(text);
    input.value = "";
    input.focus();
  }
});

const list = document.getElementById("js-answer-list");
list.addEventListener("click", (event) => {
  // add this 'if' block
  if (event.target.classList.contains("js-delete-button")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteAnswerItem(itemKey);
  }
});

//fce which choose random answer from answerItems array
function decideFnc() {
  const click = document.getElementById("result");
  let randomIndex = Math.floor(Math.random() * answerItems.length);
  result.innerHTML = answerItems[randomIndex].text.toUpperCase();
  click.classList.remove("hidden");
}

//event listens to question input
const questionInput = document.getElementById("js-question-input");
questionInput.addEventListener("input", handleChange);

//fce which controls state of the button
function handleChange() {
  //does answerItems array contain more than 2 value && question input is not empty?
  if (answerItems.length > 1 && questionInput.value !== "") {
    document.getElementById("button").classList.remove("button--disabled");
    document.getElementById("button").disabled = false;
  } else {
    document.getElementById("button").classList.add("button--disabled");
    document.getElementById("button").disabled = true;
  }
}
