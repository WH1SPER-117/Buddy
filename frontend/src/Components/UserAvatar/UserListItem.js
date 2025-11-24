import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return React.createElement(
    "div",
    {
      onClick: handleFunction,
      className: "user-list-item d-flex align-items-center",
      style: {
        cursor: "pointer",
        backgroundColor: "#E8E8E8",
        color: "black",
        width: "100%",
        padding: "8px 12px",
        marginBottom: "8px",
        borderRadius: "12px",
      },
    },
    React.createElement("img", {
      src: user.pic,
      alt: user.name || user.username,
      className: "avatar me-2",
      style: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        cursor: "pointer",
      },
    }),
    React.createElement(
      "div",
      null,
      React.createElement("div", null, user.name || user.username)
    )
  );
};

export default UserListItem;
