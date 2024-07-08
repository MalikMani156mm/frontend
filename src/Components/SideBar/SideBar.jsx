import React from 'react';
import SearchInput from  "../../Components/SideBar/SearchInput.jsx";
import Conversations from "../../Components/SideBar/Conversations.jsx";
import BackButton from "../../Components/SideBar/BackButton.jsx";

const SideBar = () => {
  return (
    <div className="border-end border-secondary p-3 d-flex flex-column">
      <SearchInput />
      <div className="my-2 border-top "></div>
      <Conversations />
      <BackButton />
    </div>
  )
}

export default SideBar