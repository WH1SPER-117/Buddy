//queickfixeradmin123

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./Routes/UserRoutes");
const ServiceProviderRouter = require("./Routes/ServiceProviderRoutes");
const chats = require("./Data/data");
const AllUserRoutes = require("./Routes/AllUserRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");
const asyncHandler = require("express-async-handler");
const cors = require("cors");
const connectDB = require("./Config/db");
const app = express();

dotenv.config();

connectDB();

app.use(cors({ origin: "http://localhost:3000" })); // Adjust to your frontend URL

//Middleware
app.use(express.json());
app.use("/users", router);
app.use("/serviceProviders", ServiceProviderRouter);

app.use("/allUsers", AllUserRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.get("/chat", (req, res) => {
  res.send(chats);
});

app.get("/chat/:id", (req, res) => {
  console.log(req.params.id);
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});
//stock.io
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

//video calling
/*
const { ZegoUIKitPrebuilt } = require("@zegocloud/zego-uikit-prebuilt");

app.use(express.json());

app.post("/generate-token", (req, res) => {
  const { appID, userID, roomID } = req.body;
  try {
    const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      "fbf6788e69e54fa898d3123d6159aa6f", // Your serverSecret
      roomID,
      userID,
      Date.now().toString()
    );
    res.json({ token });
  } catch (error) {
    console.error("Token generation failed:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
*/
