import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import banner from '../../assets/netflixbanner.jpg'
import { UserAuth } from '../../context/auth/AuthContext'

export const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { Signup } = UserAuth()

  const NavigateTo = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      await Signup(email, password, username)
      console.log('Signed up');
      NavigateTo('/signin')
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className='w-full h-screen'>
        <img className='hidden sm:block absolute w-full h-full object-cover ' src={banner} alt="/" />
        <div className='bg-black/50 fixed top-0 left-0 w-full h-screen'></div>
        <div className='fixed w-full px-4 py-16 z-50'>
          <div className='max-w-[450px] h-[500px] mx-auto bg-black/70 text-white  '>
            <div className='mx-auto max-w-[320px] py-10 '>
              <h2 className='text-white text-3xl font-bold text-center'>Sign Up</h2>
              <form className='flex flex-col w-full mx-auto' onSubmit={handleSignUp} >
                <input className='px-3 my-2 py-4  outline-none text-white text-xl bg-gray-700' value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Enter Name' />
                <input className='px-3 my-2 py-4  outline-none text-white text-xl bg-gray-700' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Email' />
                <input className='px-3 my-2 py-4  outline-none text-white text-xl bg-gray-700' value={password} onChange={(e) => setPassword(e.target.value)} type="passowrd" placeholder='Enter Password' />
                <button className='py-3 my-6 bg-rose-600 rounded font-bold capitalize '>Sign Up</button>
              </form>
              <div className='flex items-center justify-between text-gray-600 '>
                <p className='capitalize flex items-center '><input className='mr-2' type="checkbox" /> remamber me</p>
                <p className='capitalize cursor-default'>need helps?.</p>
              </div>
              <p className='text-gray-600 capitalize py-3'>already subscriber to netflix <span className='text-white'><Link to='/signin'>Sign In</Link></span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
