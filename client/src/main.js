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
function updateData() {
  fetch(url + "/updateMsg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "",
  });
}
function deleteData(values) {
  fetch(url + "/deleteMsg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
}

async function setMessage(newMessage) {
  const data = await getData();

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

      btnLike.addEventListener("click", () => {
        updateData();
      });
      btnDel.addEventListener("click", () => {
        deleteData(`id:${item.id}`);
      });

      contaner.appendChild(messageHost);
      contaner.appendChild(messageGuest);
      contaner.appendChild(message);
      contaner.appendChild(btnLike);
      if (newMessage) contaner.appendChild(btnDel);
      messages.appendChild(contaner);
    }
  });
}

setInterval(() => {
  setMessage(true);
}, 1000);
