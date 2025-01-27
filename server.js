const { createServer } = require("node:http");
const { Server } = require("socket.io");

const port = process.env.PORT || 8080;

const httpServer = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Socket.IO server is running\n");
});

const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow requests from your Next.js app (Vercel URL)
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", ({ roomName, username }, callback) => {
    socket.join(roomName);
    console.log(`${username} joined room: ${roomName}`);
    // Send acknowledgment back to the client
    callback({ success: true, message: `Joined room: ${roomName}` });
  });

  socket.on("hello", (value) => {
    console.log("iwasclicked", value);
    io.emit("message", "hey");
  });

  socket.on("Groupmessage", (value) => {
    console.log("received", value);
    io.emit("Groupmessage", value);
  });

  socket.on("createTask", (value) => {
    console.log("received", value);
    io.emit("createTask", value);
  });

  socket.on("updateTask", (value) => {
    console.log("received", value);
    io.emit("updateTask", value);
  });

  socket.on("newNote", (value) => {
    console.log("received note", value);
    io.emit("newNote", value);
  });

  socket.on("updateNote", (value) => {
    console.log("received note", value);
    io.emit("updateNote", value);
  });

  socket.on("createIssue", (value) => {
    console.log("received Issue", value);
    io.emit("createIssue", value);
  });

  socket.on("updateIssue", (value) => {
    console.log("🎁🎁🎁🎁🎁🎁received Issue", value);
    io.emit("updateIssue", value);
  });

  socket.on("disconnect", (reason) => {
    console.log("User disconnected:", socket.id , reason);
  });
});

httpServer.listen(port, () => {
  console.log(`Socket.IO server running on port ${port}`);
});


