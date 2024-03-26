"use client"
import React, { useEffect, useState } from "react";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import { fetchMessages } from "@/lib/fetchers";

function Messages() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await fetchMessages(setData);
    setData(res.message);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='bg-image messages w-full min-h-screen z-0 hidden  md:flex md:flex-col flex-col'>
      {/* TOP BAR */}
      {/* <Topbar /> */}
      <div className={` max-w-sm md:max-w-3xl w-full mx-auto mt-auto mb-10 `}>

      {/* MESSAGE */}
      <MessagesList data ={data}/>
      {/* MESSAGES INPUT*/}
      <MessageInput getData={getData}/>
      </div>
    </div>
  );
}

export default Messages;
