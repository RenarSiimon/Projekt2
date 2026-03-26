const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");

const DB = "https://tinkr.tech/sdb/todolist";

function createTodo(text, completed, id) {
  const li = document.createElement("li");

  if (completed) {
    li.classList.add("completed");
  }

  li.dataset.id = id;

  const span = document.createElement("span");
  span.textContent = text;

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";

  doneBtn.onclick = async function () {
    const newCompleted = !li.classList.contains("completed");

    const response = await fetch(`${DB}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: newCompleted
      })
    });
    const updated = await response.json();

    if (updated.completed) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = async function () {
    await fetch(`${DB}/${id}`, {
      method: "DELETE"
    });

    li.remove();
  };

  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(deleteBtn);

  return li;
}
async function loadTodo() {
  const response = await fetch(DB);
  const todos = await response.json();

  list.innerHTML = "";
}
addBtn.onclick = async function () {
  const text = input.value.trim();
  if (!text) return;
  const response = await fetch(DB, {
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