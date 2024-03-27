"use client";
import React from "react";
import MessageItem from "./MessageItem";
import { ToastContainer } from "react-toastify";

function MessagesList({data } : any) {

  return (
    <div className="w-full   overflow-auto bottom-6 mb-10 flex flex-col no-scrollbar">
      {data
        ? data?.reverse()?.map((item: any) => (
            <div key={item._id}>
              <MessageItem
                user={item.sender !== "me" ? true : false}
                message={item.message}
                time ={item.createdAt}
              />
            </div>
          ))
        : ""}

    </div>
  );
}

export default MessagesList;
