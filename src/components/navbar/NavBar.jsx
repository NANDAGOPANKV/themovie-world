import React, { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../../context/auth/AuthContext'
import { RiAccountCircleFill } from 'react-icons/ri'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/Firebase'

export const NavBar = () => {
    const { user, Signout } = UserAuth()
    const [username, setUsername] = useState({})


    const handleSignOut = async () => {
        try {
            alert('Are You Sure')
            await Signout()
        } catch (error) {
            alert(error.message)
        }
    }


    useLayoutEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), ((doc) => {
            setUsername(doc.data()?.userData)
        }))

        return () => {

        };
    }, [user?.email])

    return (
        <div className='text-white flex items-center justify-between w-full z-[100]  p-4 mx-auto absolute'>
            <Link to='/'>
                <h1 className='uppercase text-red-700 text-xl font-bold cursor-pointer'>the movies</h1>
            </Link>
            {
                user ? <div className='flex items-center justify-between'>
                    <Link to='/account'>
                        <div className=' flex items-center'>
                            <p className='hidden sm:block mr-2 text-white font-semibold'>{username?.name}</p>
                            <button className='pr-3 capitalize hover:text-red-800 duration-300 font-bold'>
                                <RiAccountCircleFill size={35} />
                            </button>
                        </div>
                    </Link>
                    <button className='bg-red-800 hover:bg-red-700  m-3 px-4 py-2 rounded-md font-medium capitalize cursor-pointer' onClick={handleSignOut}  >signout</button>
                </div> : <div className='flex items-center justify-between'>
                    <Link to='/signin'>
                        <button className='pr-3 capitalize hover:text-red-800 duration-300 font-bold'>signin</button>
                    </Link>
                    <Link to='/signup'>
                        <button className='bg-red-800 hover:bg-red-700  m-3 px-4 py-2 rounded-md font-medium capitalize cursor-pointer'>signup</button>
                    </Link>
                </div>
            }
        </div>
    )
}
