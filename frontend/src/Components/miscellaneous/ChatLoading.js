import React from "react";

function ChatLoading() {
  return React.createElement(
    "div",
    { className: "d-flex flex-column gap-2" },
    Array.from({ length: 12 }).map((_, index) =>
      React.createElement("div", {
        key: index,
        className: "skeleton",
        style: { height: "45px" },
      })
    )
  );
}

export default ChatLoading;
