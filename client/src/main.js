const url = "https://guestbook-server-4ymb.onrender.com";
const form = document.getElementById("form-message");
const messages = document.getElementById("messages");
let ids = [];

setMessage(false);

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
function addData(values) {
  fetch(url + "/addMsg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
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

async function setMessage(newMessage) {
  const data = await getData();
  data.sort((a, b) => {
    return a.id > b.id;
  });
  console.log(data);
  data.forEach((item) => {
    if (!ids[item.id]) {
      ids[item.id] = true;
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
        btnLike.textContent = `Likes ${item.likes}`;
        updateData(item);
      });
      btnDel.addEventListener("click", () => {
        deleteData(item);
        messages.removeChild(contaner);
      });

      contaner.appendChild(messageHost);
      contaner.appendChild(messageGuest);
      contaner.appendChild(message);
      contaner.appendChild(btnLike);
      if (newMessage) contaner.appendChild(btnDel);
      const firstChild = messages.firstChild;
      messages.insertBefore(contaner, firstChild);
    }
  });
}

setInterval(() => {
  setMessage(true);
}, 1000);
