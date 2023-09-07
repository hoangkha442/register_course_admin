import React from 'react'
import Lottie from "lottie-react";
import robotAnimation from "./robotAnimation.json";


export default function RootLayoutMobile() {
  
  return (
    <div className='h-screen flex justify-center items-center flex-col'>
      <Lottie
      animationData={robotAnimation}
    />
    <h1 className='w-[90%] mx-auto'><span className='text-xl'>Sorry!</span> <br /> We don't support <span className='font-bold'>tablet </span> and <span className='font-bold'>mobile</span> screens.</h1>
    </div>
  )
}
