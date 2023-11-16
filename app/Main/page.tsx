"use client"
import { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import User from '../User/page';

interface FormData {
  phone: string;
  pass: string;
}

export default function Home() {
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [token, setToken] = useState('');
  const [login, setLogin] = useState(false);
  const router = useRouter();

  const SignInUser = async (e: React.FormEvent<HTMLFormElement>, formData: FormData): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/sign_in", {
        phone: formData.phone,
        pass: formData.pass
      });
        
      setLogin(true);
      setToken(response.data);
    } catch (error) {
      console.error(error);
      alert("Wrong credentials");
    }
  };

  return (
    <>
      {!login ? (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
          <div className="w-[500px] h-[500px] flex flex-col justify-center items-center bg-[rgba(244,243,243,0.10)] backdrop:blur-md rounded-md">
            <p className="text-4xl mb-10 flex flex-col gap-3 items-center select-none">
              <span className="text-blue-400">Infigon</span> Login page
            </p>

            <form onSubmit={(e) => SignInUser(e, { phone, pass })} className="flex flex-col justify-center items-center gap-4">
              <input
                name="phone"
                required
                placeholder="Enter Phone Number"
                className="rounded-sm placeholder:text-center text-black w-[300px] p-2"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                name="pass"
                required
                placeholder="Enter Password"
                className="rounded-sm placeholder:text-center text-black w-[300px] p-2"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <button type="submit" className="hover:bg-slate-200 w-[300px] p-2 rounded-sm bg-white text-black">
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <User isLoggedIn={login} token={token} />
      )}
    </>
  );
}
