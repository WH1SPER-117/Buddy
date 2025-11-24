import React from "react";
import { ChatState } from "../../Context/ChatProvider.js";
import SingleChat from "../SingelChat.js";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return React.createElement(
    "div",
    {
      className: `d-flex flex-column align-items-center p-3 bg-white border rounded-3 h-100 ${
        selectedChat ? "d-flex" : "d-none d-sm-flex"
      }`,
      style: {
        width: "100%",
        maxWidth: "68%",
        height: "91.5vh",
        overflow: "hidden",
      },
    },
    React.createElement(SingleChat, {
      fetchAgain: fetchAgain,
      setFetchAgain: setFetchAgain,
    })
  );
};

export default ChatBox;
