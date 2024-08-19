$(document).ready(function () {
  let socket = io();
  $("#chatapp").submit(function (event) {
    event.preventDefault();
    let msg = $("#chatMessage").val();
    socket.emit("chat", msg);

    $("#chatMessage").val("");
  });
  socket.on("chat", (msg) => {
    $("#message").append($("<li>").html(msg));
  });
  let username = prompt("Tell your username");
  socket.emit("username", username);
  socket.on("username", (username) => {
    $("#message").append($("<li>").html(username));
  });

  // $("#message").append($("<li>").html(username));
});
