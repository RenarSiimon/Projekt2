const addBtn = document.querySelector('#add-btn');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

function saveTodos() {
  var todos = [];
  var items = list.getElementsByTagName("li");

  for (var i = 0; i < items.length; i++) {
    var span = items[i].getElementsByTagName("span")[0];

    var todo = {
      text: span.textContent,
      completed: items[i].classList.contains("completed")
    };

    todos.push(todo);
  }

  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodo(text, completed) {
  var li = document.createElement("li");

  if (completed === true) {
    li.classList.add("completed");
  }

  var span = document.createElement("span");
  span.textContent = text;

  var doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";

  doneBtn.onclick = function () {
    li.classList.toggle("completed");
    saveTodos();
  };

  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = function () {
    list.removeChild(li);
    saveTodos();
  };

  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(deleteBtn);

  return li;
}

function loadTodos() {
  var saved = localStorage.getItem("todos");

  if (saved !== null) {
    var todos = JSON.parse(saved);

    for (var i = 0; i < todos.length; i++) {
      var item = createTodo(todos[i].text, todos[i].completed);
      list.appendChild(item);
    }
  }
}

addBtn.onclick = function () {
  var text = input.value.trim();

  if (text === "") {
    return;
  }

  var newItem = createTodo(text, false);
  list.appendChild(newItem);

  saveTodos();
  input.value = "";
};

loadTodos();