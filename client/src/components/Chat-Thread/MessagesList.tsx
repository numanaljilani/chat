"use client";
import React from "react";
import MessageItem from "./MessageItem";

function MessagesList({data } : any) {
console.log(data)

  return (
    <div className="w-full mb-10 flex flex-col max-h-[75vg] no-scrollbar">
      {data
        ? data?.map((item: any, i: number) => (
            <div key={i}>
              <MessageItem
                user={item.sender !== "me" ? true : false}
                message={item.message}
              />
            </div>
          ))
        : ""}
    </div>
  );
}

export default MessagesList;
