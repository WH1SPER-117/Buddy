import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../Config/ChatLogics.js";
import { ChatState } from "../../Context/ChatProvider.js";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Function to detect URLs and make them clickable
const renderMessageContent = (content) => {
  const videoCallRegex = /\[video_call\](.*?)\[\/video_call\]/;
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // If it's a video call message
  const match = content.match(videoCallRegex);
  if (match) {
    const link = match[1];
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "6px 12px",
          background: "#0d6efd",
          color: "#fff",
          borderRadius: "4px",
          textDecoration: "none",
          fontWeight: "500",
        }}
      >
        Join Video Call
      </a>
    );
  }

  // Normal URL rendering
  return content.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1e90ff", textDecoration: "underline" }}
      >
        {part}
      </a>
    ) : (
      part
    )
  );
};


  return React.createElement(
    ScrollableFeed,
    null,
    messages && messages.length > 0
      ? messages.map((m, i) => {
          if (!m || !m._id || !m.content || !m.sender || !m.sender._id) {
            console.warn("Invalid message object:", m);
            return null;
          }

          return React.createElement(
            "div",
            {
              key: m._id,
              className: `d-flex mb-2 ${
                m.sender._id === user._id
                  ? "justify-content-end"
                  : "justify-content-start"
              }`,
            },
            React.createElement(
              "div",
              {
                className: `d-flex flex-column ${
                  m.sender._id === user._id
                    ? "align-items-end"
                    : "align-items-start"
                }`,
              },
              (isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) &&
                React.createElement("img", {
                  src: m.sender.pic,
                  alt: m.sender.name,
                  className: "rounded-circle me-1 mt-2",
                  style: { width: "30px", height: "30px", cursor: "pointer" },
                  title: m.sender.name,
                }),
              React.createElement(
                "div",
                {
                  className: "rounded-3 p-2",
                  style: {
                    backgroundColor:  m.sender._id === user._id
                      ? "#BEE3F8"
                      : "#B9F5D0",
                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                    marginTop: isSameUser(messages, m, i) ? 3 : 10,
                    maxWidth: "75%",
                  },
                },
                React.createElement(
                  "span",
                  null,
                  `${m.sender.name || "Unknown"}: `,
                  renderMessageContent(m.content)
                ),
                React.createElement(
                  "small",
                  {
                    className: "text-muted d-block mt-1",
                    style: { fontSize: "0.75rem" },
                  },
                  formatTime(m.createdAt)
                )
              )
            )
          );
        })
      : React.createElement("div", null, "No messages to display")
  );
};

export default ScrollableChat;
