// custom prompt box with question
function CustomPrompt() {
  this.render = function (dialog, fctn) {
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const dialogoverlay = document.getElementById("dialogoverlay");
    const dialogbox = document.getElementById("dialogbox");
    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = winH + "px";
    dialogbox.style.left = winW / 2 - 560 * 0.5 + "px";
    dialogbox.style.top = "10rem";
    dialogbox.style.display = "block";
    document.getElementById("dialogboxbody").innerHTML = dialog;
    document.getElementById("dialogboxbody").innerHTML +=
      '<br><input id="prompt_value1" autocomplete="off" class="input" type="text" aria-label="Zadej novou odpoved" placeholder="Sem napiš odpověď" pattern="[a-zA-Z0-9 ]+" value=" ?"/>';
    document.getElementById("dialogboxfoot").innerHTML =
      "<button onclick=\"promot.ok('" +
      fctn +
      '\')" class="button">OK</button> <button onclick="promot.cancel()" class="button">Zrušit</button>';
  };
  this.cancel = function () {
    document.getElementById("dialogoverlay").style.display = "none";
    document.getElementById("dialogbox").style.display = "none";
  };
  this.ok = function (fctn) {
    const prompt_value1 = document.getElementById("prompt_value1").value;
    window[fctn](prompt_value1);
    document.getElementById("dialogoverlay").style.display = "none";
    document.getElementById("dialogbox").style.display = "none";
  };
}

const promot = new CustomPrompt();

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
  console.log(answerItem.text);
  renderAnswerItem(answerItem);
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
