"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface UserProps {
  isLoggedIn: boolean;
  token: string;
}

const User: React.FC<UserProps> = ({ isLoggedIn, token }) => {
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      getUser();
    }
  }, [isLoggedIn]);

  const getUser = async () => {
    try {
      const response = await axios.get('https://dev.api.infigon.app/user/get-profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCreatedAt(response.data.createdAt);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {isLoggedIn ? (
        <div className="flex flex-col justify-center items-center">
          <p>Welcome Sahil</p>
          {createdAt && <p>Your account is created at {createdAt}</p>}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p>Protected route. Please login first.</p>
          <Link href="/">To login</Link>
        </div>
      )}
    </div>
  );
};

export default User;
