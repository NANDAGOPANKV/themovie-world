import React from 'react'
import banner from '../../assets/netflixbanner.jpg'
import { SavedShow } from '../../components/content/SavedShow'

export const Account = () => {
  return (
    <>
      <div className='w-full text-white'>
        <img className='object-cover w-full h-[400px]   ' src={banner} alt="/" />
        <div className='bg-black/70 fixed top-0 left-0 w-full h-[550px]  ' ></div>
        <div className='absolute top-[35%] p-4 md:p-8'>
          <p className='text-sm  md:text-4xl font-bold'>My List</p>
        </div>
      </div>
      <SavedShow />
    </>
  )
}
