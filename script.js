const socket = io("http://localhost:5000");

// Login respond
socket.on("loginres", data => {
  console.log(data === "Correct" ? "Correct" : "Incorrect");
});

// Register respond
socket.on("registerres", data => {
  console.log(data === "ok" ? "Succefull" : "Failed");
});

function login() {
  const creditilians = {
    user: document.getElementById("userBox").value,
    pass: document.getElementById("passBox").value
  };
  socket.emit("login", creditilians);
}

function register() {
  const creditilians = {
    user: document.getElementById("userBox").value,
    pass: document.getElementById("passBox").value
  };
  socket.emit("register", creditilians);
}
