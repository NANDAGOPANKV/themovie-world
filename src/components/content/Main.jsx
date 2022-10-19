import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import request from '../../constant/Tmdb'
import { movieBaseUrl } from '../../constant/Tmdb'

export const Main = () => {
    const [movies, setMovies] = useState([])

    // use movieRandom variable to get all the movies randomly
    const movieRandom = movies[Math.floor(Math.random() * movies.length)]

    useLayoutEffect(() => {
        axios.get(request.requestPopular).then((res) => {
            setMovies(res.data.results)
        }).catch((err) => {
            console.log(err.message);
        }).finally(() => {
            console.log('Working axios');
        })
    }, [setMovies])


    // string...
    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...'
        } else {
            return str
        }
    }


    return (
        <div className='w-full h-[500px] text-white  relative '>

            <div className='w-full h-full absolute'>
                <div className='w-full h-full absolute bg-gradient-to-tr from-black'></div>
                <img className='w-full h-full object-cover' src={`${movieBaseUrl}original${movieRandom?.backdrop_path}`} alt={movieRandom?.title || movieRandom?.original_title} />
                <div className='absolute w-full h-full top-[20%] p-4 md:p-6  '>
                    <h1 className='capitalize py-2 text-2xl md:text-4xl font-semibold  '>{movieRandom?.title}</h1>
                    <div className='my-4 '>
                        <button className='border bg-gray-300 border-gray-300 text-black px-3 py-1  capitalize rounded  ' >play</button>
                        <button className='border  border-gray-300 text-white px-3 py-1 ml-2 capitalize rounded  ' >watch later</button>
                    </div>
                    <p className='capitalize text-sm text-gray-400'>reslease: <span>{movieRandom?.release_date}</span></p>
                    <p className='text-gray-200 w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]' >{truncateString(movieRandom?.overview, 150)}</p>
                </div>
            </div>
        </div>
    )
}
