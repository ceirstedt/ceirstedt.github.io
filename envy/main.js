document.addEventListener("DOMContentLoaded", function () {
    let textBox = document.querySelector("#textbox");
    
    let message = "";

    fetch("./loveNotes.json")
      .then((response) => response.json())
      .then((data) => {
        let messageList = data["messages"];
        message = messageList[Math.floor(Math.random() * messageList.length)];
        console.log("message:", message);
        textBox.innerHTML = "<h2 class=\"textBox\"> " + message + " </h2>";
      })
      .catch((error) => {
        console.error("Error fetching JSON file:", error);
    });

  });
  