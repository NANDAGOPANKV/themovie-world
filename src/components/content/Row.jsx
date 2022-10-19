import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import { MovieCard } from './MovieCard'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'


export const Row = ({ title, fetchURL, rowId }) => {
    const [movies, setMovies] = useState([])


    useLayoutEffect(() => {
        axios.get(fetchURL).then((res) => {
            setMovies(res.data.results)
        }).catch((err) => {
            console.log(err.message);
        }).finally(() => {
            console.log('Axios Working');
        })
    }, [fetchURL])

   

    const slideToLeft = () => {
        var slide = document.getElementById('slider' + rowId)
        slide.scrollLeft = slide.scrollLeft - 500
    }

    const slideRight = () => {
        var slide = document.getElementById('slider' + rowId)
        slide.scrollLeft = slide.scrollLeft + 500
    }


    return (
        <>
            <h2 className='capitalize text-sm  sm:text-xl text-gray-300 font-semibold p-4'>{title}</h2>
            <div className='flex items-center relative group '>
                <MdChevronLeft onClick={slideToLeft} size={40} className='bg-white rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 hidden  group-hover:block absolute left-0.5 ' />
                <div id={'slider' + rowId} className="w-full h-full overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative  ">
                    {
                        movies?.map((data, index) => {
                            return (
                                <MovieCard key={index} data={data} />
                            )
                        })
                    }
                </div>
                <MdChevronRight onClick={slideRight} size={40} className='bg-white rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block absolute right-0.5  ' />
            </div>
        </>
    )
}
