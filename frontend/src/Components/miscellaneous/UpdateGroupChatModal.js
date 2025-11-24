import React from "react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider.js";
import UserBadgeItem from "../UserAvatar/UserBadgeItem.js";
import UserListItem from "../UserAvatar/UserListItem.js";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const toast = (options) => {
    alert(`${options.title}: ${options.description}`);
  };

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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
        `/AllUsers/search?search=${query}`,
        config
      );
      console.log(data);
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

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
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
      const { data } = await axios.put(
        `/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
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
      const { data } = await axios.put(
        `/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "button",
      {
        className: "btn btn-outline-secondary d-flex",
        onClick: () => setIsOpen(true),
      },
      React.createElement("i", { className: "fas fa-eye" })
    ),
    React.createElement(
      "div",
      {
        className: `modal fade ${isOpen ? "show d-block" : ""}`,
        style: { display: isOpen ? "block" : "none" },
        tabIndex: "-1",
        role: "dialog",
      },
      React.createElement(
        "div",
        { className: "modal-dialog modal-dialog-centered" },
        React.createElement(
          "div",
          { className: "modal-content" },
          React.createElement(
            "div",
            {
              className: "modal-header",
              style: {
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "2.1875rem",
              },
            },
            React.createElement(
              "h5",
              { className: "modal-title w-100 text-center" },
              selectedChat.chatName
            ),
            React.createElement("button", {
              type: "button",
              className: "btn-close",
              onClick: () => setIsOpen(false),
              "aria-label": "Close",
            })
          ),
          React.createElement(
            "div",
            { className: "modal-body d-flex flex-column align-items-center" },
            React.createElement(
              "div",
              { className: "d-flex flex-wrap w-100 mb-3" },
              selectedChat.users.map((u) =>
                React.createElement(UserBadgeItem, {
                  key: u._id,
                  user: u,
                  admin: selectedChat.groupAdmin,
                  handleFunction: () => handleRemove(u),
                })
              )
            ),
            React.createElement(
              "div",
              { className: "d-flex w-100 mb-3" },
              React.createElement("input", {
                type: "text",
                className: "form-control me-1",
                placeholder: "Chat Name",
                value: groupChatName,
                onChange: (e) => setGroupChatName(e.target.value),
              }),
              React.createElement(
                "button",
                {
                  className: "btn btn-primary",
                  onClick: handleRename,
                  disabled: renameloading,
                },
                renameloading
                  ? React.createElement("span", {
                      className: "spinner-border spinner-border-sm",
                    })
                  : "Update"
              )
            ),
            React.createElement(
              "div",
              { className: "w-100" },
              React.createElement("input", {
                type: "text",
                className: "form-control mb-1",
                placeholder: "Add User to group",
                onChange: (e) => handleSearch(e.target.value),
              })
            ),
            loading
              ? React.createElement("div", { className: "spinner-border" })
              : searchResult.map((user) =>
                  React.createElement(UserListItem, {
                    key: user._id,
                    user: user,
                    handleFunction: () => handleAddUser(user),
                  })
                )
          ),
          React.createElement(
            "div",
            { className: "modal-footer" },
            React.createElement(
              "button",
              {
                className: "btn btn-danger",
                onClick: () => handleRemove(user),
              },
              "Leave Group"
            )
          )
        )
      )
    )
  );
};

export default UpdateGroupChatModal;
