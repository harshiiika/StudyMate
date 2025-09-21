function chatbot(input) {
    let output = ""; 

    if(input.includes("hi")) {
        output = "Hello, Nice To Meet You!!";
    }
    else if (input.includes("how are you?")) {
        output = "I'm Fine. thank you for Asking :)";
    }
    else if (input.includes("what is your name?")) {
        output = "I'm Toodle. I'm Your ChatBot.";
    }
    else if (input.includes("what can you do?")) {
        output = "I can talk with you and answer simple questions";
    }
    else if (input.includes("tell me a tongue twister")) {
        output = "Betty bought a of butter to make the bitter butter better.";
    }
    else{
        output = "Sorry, I don't understand that.:("
    }
    return output;
}

function displayUserMessage(message) {
    let chat = document.getElementById("chat");
    let userMessage = document.createElement("div");
    userMessage.classList.add("message");
    userMessage.classList.add("user");
    let userpfp = document.createElement("div");
    userpfp.classList.add("pfp");
    let userText = document.createElement("div");
    userText.classList.add('text');
    userText.innerHTML = message;
    userMessage.appendChild(userpfp);
    userMessage.appendChild(userText);
    chat.appendChild(userMessage); 
}
function displayBotMessage(message) {
    let chat = document.getElementById("chat");
    let botMessage = document.createElement("div");
    botMessage.classList.add("message");
    botMessage.classList.add("bot");
    let botpfp = document.createElement("div");
    botpfp.classList.add("pfp");
    let botText = document.createElement("div");
    botText.classList.add('text');
    botText.innerHTML = message;
    botMessage.appendChild(botpfp);
    botMessage.appendChild(botText);
    chat.appendChild(botMessage); 
}

function sendMessage() {
    let input = document.getElementById("input").value;
    if (input) {
        displayUserMessage(input);
        let output = chatbot(input);
        setTimeout(function() {
            displayBotMessage(output);
        }, 1000);
        document.getElementById("input").value = "";
    }
}

document.getElementById("button").addEventListener("click", sendMessage);