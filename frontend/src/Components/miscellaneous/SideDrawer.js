import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading.js";
import ProfileModal from "./ProfileModel.js";
import { getSender } from "../Config/ChatLogics.js";
import UserListItem from "../UserAvatar/UserListItem.js";
import { ChatState } from "../../Context/ChatProvider.js";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = (options) => {
    // Simulate Chakra UI toast with Bootstrap alert
    const alert = document.createElement("div");
    alert.className = `alert alert-${options.status} alert-dismissible fade show position-fixed`;
    alert.style[options.position.includes("top") ? "top" : "bottom"] = "10px";
    alert.style[options.position.includes("left") ? "left" : "right"] = "10px";
    alert.style.zIndex = "1050";
    alert.innerHTML = `
      <strong>${options.title}</strong> ${options.description}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), options.duration || 5000);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const isOpen = drawerOpen;
  const onOpen = () => setDrawerOpen(true);
  const onClose = () => setDrawerOpen(false);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/allUsers?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      {
        className:
          "d-flex justify-content-between align-items-center bg-white w-100 p-2 border border-5",
      },
      React.createElement(
        "div",
        { className: "btn-group" },
        React.createElement(
          "button",
          {
            className: "btn btn-outline-secondary d-flex align-items-center",
            onClick: onOpen,
            title: "Search Users to chat",
          },
          React.createElement("i", { className: "fas fa-search me-2" }),
          React.createElement(
            "span",
            { className: "d-none d-md-inline" },
            "Search User"
          )
        )
      ),
      React.createElement(
        "h3",
        {
          className: "mb-0",
          style: { fontFamily: "'Work Sans', sans-serif", fontSize: "2rem" },
        },
        "Quick Chat"
      ),
      React.createElement(
        "div",
        { className: "d-flex align-items-center" },
        React.createElement(
          "div",
          { className: "dropdown me-2 position-relative" },
          React.createElement(
            "button",
            {
              className: "btn btn-outline-secondary dropdown-toggle",
              type: "button",
              id: "notificationDropdown",
              "data-bs-toggle": "dropdown",
              "aria-expanded": "false",
            },
            React.createElement("i", { className: "fas fa-bell fs-4" })
          ),
          notification.length > 0 &&
            React.createElement(
              "span",
              {
                className:
                  "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger animate__animated animate__pulse",
                style: { animationIterationCount: "infinite" },
              },
              notification.length
            ),
          React.createElement(
            "ul",
            {
              className: "dropdown-menu",
              "aria-labelledby": "notificationDropdown",
              style: { paddingLeft: "0.5rem" },
            },
            !notification.length
              ? React.createElement(
                  "li",
                  null,
                  React.createElement(
                    "span",
                    { className: "dropdown-item" },
                    "No New Messages"
                  )
                )
              : notification.map((notif) =>
                  React.createElement(
                    "li",
                    { key: notif._id },
                    React.createElement(
                      "a",
                      {
                        className: "dropdown-item",
                        href: "#",
                        onClick: () => {
                          setSelectedChat(notif.chat);
                          setNotification(
                            notification.filter((n) => n !== notif)
                          );
                        },
                      },
                      notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(
                            user,
                            notif.chat.users
                          )}`
                    )
                  )
                )
          )
        ),
        React.createElement(
          "div",
          { className: "dropdown" },
          React.createElement(
            "button",
            {
              className:
                "btn btn-outline-secondary dropdown-toggle d-flex align-items-center",
              type: "button",
              id: "profileDropdown",
              "data-bs-toggle": "dropdown",
              "aria-expanded": "false",
            },
            React.createElement("img", {
              src: user.pic,
              alt: user.name,
              className: "rounded-circle me-2",
              style: { width: "30px", height: "30px", cursor: "pointer" },
            }),
            React.createElement("i", { className: "fas fa-chevron-down" })
          ),
          React.createElement(
            "ul",
            {
              className: "dropdown-menu",
              "aria-labelledby": "profileDropdown",
            },
            React.createElement(
              ProfileModal,
              { user: user },
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { className: "dropdown-item", href: "#" },
                  "My Profile"
                )
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement("hr", { className: "dropdown-divider" })
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                {
                  className: "dropdown-item",
                  href: "#",
                  onClick: logoutHandler,
                },
                "Logout"
              )
            )
          )
        )
      )
    ),
    React.createElement(
      "div",
      {
        className: `offcanvas offcanvas-start ${isOpen ? "show" : ""}`,
        style: { visibility: isOpen ? "visible" : "hidden", width: "350px" },
      },
      React.createElement(
        "div",
        { className: "offcanvas-header border-bottom" },
        React.createElement(
          "h5",
          { className: "offcanvas-title" },
          "Search Users"
        ),
        React.createElement("button", {
          type: "button",
          className: "btn-close",
          onClick: onClose,
          "aria-label": "Close",
        })
      ),
      React.createElement(
        "div",
        { className: "offcanvas-body" },
        React.createElement(
          "div",
          { className: "d-flex mb-2" },
          React.createElement("input", {
            type: "text",
            className: "form-control me-2",
            placeholder: "Search by name or email",
            value: search,
            onChange: (e) => setSearch(e.target.value),
          }),
          React.createElement(
            "button",
            { className: "btn btn-outline-primary", onClick: handleSearch },
            "Go"
          )
        ),
        loading
          ? React.createElement(ChatLoading, null)
          : searchResult.map((user) =>
              React.createElement(UserListItem, {
                key: user._id,
                user: user,
                handleFunction: () => accessChat(user._id),
              })
            ),
        loadingChat &&
          React.createElement(
            "div",
            { className: "d-flex justify-content-end mt-2" },
            React.createElement("div", { className: "spinner-border" })
          )
      )
    )
  );
}

export default SideDrawer;
