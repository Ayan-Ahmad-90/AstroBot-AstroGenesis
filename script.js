document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  const toggle = document.getElementById("btn-mode");
  const chatBox = document.querySelector(".chat-box");
  const container = document.querySelector(".chat-container");

  // Default to light theme
  setTheme(false);

  // Enter key triggers send
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Toggle theme switch
  toggle.addEventListener("change", () => {
    const isDark = toggle.checked;
    setTheme(isDark);
  });
});

function setTheme(isDark) {
  const body = document.body;
  const container = document.querySelector(".chat-container");
  const chatBox = document.querySelector(".chat-box");

  // Remove previous classes
  body.classList.remove("light-theme", "night-theme");
  container.classList.remove("light", "night");
  chatBox.classList.remove("light", "night");

  // Apply new theme
  if (isDark) {
    body.classList.add("night-theme");
    container.classList.add("night");
    chatBox.classList.add("night");
  } else {
    body.classList.add("light-theme");
    container.classList.add("light");
    chatBox.classList.add("light");
  }

  // Also update past messages
  updateMessageTheme(isDark);
}

function updateMessageTheme(isDark) {
  document.querySelectorAll(".user-msg").forEach(msg => {
    msg.classList.remove("light", "night");
    msg.classList.add(isDark ? "night" : "light");
  });
  document.querySelectorAll(".bot-msg").forEach(msg => {
    msg.classList.remove("light", "night");
    msg.classList.add(isDark ? "night" : "light");
  });
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  appendMessage("user", message);
  input.value = "";

  try {
    const response = await fetch("http://127.0.0.1:5000/get-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    const reply = data.reply || "🤖 Sorry, I don't have an answer.";
    appendMessage("bot", reply);
  } catch (error) {
    console.error("Error:", error);
    appendMessage("bot", "⚠ Server error. Please try again.");
  }
}

function appendMessage(sender, text) {
  const chatBox = document.querySelector(".chat-box");
  const msg = document.createElement("div");
  msg.className = `${sender}-msg`;

  // Apply theme class to new message
  const isDark = document.getElementById("btn-mode").checked;
  msg.classList.add(isDark ? "night" : "light");

  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
