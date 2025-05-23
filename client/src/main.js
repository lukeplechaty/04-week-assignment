const url = "https://guestbook-server-4ymb.onrender.com";
const form = document.getElementById("form-message");
const messages = document.getElementById("messages");
let ids = [];

setMessage(false);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const values = Object.fromEntries(data);
  fetch(url + "/addMsg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  form.reset();
});

async function getData(link) {
  const response = await fetch(url + link);
  const data = await response.json();
  return data;
}

async function setMessage(newMessage) {
  const data = await getData("/getMsg");

  data.forEach((item) => {
    if (!ids[item.id]) {
      ids[item.id] = true;
      const contaner = document.createElement("div");
      const messageHost = document.createElement("p");
      const messageGuest = document.createElement("p");
      const message = document.createElement("p");

      messageHost.textContent = `To ${item.hosts_name}`;
      messageGuest.textContent = `From ${item.guest_name}`;
      message.textContent = `${item.massage}`;

      contaner.className = "contaner";
      messageHost.className = "message-host";
      messageGuest.className = "message-guest";
      message.className = "message";

      contaner.appendChild(messageHost);
      contaner.appendChild(messageGuest);
      contaner.appendChild(message);
      messages.appendChild(contaner);
    }
  });
}

setInterval(() => {
  setMessage(true);
}, 1000);
