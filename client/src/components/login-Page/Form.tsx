"use client"
import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { login } from '@/lib/fetchers';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {

    const  [avatarId , setAvatarId] = useState((Math.random()*20).toFixed());
    const [data , setData] = useState();

    const router = useRouter();

    const [cookie]=useCookies(["user"])



  return (
    <>
    <form onSubmit={(e)=> login(e , router , toast , Slide )} className='flex flex-col gap-5'>
            <Avatar avatarId={avatarId} setAvatarId={setAvatarId}/>
        <div className='flex flex-col xl:flex-row gap-5'>
            <div className='form-control w-full'>
                <label className=' label '>
                    <span className='label-text text-lg'>What is your email ?</span>
                </label>
                <input type="text" placeholder='username' className='input w-full input-bordered' required/>
            </div>
            <div className='form-control w-full'>
                <label className=' label '>
                    <span className='label-text text-lg'>Enter password ?</span>
                </label>
                <input type="password" placeholder='email' className='input w-full input-bordered' required/>
            </div>
        </div>
        <button className='btn'>Login</button>
    </form>
    <ToastContainer/>

    </>
  )
}

export default Form