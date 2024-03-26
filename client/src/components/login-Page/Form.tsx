"use client"
import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { login } from '@/lib/fetchers';

function Form() {

    const  [avatarId , setAvatarId] = useState((Math.random()*20).toFixed());
    const [data , setData] = useState();

    const router = useRouter();

    const [cookie]=useCookies(["user"])
    // useEffect(() => {
    //     if (cookie.user) {
    //         router.push("/chat")
    //     }
    // },[cookie.user])

    // useEffect(() => {
    //     // Fetch data from the API
    //     fetch('http://localhost:3000/messages')
    //       .then(response => response.json())
    //       .then(data => {
    //       console.log(data , )
    //       })
    //       .catch(error => {
    //         console.error('Error fetching data:', error);
    //       });
    //   }, []);


  return (
    <form onSubmit={(e)=> login(e , router  )} className='flex flex-col gap-5'>
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
  )
}

export default Form