import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../Config/ChatLogics.js";
import ChatLoading from "./ChatLoading.js";
import GroupChatModal from "./GroupChatModal.js";
import { ChatState } from "../../Context/ChatProvider.js";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = (options) => {
    // Simulate Chakra UI toast with Bootstrap alert
    const alert = document.createElement("div");
    alert.className = `alert alert-${options.status} alert-dismissible fade show position-fixed`;
    alert.style.bottom = "10px";
    alert.style.left = "10px";
    alert.style.zIndex = "1050";
    alert.innerHTML = `
      <strong>${options.title}</strong> ${options.description}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), options.duration || 5000);
  };

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:5000/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  if (!user) {
    return null;
  }

  return React.createElement(
    "div",
    {
      className: `d-flex flex-column align-items-center p-3 bg-white border rounded-3 ${
        selectedChat ? "d-none d-md-flex" : "d-flex"
      }`,
      style: { width: "100%", maxWidth: "31%" },
    },
    React.createElement(
      "div",
      {
        className:
          "d-flex justify-content-between align-items-center w-100 pb-3 px-3",
      },
      React.createElement(
        "h4",
        {
          className: "mb-0",
          style: {
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "1.875rem",
          },
        },
        "My Chats"
      ) /*,
      React.createElement(
        GroupChatModal,
        null,
        React.createElement(
          "button",
          {
            className: "btn btn-outline-primary d-flex align-items-center",
            style: { fontSize: "17px" },
          },
          "New Group Chat",
          React.createElement("i", { className: "fas fa-plus ms-1" })
        )
      )*/
    ),
    React.createElement(
      "div",
      {
        className: "d-flex flex-column p-3 w-100 h-100 rounded-3",
        style: { backgroundColor: "#F8F8F8", overflowY: "hidden" },
      },
      chats
        ? React.createElement(
            "div",
            { className: "overflow-y-scroll" },
            chats.map((chat) =>
              React.createElement(
                "div",
                {
                  key: chat._id,
                  className: `p-2 mb-2 rounded-3 cursor-pointer ${
                    selectedChat === chat ? "bg-teal text-white" : "bg-gray-200"
                  }`,
                  onClick: () => setSelectedChat(chat),
                },
                React.createElement(
                  "div",
                  {
                    className: `fw-bold ${
                      selectedChat === chat ? "text-white" : "text-dark"
                    }`,
                  },
                  !chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName
                ),
                chat.latestMessage &&
                  React.createElement(
                    "small",
                    {
                      className:
                        selectedChat === chat ? "text-white" : "text-muted",
                    },
                    React.createElement(
                      "b",
                      null,
                      chat.latestMessage.sender.name,
                      ": "
                    ),
                    chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content
                  )
              )
            )
          )
        : React.createElement(ChatLoading, null)
    )
  );
};

export default MyChats;
