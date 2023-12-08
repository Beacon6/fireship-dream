import "./style.css";

const form = document.querySelector("form");
const utm_param = "?utm_source=fireship-dream&utm_medium=referral";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  showSpinner();

  const data = new FormData(form);

  const response = await fetch("http://localhost:8080/dream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  if (response.ok) {
    const photo = await response.json();

    const result = document.querySelector("#result");
    result.innerHTML = `<img src="${photo.photo}" width="512" />`;
    const attribution = document.querySelector("#attribution");
    attribution.innerHTML = `Photo by <a href="${photo.profileLink + utm_param}">${photo.profileName}</a>
      on <a href=${"https://unsplash.com/" + utm_param}>Unsplash</a>`;
  } else {
    const error = await response.text();
    alert(error);
    console.error(error);
  }

  hideSpinner();
});

function showSpinner() {
  const button = document.querySelector("button");
  button.disabled = true;
  button.innerHTML = 'Searching... <span class="spinner">🧠</span>';
}

function hideSpinner() {
  const button = document.querySelector("button");
  button.disabled = false;
  button.innerHTML = "Search";
}
