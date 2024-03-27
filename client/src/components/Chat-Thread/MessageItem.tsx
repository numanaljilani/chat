import React from 'react'

function MessageItem({user , message , time} : {user : boolean | undefined , message : string | undefined , time : any}) {
  const localTime = (time : any) : string =>{
    time.toLocaleString()
    const event = new Date(time);
    return `${event.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true })}`
  }
  return (
    <div className={`chat ${user ? "chat-end" : "chat-start"}`}>
        <div className={`chat-bubble ${user?"chat-bubble":"chat-bubble-primary"}`}>
              {message}
              <br/>
             
          <span className='text-xs'>{localTime(time) }</span>
          </div>
    </div>
  )
}

export default MessageItem