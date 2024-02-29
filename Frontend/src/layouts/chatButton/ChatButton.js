import React, { useEffect, useState } from "react";
import "./chatButton.css"
import Api from "utils/Api";

const ChatButton = ({ emp_id }) => {

  const [email , setEmail] = useState({})


  const  fetchData = async()=>{
    const res = await Api.get(`Employee/GetEmployeeById?emp_id=${emp_id}`) 

    setEmail(res.data.email)
    const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(email)}`;
    window.open(teamsUrl, "_blank");
  }

  const openTeamsChat = () => {


    fetchData()

  };

  return <button onClick={openTeamsChat}>Chat on Teams</button>;
};

export default ChatButton;
