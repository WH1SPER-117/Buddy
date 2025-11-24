import React from "react";

const ProfileModel = ({ user, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return React.createElement(
    React.Fragment,
    null,
    children
      ? React.createElement(
          "span",
          { onClick: onOpen, style: { cursor: "pointer" } },
          children
        )
      : React.createElement(
          "button",
          {
            className: "btn btn-outline-primary d-flex align-items-center",
            onClick: onOpen,
          },
          React.createElement("i", { className: "fas fa-eye" })
        ),
    React.createElement(
      "div",
      {
        className: `modal fade ${isOpen ? "show" : ""}`,
        style: { display: isOpen ? "block" : "none" },
        tabIndex: "-1",
      },
      React.createElement(
        "div",
        { className: "modal-dialog modal-lg modal-dialog-centered" },
        React.createElement(
          "div",
          { className: "modal-content" },
          React.createElement(
            "div",
            { className: "modal-header" },
            React.createElement("h5", { className: "modal-title" }, user.name),
            React.createElement("button", {
              type: "button",
              className: "btn-close",
              onClick: onClose,
            })
          ),
          React.createElement(
            "div",
            { className: "modal-body" },
            React.createElement("img", {
              src: user.pic,
              alt: user.name,
              className: "rounded-circle",
              style: { width: "150px", height: "150px" },
            }),
            React.createElement("div", { className: "name" }, user.name),
            React.createElement("div", { className: "email" }, user.email)
          ),
          React.createElement(
            "div",
            { className: "modal-footer" },
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-primary",
                onClick: onClose,
              },
              "Close"
            )
          )
        )
      )
    ),
    isOpen &&
      React.createElement("div", {
        className: "modal-backdrop fade show",
        onClick: onClose,
      })
  );
};

export default ProfileModel;
