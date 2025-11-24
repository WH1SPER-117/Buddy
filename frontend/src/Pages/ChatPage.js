import React from "react";
import axios from "axios";

import { ChatState } from "../Context/ChatProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SideDrawer from "../Components/miscellaneous/SideDrawer";
import MyChats from "../Components/miscellaneous/MyChats";
import ChatBox from "../Components/miscellaneous/ChatBox";

function ChatPage() {
  const { user } = ChatState();

  return (
    <div>
      {user && <SideDrawer />}

      <div
        className="d-flex justify-content-between w-100 p-2"
        style={{ height: "91vh", backgroundColor: "#E8E8E8" }}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </div>
    </div>
  );
}

export default ChatPage;
