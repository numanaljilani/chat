"use client";
import { SendMsIcon, SmileFaceIcon } from "@/utils/icons";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import server from "../../constant"
import { toast } from "react-toastify";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";

const Piker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  {
    ssr: false,
  }
);

function MessageInput({ getData }: any) {
  const [inpValue, setInpValue] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  const [cookie , setCookie] = useCookies(["user"])

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
   const token =  await localStorage.getItem("token");
    const res = await fetch(`${server.server}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `${token}`
      },
      body: JSON.stringify({
        message : inpValue,
        token 
      }),
    });
    await getData();
    toast("message Sent")
    setInpValue("")

}
  function onEmojiClick(emojiObject: { emoji: string }) : any {
    setInpValue((prev) => prev + emojiObject.emoji);
  }
  return (
    <form className="mt-auto bottom-3 sticky w-full" onSubmit={handleSubmit}>
      <div className="w-full relative ">
        <input
          type="text"
          placeholder="message"
          className="input w-full pl-14 input-bordered"
          onChange={(e: any) => setInpValue(e.target.value)}
          value={inpValue}
        />
      </div>
      <button
        onClick={() => setShowEmoji(!showEmoji)}
        type="button"
        className="absolute top-1/2 left-5 -translate-y-1/2"
      >
        <MdEmojiEmotions />

      </button>
      <button
        type="submit"
        className="absolute top-1/2 ring-5 right-4 -translate-y-1/2"
      >
        {/* <SendMsIcon /> */}
        <IoSend />

      </button>
      {showEmoji && (
        <div  className="absolute bottom-full">
          <Piker onEmojiClick={onEmojiClick} />

        </div>
      )}
    </form>
  );
}

export default MessageInput;
