import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

interface PropsType {
  isOpen: boolean,
  onClose: Function
}

interface AuthPayloadType {
  fullname?: string,
  email: string,
  password: string
}

export default function AuthModal ({ isOpen, onClose }: PropsType) {
  const [isSignup, setIsSignup] = useState(false);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token) onClose()
  }, [cookies, onClose])

  return (
    <div className={`flex items-center justify-center z-[999] top-0 right-0 left-0 bottom-0 fixed h-screen w-screen overflow-hidden bg-white${isOpen ? "" : " hidden"}`}>
      <button onClick={() => onClose()} className="absolute top-16 right-16">X</button>
      {isSignup ?
        <Signup swap={() => setIsSignup(false)} /> :
        <Login swap={() => setIsSignup(true)} />
      }
    </div>
  )
} 

interface CompPropsType {
  swap: Function,
}

function Login ({ swap }: CompPropsType) {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState<AuthPayloadType>({ email: '', password: '' });
  const [cookies, setCookie] = useCookies(['token']);

  const onTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('https://skillkamp-api.com/v1/api/auth/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        setSuccess(false);
        setMessage("Invalid Credentials!.")
        return 
      }

      const resData = await res.json();

      setCookie('token', resData.detail.Token);
      localStorage.setItem("store-user-name", resData.detail.Name);
      setForm({ email: '', password: '' });

    } catch (err) {
      setSuccess(false);
      setMessage('Something wrong!');
      console.log(err);
    }
  }

  return (
    <div className="text-center w-[320px]">
      <div className="mb-3 text-5xl">Login</div>
      <div className="mb-5">New to this site? <button onClick={() => swap()} className="text-orange-400">Sign Up</button></div>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input onChange={onTyping} value={form.email} id="email" className="border-b p-1 py-2" type="email" placeholder="email@gmail.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input onChange={onTyping} value={form.password} id="password" className="border-b p-1 py-2" type="password" placeholder="••••••••" />
        </div>
        <button type="button" className="underline text-sm text-left w-fit">Forgot password?</button>
        <div className={`text-sm${success ? " text-green-500":" text-red-500"}`}>{message}</div>
        <button type="submit" className="py-3 my-3 bg-orange-500 text-white">Login</button>
      </form>
    </div>
  )
}

function Signup({ swap }: CompPropsType) {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState<AuthPayloadType>({ fullname: '', email: '', password: '' });

  const onTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const res = await fetch('https://skillkamp-api.com/v1/api/auth/signup', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        setSuccess(false);
        setMessage("Something wrong! Please try again.")
        return
      }

      if (res.status == 200) {
        setSuccess(false);
        setMessage("User already exist! Please login with you password.")
        return
      }

      const resData = await res.json();

      if (resData.detail == "Sign up complete") {
        setSuccess(true);
        setForm({ email: '', password: '', fullname: '' })
        setMessage("Sign up complete! Please login with your email and password")
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="text-center w-[320px]">
      <div className="mb-3 text-3xl">Sign Up</div>
      <div className="mb-5">Already a member? <button onClick={() => swap()} className="text-orange-400">Login</button></div>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullname">Name</label>
          <input onChange={onTyping} value={form.fullname} id="fullname" className="border-b p-1 py-2" type="text" placeholder="Tom Jack" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input onChange={onTyping} value={form.email} id="email" className="border-b p-1 py-2" type="email" placeholder="email@gmail.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input onChange={onTyping} value={form.password} id="password" className="border-b p-1 py-2" type="password" placeholder="••••••••" />
        </div>
        <div className={`text-sm${success ? " text-green-500": " text-red-500"}`}>{message}</div>
        <button type="submit" className="py-3 my-5 bg-orange-500 text-white">Sign Up</button>
      </form>
    </div>
  )
}