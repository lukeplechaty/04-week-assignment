const url = "http://localhost:3000";
const form = document.getElementById("form-message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const values = Object.fromEntries(data);
  fetch(url + "/addMsg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
});
