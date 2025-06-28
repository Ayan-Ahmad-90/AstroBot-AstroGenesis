function sendMessage() {
    const input = document.getElementById("userInput");
    const msg = input.value.trim();
    if (!msg) return;

  // Show user message
    const chatBox = document.querySelector(".chat-box");
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerText = msg;
    chatBox.appendChild(userMsg);

  // Clear input
    input.value = "";

  // Show temporary bot message
    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.innerText = "⏳ Loading...";
    chatBox.appendChild(botMsg);

  // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

  // Fetch response from backend
    fetch("http://localhost:5000/get-response", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: msg })
    })
    .then(response => response.json())
    .then(data => {
    botMsg.innerText = data.reply;
    })
    .catch(err => {
    botMsg.innerText = "⚠️ Error connecting to server.";
    console.error(err);
    });
}
