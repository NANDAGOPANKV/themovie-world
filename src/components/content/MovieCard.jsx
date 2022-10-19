import React, { useState } from 'react'
import { movieBaseUrl } from '../../constant/Tmdb'
// react-icons
import { FaHeart, FaRegHeart } from 'react-icons/fa'
//db
import { db } from '../../firebase/Firebase'
import { UserAuth } from '../../context/auth/AuthContext'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

export const MovieCard = ({ data }) => {
    const [Like, setLike] = useState(false)
    const [favoriteShow, setFavoriteShow] = useState(false)

    const { user } = UserAuth()

    const movieRef = doc(db, 'users', `${user?.email}`)

    const handleSaveShow = async () => {
        if (user?.email) {
            setLike(true)
            setFavoriteShow(true)
            await updateDoc(movieRef, {
                savedShows: arrayUnion({
                    id: data?.id,
                    title: data?.title,
                    image: data?.poster_path
                })
            })
            console.log(favoriteShow);
        } else {
            alert('Create An Account Then Try...')
        }
    }





    return (
        <div className='w-[160px] sm:w-[200px] lg:w-[250px] inline-block cursor-pointer relative p-6  hover:scale-105 duration-700 ease-in-out '>
            <img className='w-full h-full' src={`${movieBaseUrl}w400${data?.poster_path}`} alt={data?.title || data?.original_title} />
            <div className='absolute top-0  left-0 w-full h-full opacity-0 hover:bg-black/60  hover:opacity-100 duration-300  '>
                <p className='text-xs font-semibold  text-gray-300 text-center px-4  my-2 h-full  flex items-center justify-center' >{data?.title}</p>
                <p onClick={handleSaveShow} >{
                    Like ? <FaHeart size={20} className='text-gray-300 absolute top-7 left-7  ' /> : <FaRegHeart size={20} className='text-gray-300 absolute top-7 left-7   ' />
                }</p>
            </div>
        </div>
    )
}
