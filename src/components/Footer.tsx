import React from 'react'

function Footer() {
  return (
    <div className=' w-[100vw] h-[55vh] flex justify-center items-center flex-col'>
      <div className=' w-full h-[85%] bg-[#fafafa] flex justify-between items-center p-[5%]'>
        <div className=' w-[20%] h-full flex flex-col gap-5 '>
          <div className=' flex gap-[5%] items-center'>
            <img className=' max-md:w-[30%] w-[20%] bg-[#F79132] rounded-full py-2' src='./image/magic-post-high-resolution-logo-transparent.png' />
            <span className='max-md:text-base text-2xl font-semibold text-center'>Magic Post</span>
          </div>
          <span className=' text-gray-400 text-sm'>We serve your shipments quickly and safety. Prodence and Security of carried on our couriers</span>
          <div className=' w-full flex items-center gap-[15%]'>
            <img src="./image/facebook.png" className='max-md:w-[20%]' alt="" />
            <img src="./image/linkedin.png" className='max-md:w-[20%]' alt="" />
            <img src="./image/twitter.png" className='max-md:w-[20%]' alt="" />
          </div>
        </div>
        <div className=' w-[20%] h-full flex flex-col gap-[5%] items-center'>
          <span className='max-md:text-base font-bold text-xl text-center'>Who we are?</span>
          <span className=' text-gray-400 text-sm text-center'>About Us</span>
          <span className=' text-gray-400 text-sm text-center'>Meet our team</span>
          <span className=' text-gray-400 text-sm text-center'>News & media</span>
          <span className=' text-gray-400 text-sm text-center'>Case Studies</span>
        </div>
        <div className=' w-[20%] h-full flex flex-col gap-[5%] items-center'>
          <span className='max-md:text-base font-bold text-xl text-center'>What we do?</span>
          <span className=' text-gray-400 text-sm text-center'>Warehousing</span>
          <span className=' text-gray-400 text-sm text-center'>Shipping</span>
          <span className=' text-gray-400 text-sm text-center'>Tracking</span>
        </div>
        <div className=' w-[20%] h-full flex flex-col gap-[5%] items-center'>
          <span className='max-md:text-base font-bold text-xl text-center'>Quick action</span>
          <span className=' text-[#F79132] text-sm text-center'>Order now!</span>
          <span className=' text-gray-400 text-sm text-center'>Track & trace</span>
          <span className=' text-gray-400 text-sm text-center'>Help & FAQ</span>
          <span className=' text-gray-400 text-sm text-center'>Global agents</span>
        </div>
      </div>
      <div className='max-md:text-xs w-full h-[15%] bg-[#F79132] px-[5%] items-center justify-between flex text-white'>
        <span>All rights reserved @magicpost</span>
        <span>Terms & Conditions - Prifacy Policy</span>
      </div>
    </div>
  )
}

export default Footer