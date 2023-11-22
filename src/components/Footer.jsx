import React from 'react'

function Footer() {
  return (
    <div className=' w-[100vw] h-[60vh] flex justify-center items-center flex flex-col'>
        <div className=' w-full h-[85%] bg-[#fafafa] flex justify-between items-center p-[5%]'>
            <div className=' w-[20%] h-full flex flex-col gap-5 '>
              <div className=' flex gap-5 items-center'>
                <img className='w-[20%] bg-[#F79132] rounded-xl py-2' src='./image/magic-post-high-resolution-logo-transparent.png' />
                <span className=' text-2xl font-semibold'>Magic Post</span>
              </div>
              <span className=' text-gray-400 text-sm'>We serve your shipments quickly and safety. Prodence and Security of carried on our couriers</span>
              <div className='w-full flex items-center gap-10'>
                <img src="./image/facebook.png" alt="" />
                <img src="./image/linkedin.png" alt="" />
                <img src="./image/twitter.png" alt="" />
              </div>
            </div>
            <div className=' w-[20%] h-full flex flex-col gap-5 items-center'>
                <span className=' font-bold text-xl'>Who we are?</span>
                <span className=' text-gray-400 text-sm'>About Us</span>
                <span className=' text-gray-400 text-sm'>Meet our team</span>
                <span className=' text-gray-400 text-sm'>News & media</span>
                <span className=' text-gray-400 text-sm'>Case Studies</span>
            </div>
            <div className=' w-[20%] h-full flex flex-col gap-5 items-center'>
                <span className=' font-bold text-xl'>What we do?</span>
                <span className=' text-gray-400 text-sm'>Warehousing</span>
                <span className=' text-gray-400 text-sm'>shipping</span>
                <span className=' text-gray-400 text-sm'>Tracking</span>
            </div>
            <div className=' w-[20%] h-full flex flex-col gap-5 items-center'>
                <span className=' font-bold text-xl'>Quick action</span>
                <span className=' text-[#F79132] text-sm'>Order now!</span>
                <span className=' text-gray-400 text-sm'>Track & trace</span>
                <span className=' text-gray-400 text-sm'>Help & FAQ</span>
                <span className=' text-gray-400 text-sm'>Global agents</span>
            </div>
        </div>
        <div className=' w-full h-[15%] bg-[#F79132] px-20 items-center justify-between flex text-white'>
            <span>All rights reserved @magicpost</span>
            <span>Terms & Conditions - Prifacy Policy</span>
        </div>
    </div>
  )
}

export default Footer