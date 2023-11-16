"use client"
import React from "react";
import {useEffect,useState} from 'react';
import axios from 'axios';
import Link from "next/link";
const User = ({ isLoggedIn, token }: { isLoggedIn: boolean; token: string }) => {
  const [createdAt, setCreatedAt] = useState("");
  useEffect(()=>{
     if(isLoggedIn){
       getUser()
     }
  },[isLoggedIn])

 
  const getUser = async ()=>{
    try {
        const response = await axios.get('https://dev.api.infigon.app/user/get-profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       setCreatedAt(response.data.createdAt)

        
      } catch (err) {
        console.log(err)
      }
  }
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      {isLoggedIn ? (
        <div className=" flex flex-col justify-center items-center">
          <p>Welcome sahil</p>
          <p>Your account is created at {createdAt}</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center ">
        <p>Protected route Please login first</p>
        <Link className=" text-blue-400" href="/">To login</Link>
        </div>
      )}
    </div>
  );
};

export default User;
