import React from 'react'
import { useSelector } from 'react-redux'
import { HashLoader } from 'react-spinners'

export default function Spinner() {
    let {isLoading} = useSelector((state) => state.spinnerSlice)
  return isLoading ? (
    <div className='h-screen w-screen fixed bg-[#00000090] top-0 left-0 z-50 flex justify-center items-center'>
        <HashLoader color='#fc904d' />
    </div>
  ) : <></>
}
