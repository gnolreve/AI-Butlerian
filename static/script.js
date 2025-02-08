document.getElementById("send-button").onclick = async function() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    
    addMessage(userInput, "user");
    document.getElementById("user-input").value = ""; 

    
    const messagesDiv = document.getElementById("messages");
    const botTypingDiv = document.createElement("div");
    botTypingDiv.className = "message bot typing"; 
    const typingText = document.createElement("div");
    typingText.className = "typing-text";
    typingText.textContent = "Bot is typing...";
    botTypingDiv.appendChild(typingText);
    messagesDiv.appendChild(botTypingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; 

    
    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    const botMessage = data.response;

    
    setTimeout(() => {
        botTypingDiv.remove(); 
        addMessage(botMessage, "bot"); 
    }, 1500); 
};

function addMessage(text, sender) {
    const messagesDiv = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.className = `message ${sender}`;

    
    const messageTextElement = document.createElement("div");
    messageTextElement.className = "message-text";
    messageTextElement.textContent = text;

    
    const timestampElement = document.createElement("div");
    timestampElement.className = "timestamp";
    timestampElement.textContent = new Date().toLocaleTimeString();

    
    messageElement.appendChild(messageTextElement);
    messageElement.appendChild(timestampElement);

    
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; 
}