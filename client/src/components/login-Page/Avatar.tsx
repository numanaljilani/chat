"use client"

import Image from 'next/image'
import React from 'react'

function Avatar({avatarId,setAvatarId} : any) {
  return (
    <div onClick={() => setAvatarId((Math.random() * 20).toFixed())} className='mx-auto mb-5 cursor-pointer tooltip' data-tip="click to regenerate avatar">
        <div className='w-24 ring ring-primary overflow-hidden rounded-full ring-offset-base-100'>
            <Image src={`https://robohash.org/${avatarId}.png`} width={256} height={256} alt='avatar'/>
        </div>
    </div>
  )
}

export default Avatar