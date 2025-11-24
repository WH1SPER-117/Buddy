import React from "react";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return React.createElement(
    "span",
    {
      className: "badge bg-purple text-white rounded-pill m-1 mb-2 px-2 py-1",
      style: { fontSize: "12px", cursor: "pointer" },
      onClick: handleFunction,
    },
    user.name,
    admin === user._id ? React.createElement("span", null, " (Admin)") : null,
    React.createElement("i", { className: "bi bi-x ms-1" })
  );
};

export default UserBadgeItem;
