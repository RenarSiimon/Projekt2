const addBtn = document.querySelector('#add-btn');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

const DB_URL = "https://tinkr.tech/sdb/todolist";

function createTodo(text, completed, id) {
  var li = document.createElement("li");

  if (completed === true) {
    li.classList.add("completed");
  }

  var span = document.createElement("span");
  span.textContent = text;

  var doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";

  doneBtn.onclick = async function () {
    li.classList.toggle("completed");

    await fetch(`${DB_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: li.classList.contains("completed")
      })
    });
  };

  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = async function () {
    await fetch(`${DB_URL}/${id}`, {
      method: "DELETE"
    });

    list.removeChild(li);
  };

  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(deleteBtn);

  return li;
}

async function loadTodo() {
  const response = await fetch(DB_URL);
  const todos = await response.json();

  for (let pos = 0; pos < todos.length; pos++) {
    const item = createTodo(todos[pos].text, todos[pos].completed, todos[pos].id);
    list.appendChild(item);
  }
}

addBtn.onclick = async function () {
  var text = input.value.trim();

  if (text === "") return;

  const response = await fetch(DB_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: text,
      completed: false
    })
  });

  const data = await response.json();

  const newItem = createTodo(data.text, data.completed, data.id);
  list.appendChild(newItem);

  input.value = "";
};

loadTodo();