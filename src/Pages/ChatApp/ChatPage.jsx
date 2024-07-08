import React from 'react';
import SideBar from  "../../Components/SideBar/SideBar.jsx";
import MessageContainer from "../../Components/Messages/MessageContainer.jsx";

const ChatPage = () => {
  return (
    <div className="d-flex h-100 rounded overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <SideBar/>
      <MessageContainer />
    </div>
  )
}

export default ChatPage;