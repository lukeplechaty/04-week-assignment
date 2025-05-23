const url = "https://guestbook-server-4ymb.onrender.com";
// const url = "http://localhost:3000";
const form = document.getElementById("form-message");
const messages = document.getElementById("messages");
let ids = [];
setMessage();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const values = Object.fromEntries(data);
  addData(values);
  form.reset();
});

async function getData() {
  const response = await fetch(url + "/getMsg");
  const data = await response.json();
  return data;
}
async function addData(values) {
  const response = await fetch(url + "/addMsg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const data = await response.json();
  ids.push(data);
}
function updateData(values) {
  fetch(`${url}/updateMsg/${values.id}/likes/${values.likes}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
}
function deleteData(values) {
  fetch(`${url}/deleteMsg/${values.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

async function setMessage() {
  const data = await getData();
  deleteMessages();
  data.forEach((item) => {
    const contaner = document.createElement("div");
    const messageHost = document.createElement("p");
    const messageGuest = document.createElement("p");
    const message = document.createElement("p");
    const btnLike = document.createElement("button");
    const btnDel = document.createElement("button");

    messageHost.textContent = `To ${item.hosts_name}`;
    messageGuest.textContent = `From ${item.guest_name}`;
    message.textContent = `${item.massage}`;
    btnLike.textContent = `Likes ${item.likes}`;
    btnDel.textContent = `Delete`;

    contaner.className = "contaner";
    messageHost.className = "message-host";
    messageGuest.className = "message-guest";
    message.className = "message";
    btnLike.className = "btn-like";
    btnDel.className = "btn-delete";

    btnLike.addEventListener("click", () => {
      item.likes++;
      updateData(item);
    });
    btnDel.addEventListener("click", () => {
      deleteData(item);
    });

    contaner.appendChild(messageHost);
    contaner.appendChild(messageGuest);
    contaner.appendChild(message);
    contaner.appendChild(btnLike);
    if (
      ids.find((o) => {
        return o[0].id === item.id;
      })
    )
      contaner.appendChild(btnDel);
    const firstChild = messages.firstChild;
    messages.insertBefore(contaner, firstChild);
  });
}

function deleteMessages() {
  while (messages.firstChild) messages.removeChild(messages.lastChild);
}

setInterval(() => {
  setMessage();
}, 1000);
