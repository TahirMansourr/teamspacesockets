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
    try {
      socket.join(roomName);
      console.log(`${username} joined room: ${roomName}`);
      callback({ success: true, message: `Joined room: ${roomName}` });
      socket.to(roomName).emit("messageToRoom", {
        room: roomName,
        message: `${username} has joined the room`,
      });
    } catch (error) {
      console.error(`Error joining room ${roomName}:`, error);
      callback({ success: false, message: `Failed to join room: ${roomName}` });
    }
  });

  socket.on("messageToRoom", ({ room, message }) => {
    try {
      console.log(`Message to room ${room}:`, message);
      io.to(room).emit("messageToRoom", { message });
    } catch (error) {
      console.error(`Error sending message to room ${room}:`, error);
    }
  });

  socket.on("hello", (value) => {
    try {
      console.log("iwasclicked", value);
      io.emit("message", "hey");
    } catch (error) {
      console.error("Error handling hello event:", error);
    }
  });

  ////////////////////////////////////Messages
  socket.on("Groupmessage", ({ room, value }) => {
    try {
      console.log(`Group message in room ${room}:`, value);
      io.to(room).emit("Groupmessage", value);
    } catch (error) {
      console.error(`Error sending group message to room ${room}:`, error);
    }
  });

  ////////////////////////////////////Tasks
  socket.on("createTask", ({ room, value }) => {
    try {
      console.log(`Create task in room ${room}:`, value);
      io.to(room).emit("createTask", value);
    } catch (error) {
      console.error(`Error creating task in room ${room}:`, error);
    }
  });

  socket.on("updateTask", ({ room, value }) => {
    try {
      console.log(`Update task in room ${room}:`, value);
      io.to(room).emit("updateTask", value);
    } catch (error) {
      console.error(`Error updating task in room ${room}:`, error);
    }
  });

  socket.on('deleteTask', ({ room, value }) => {
    try {
      console.log(`Delete task in room ${room}:`, value);
      io.to(room).emit("deleteTask", value);
    } catch (error) {
      console.error(`Error deleting task in room ${room}:`, error);
    }
  });

  ////////////////////////////////////Notes
  socket.on("newNote", ({ room, note }) => {
    try {
      console.log(`New note in room ${room}:`, note);
      io.to(room).emit("newNote", note);
    } catch (error) {
      console.error(`Error creating new note in room ${room}:`, error);
    }
  });

  socket.on("updateNote", ({ room, note }) => {
    try {
      console.log(`Update note in room ${room}:`, note);
      io.to(room).emit("updateNote", note);
    } catch (error) {
      console.error(`Error updating note in room ${room}:`, error);
    }
  });

  socket.on('deleteNote', ({ room, noteId }) => {
    try {
      console.log(`Delete note in room ${room}:`, noteId);
      io.to(room).emit("deleteNote", noteId);
    } catch (error) {
      console.error(`Error deleting note in room ${room}:`, error);
    }
  });

  ////////////////////////////////////Issues
  socket.on("createIssue", ({ room, value }) => {
    try {
      console.log(`Create issue in room ${room}:`, value);
      io.to(room).emit("createIssue", value);
    } catch (error) {
      console.error(`Error creating issue in room ${room}:`, error);
    }
  });

  socket.on("updateIssue", ({ room, value }) => {
    try {
      console.log(`Update issue in room ${room}:`, value);
      io.to(room).emit("updateIssue", value);
    } catch (error) {
      console.error(`Error updating issue in room ${room}:`, error);
    }
  });

  socket.on('deleteIssue', ({ room, value }) => {
    try {
      console.log(`Delete issue in room ${room}:`, value);
      io.to(room).emit("deleteIssue", value);
    } catch (error) {
      console.error(`Error deleting issue in room ${room}:`, error);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("User disconnected:", socket.id , reason);
  });
});

httpServer.listen(port, () => {
  console.log(`Socket.IO server running on port ${port}`);
});