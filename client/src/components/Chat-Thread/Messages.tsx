"use client";
import React, { useEffect, useRef, useState } from "react";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import { fetchMessages } from "@/lib/fetchers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from 'react-toastify';

function Messages() {
  const [data, setData] = useState([]);

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  };

  const getData = async () => {
    const res = await fetchMessages(setData);
    setData(res.message);
    scrollToBottom();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-image messages w-full min-h-screen z-0  overflow-auto  md:flex md:flex-col flex-col ">
      {/* TOP BAR */}
      {/* <Topbar /> */}
      <div
        id="scrollableDiv"
        ref={scrollableDivRef}
        className={`  h-[90vh] relative max-w-sm md:max-w-3xl w-full my-4  no-scrollbar overflow-auto mb-10 bottom-1 mx-auto `}
      >
        {/* MESSAGE */}
        <MessagesList data={data} />
        {/* MESSAGES INPUT*/}
        <MessageInput getData={getData} />
      </div>

      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      /> */}
    </div>
  );
}

export default Messages;
