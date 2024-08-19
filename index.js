const { spawn } = require("child_process");
const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Socket IO Use here

io.on("connection", (socket) => {
  socket.on("chat", (msg) => {
    io.emit("chat", socket.username + ": " + msg);
  });
  socket.on("username", (username) => {
    socket.username = username;
    io.emit(
      "username",
      '<span class="online">' + socket.username + " Joined" + "</span>"
    );
  });

  socket.on("disconnect", () => {
    io.emit(
      "username",
      '<span class="offline">' + socket.username + " Left" + "</span>"
    );
  });
});

http.listen(8080, () => {
  console.log("Server Runing on 8080 ");
});
