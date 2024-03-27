import Messages from '@/components/Chat-Thread/Messages'
import React from 'react'

function page() {
  return (
    <div className='min-h-screen w-full'>
      <div className='w-full border-2'>
        {/* side bar */}
        {/* <SideBar/> */}
        {/* Message */}
        <Messages/>
      </div>
    </div>
  )
}

export default page