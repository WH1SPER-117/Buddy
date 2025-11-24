import React from "react";
import { useState } from "react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = {
    isOpen: false,
    onOpen: () =>
      document.getElementById("groupChatModal").classList.add("show"),
    onClose: () =>
      document.getElementById("groupChatModal").classList.remove("show"),
  }; // Simplified useDisclosure replacement
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      const alertDiv = document.createElement("div");
      alertDiv.className =
        "alert alert-warning alert-dismissible fade show position-fixed top-0 w-100";
      alertDiv.role = "alert";
      alertDiv.innerHTML = `
        <strong>User already added</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      document.body.appendChild(alertDiv);
      setTimeout(() => alertDiv.remove(), 5000);
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

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
        `http://localhost:5000/allUsers?search=${search}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      const alertDiv = document.createElement("div");
      alertDiv.className =
        "alert alert-danger alert-dismissible fade show position-fixed";
      alertDiv.role = "alert";
      alertDiv.innerHTML = `
        <strong>Error Occurred!</strong> Failed to Load the Search Results
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      document.body.appendChild(alertDiv);
      setTimeout(() => alertDiv.remove(), 5000);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      const alertDiv = document.createElement("div");
      alertDiv.className =
        "alert alert-warning alert-dismissible fade show position-fixed top-0 w-100";
      alertDiv.role = "alert";
      alertDiv.innerHTML = `
        <strong>Please fill all the fields</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      document.body.appendChild(alertDiv);
      setTimeout(() => alertDiv.remove(), 5000);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      const alertDiv = document.createElement("div");
      alertDiv.className =
        "alert alert-success alert-dismissible fade show position-fixed";
      alertDiv.role = "alert";
      alertDiv.innerHTML = `
        <strong>New Group Chat Created!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      document.body.appendChild(alertDiv);
      setTimeout(() => alertDiv.remove(), 5000);
    } catch (error) {
      const alertDiv = document.createElement("div");
      alertDiv.className =
        "alert alert-danger alert-dismissible fade show position-fixed";
      alertDiv.role = "alert";
      alertDiv.innerHTML = `
        <strong>Failed to Create the Chat!</strong> ${error.response.data}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      document.body.appendChild(alertDiv);
      setTimeout(() => alertDiv.remove(), 5000);
    }
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement("span", { onClick: onOpen }, children),
    React.createElement(
      "div",
      {
        className: `modal fade ${isOpen ? "show d-block" : ""}`,
        id: "groupChatModal",
        tabIndex: "-1",
        style: { backgroundColor: isOpen ? "rgba(0,0,0,0.5)" : "transparent" },
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
                fontSize: "35px",
                fontFamily: "'Work Sans', sans-serif",
                display: "flex",
                justifyContent: "center",
              },
            },
            React.createElement(
              "h5",
              { className: "modal-title" },
              "Create Group Chat"
            ),
            React.createElement("button", {
              type: "button",
              className: "btn-close",
              onClick: onClose,
            })
          ),
          React.createElement(
            "div",
            { className: "modal-body d-flex flex-column align-items-center" },
            React.createElement(
              "div",
              { className: "mb-3 w-100" },
              React.createElement("input", {
                type: "text",
                className: "form-control",
                placeholder: "Chat Name",
                onChange: (e) => setGroupChatName(e.target.value),
              })
            ),
            React.createElement(
              "div",
              { className: "mb-3 w-100" },
              React.createElement("input", {
                type: "text",
                className: "form-control",
                placeholder: "Add Users eg: John, Piyush, Jane",
                onChange: (e) => handleSearch(e.target.value),
              })
            ),
            React.createElement(
              "div",
              { className: "d-flex flex-wrap w-100" },
              selectedUsers.map((u) =>
                React.createElement(UserBadgeItem, {
                  key: u._id,
                  user: u,
                  handleFunction: () => handleDelete(u),
                })
              )
            ),
            loading
              ? React.createElement("div", null, "Loading...")
              : searchResult?.slice(0, 4).map((user) =>
                  React.createElement(UserListItem, {
                    key: user._id,
                    user: user,
                    handleFunction: () => handleGroup(user),
                  })
                )
          ),
          React.createElement(
            "div",
            { className: "modal-footer" },
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-primary",
                onClick: handleSubmit,
              },
              "Create Chat"
            )
          )
        )
      )
    )
  );
};

export default GroupChatModal;
