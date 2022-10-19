import React, { useLayoutEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { movieBaseUrl } from '../../constant/Tmdb'
import { UserAuth } from '../../context/auth/AuthContext'
import { db } from '../../firebase/Firebase'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { AiOutlineClose } from 'react-icons/ai';

export const SavedShow = () => {
    const [movies, setmovies] = useState([])
    const { user } = UserAuth()

    // delete movies
    const movieRef = doc(db, 'users', `${user?.email}`)
    const handleDeleteMovie = async (passId, movieName) => {
        try {
            alert(`Deleting ${movieName}`)
            const result = movies.filter((movies) => movies.id !== passId)
            updateDoc(movieRef, {
                savedShows: result
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    // slide to functions
    const slideToLeft = () => {
        var slide = document.getElementById('slider')
        slide.scrollLeft = slide.scrollLeft - 500
    }

    const slideRight = () => {
        var slide = document.getElementById('slider')
        slide.scrollLeft = slide.scrollLeft + 500
    }
    // slide to functions

    useLayoutEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), ((doc) => {
            setmovies(doc.data()?.savedShows)
        }))
        return () => {
        };
    }, [user?.email])


    return (
        <> <h2 className='capitalize text-sm  sm:text-xl text-gray-300 font-semibold p-4'>My Shows</h2>
            <div className='flex items-center relative group '>
                <MdChevronLeft size={40} onClick={slideToLeft} className='bg-white rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 hidden  group-hover:block absolute left-0.5 ' />
                <div id={'slider'} className="w-full h-full overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative  ">
                    {
                        movies?.map((data, index) => {
                            return (
                                <div key={index} className='w-[160px] sm:w-[200px] lg:w-[250px] inline-block cursor-pointer relative p-6  hover:scale-105 duration-700 ease-in-out '>
                                    <img className='w-full h-full' src={`${movieBaseUrl}w400${data?.image}`} alt={data?.title || ''} />
                                    <div className='absolute top-0  left-0 w-full h-full opacity-0 hover:bg-black/60  hover:opacity-100 duration-300  '>
                                        <p className='text-xs font-semibold  text-gray-300 text-center px-4  my-2 h-full  flex items-center justify-center' >{data?.title}</p>
                                        <p onClick={() => handleDeleteMovie(data?.id, data?.title)} className=' text-white absolute top-7 right-8 ' ><AiOutlineClose size={30} /></p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <MdChevronRight onClick={slideRight} size={40} className='bg-white rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block absolute right-0.5  ' />
            </div></>
    )
}
