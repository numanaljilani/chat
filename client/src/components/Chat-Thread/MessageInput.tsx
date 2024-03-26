"use client";
import { SendMsIcon, SmileFaceIcon } from "@/utils/icons";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

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
    const res = await fetch("/message", {
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
    setInpValue("")

}
  function onEmojiClick(emojiObject: { emoji: string }) {
    setInpValue((prev) => prev + emojiObject.emoji);
  }
  return (
    <form className="mt-auto relative" onSubmit={handleSubmit}>
      <div className="w-full relative ">
        <input
          type="text"
          placeholder="message"
          className="input w-full pl-14 input-bordered"
          onChange={(e: any) => setInpValue(e.target.value)}
        />
      </div>
      <button
        onClick={() => setShowEmoji(!showEmoji)}
        type="button"
        className="absolute top-1/2 left-5 -translate-y-1/2"
      >
        <SmileFaceIcon />
      </button>
      <button
        type="submit"
        className="absolute top-1/2 ring-5 right-4 -translate-y-1/2"
      >
        <SendMsIcon />
      </button>
      {showEmoji && (
        <div className="absolute bottom-full">
          <Piker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </form>
  );
}

export default MessageInput;
