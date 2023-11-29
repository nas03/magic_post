import React from 'react'
import Link from 'next/link'

function LogIn() {
  return (
    <Link href ='/login' className=' max-lg:text-sm max-sm:text-xs max-lg:w-[10%] w-[5%] h-[30%] border-2 border-white rounded-xl text-white justify-center items-center flex hover:bg-white hover:text-[#2980B9] font-semibold cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110'>
        <span>Log In</span>
    </Link> 
  )
}

export default LogIn