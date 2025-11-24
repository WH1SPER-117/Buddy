import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import { getSender, getSenderFull } from "../Components/Config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import ScrollableChat from "./miscellaneous/ScrollableChat";
import ProfileModal from "./miscellaneous/ProfileModel";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { useNavigate } from "react-router-dom";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const toast = (options) => {
    const alert = document.createElement("div");
    alert.style.cssText = `
      background-color: ${options.status === "error" ? "#f8d7da" : "#d4edda"};
      color: ${options.status === "error" ? "#721c24" : "#155724"};
      padding: 15px;
      border-radius: 4px;
      border: 1px solid ${options.status === "error" ? "#f5c6cb" : "#c3e6cb"};
      position: fixed;
      bottom: 10px;
      right: 10px;
      z-index: 1050;
      display: flex;
  justify-content: space-between;
      align-items: center;
      opacity: 1;
      transition: opacity 0.5s;
    `;
    alert.innerHTML = `
      <span><strong>${options.title}</strong> ${options.description}</span>
      <button type="button" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">×</button>
    `;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), options.duration || 5000);
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const messageContent = newMessage;
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:5000/message",
          {
            content: messageContent,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  // Handle video call button click
  const handleVideoCall = async () => {
    const roomId = Date.now().toString();
    const callLink = `${window.location.origin}/room/${roomId}`;
    const messageContent = `Join my video call: ${callLink}`;

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/message",
        {
          content: messageContent,
          chatId: selectedChat,
        },
        config
      );
      socket.emit("new message", data);
      setMessages([...messages, data]);
      navigate(`/room/${roomId}`);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to initiate video call",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  return (
    <>
      {selectedChat ? (
        <>
          <div
            className="d-flex justify-content-between align-items-center w-100 pb-3 px-2"
            style={{ fontFamily: '"Work Sans", sans-serif' }}
          >
            <button
              className="btn btn-outline-secondary d-md-none"
              onClick={() => setSelectedChat("")}
            >
              <i className="fas fa-arrow-left"></i>
            </button>

            {messages &&
              (!selectedChat.isGroupChat ? (
                <div className="d-flex align-items-center">
                  <h5 className="mb-0">
                    {getSender(user, selectedChat.users)}
                  </h5>
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center w-100">
                  <h5 className="mb-0">
                    {selectedChat.chatName.toUpperCase()}
                  </h5>
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </div>
              ))}

            {/* Video Call Button */}
            <button
              className="btn btn-outline-secondary"
              onClick={handleVideoCall}
            >
              <i className="fas fa-video"></i>
            </button>
          </div>

          <div
            className="d-flex flex-column p-3 rounded-2 w-100 h-100"
            style={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}
          >
            <div
              className="flex-grow-1 mb-3 overflow-auto"
              style={{ maxHeight: "calc(100% - 120px)" }}
            >
              {loading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div
                    className="spinner-border text-primary"
                    style={{ width: "60px", height: "60px" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>
              )}
            </div>

            <div className="mt-3">
              {istyping && (
                <div className="mb-2">
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              )}
              <input
                type="text"
                className="form-control"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
                onKeyDown={sendMessage}
                style={{
                  backgroundColor: "#fff",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                }}
                required
              />
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center h-100 flex-column">
          <h4
            className="text-center pb-3"
            style={{ fontFamily: '"Work Sans", sans-serif' }}
          >
            Click on a user to start chatting
          </h4>
        </div>
      )}
    </>
  );
};
export default SingleChat;
