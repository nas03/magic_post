import React from 'react'
import {MapPinIcon, ShieldCheckIcon, BriefcaseIcon, LockClosedIcon} from '@heroicons/react/24/solid'

function About() {
  return (
    <div id='about' className=' max-md:h-[95vh] max-sm:px-[15%] w-[95vw] h-[90vh] flex justify-between px-[5%] items-center'>
      <div className=' max-md:flex-col max-md:gap-2 flex w-[50vw] flex-wrap gap-6 '>
        <div className='max-md:w-[25vw] max-md:gap-1 max-md:h-[22vh] w-[20vw] h-[35vh] border-2 border-gray rounded-xl justify-center flex flex-col px-5 gap-4  hover:shadow-xl hover:border-white '>
          <div className='max-lg:h-[10%] w-[20%] h-[20%] bg-[#FEF4EB] rounded-full justify-center items-center flex'>
            <MapPinIcon className=' w-[60%] h-[60%]' color='#F79132'/>
          </div>
          <span className='max-lg:text-sm max-md:text-xs w-[100%] font-bold text-xl'>Real-time Tracking</span>
          <span className=' max-lg:text-xs text-[#75878D] text-sm'>We will use all our strength to shorten the time it takes for the custom.</span>
        </div>
        <div className=' max-md:w-[25vw] max-md:gap-1 max-md:h-[22vh] w-[20vw] h-[35vh] border-2 border-gray rounded-xl justify-center flex flex-col px-5 gap-4 hover:shadow-xl hover:border-white '>
          <div className='max-lg:h-[10%] w-[20%] h-[20%] bg-[#FEF4EB] rounded-full justify-center items-center flex'>
            <ShieldCheckIcon className=' w-[60%] h-[60%]' color='#F79132'/>
          </div>
          <span className=' max-lg:text-sm max-md:text-xs font-bold text-xl'>Item Safety</span>
          <span className=' max-lg:text-xs text-[#75878D] text-sm'>Shipments are treated with care and well guarded.</span>
        </div>
        <div className='max-md:w-[25vw] max-md:gap-1 max-md:h-[22vh] w-[20vw] h-[35vh] border-2 border-gray rounded-xl justify-center flex flex-col px-5 gap-4 hover:shadow-xl hover:border-white '>
          <div className='max-lg:h-[10%] w-[20%] h-[20%] bg-[#FEF4EB] rounded-full justify-center items-center flex'>
            <BriefcaseIcon className=' w-[60%] h-[60%]' color='#F79132'/>
          </div>
          <span className='max-lg:text-sm max-md:text-xs font-bold text-xl'>Weight Scales</span>
          <span className='max-lg:text-xs text-[#75878D] text-sm'>Already using digital scales which will be more significant.</span>
        </div>
        <div className=' max-md:w-[25vw] max-md:gap-1 max-md:h-[22vh] w-[20vw] h-[35vh] border-2 border-gray rounded-xl justify-center flex flex-col px-5 gap-4 hover:shadow-xl hover:border-white '>
          <div className='max-lg:h-[10%] w-[20%] h-[20%] bg-[#FEF4EB] rounded-full justify-center items-center flex'>
            <LockClosedIcon className=' w-[60%] h-[60%]' color='#F79132'/>
          </div>
          <span className='max-lg:text-sm max-md:text-xs font-bold text-xl'>Compensation Service</span>
          <span className='max-lg:text-xs text-[#75878D] text-sm'>Guarantee your item will be compensated if there is damage.</span>
        </div>
      </div>
      <div className=' w-[35vw]'>
        <span className=' max-md:text-3xl text-5xl font-medium'>Trust is very important for <span className='text-[#F79132]'>magic post</span>. The core features we have</span>
        <p className=' max-md:text-sm text-[#75878D] py-6 mb-16'>Ensure facilities we provide to maintain the feasibility of shipping to keep it safe and fast.</p>
        <div className=' flex w-[100%] gap-10'>
          <div className=' flex flex-col gap-2'>
            <span className=' max-md:text-xl text-3xl font-semibold'>15M<span className=' text-[#F79132] px-1'>+</span></span>
            <span className=' max-md:text-sm text-gray-500'>More Users</span>
          </div>
          <div className=' flex flex-col gap-2 '>
            <span className='max-md:text-xl text-3xl font-semibold'>100<span className=' text-[#F79132] px-1'>+</span></span>
            <span className='max-md:text-sm text-gray-500'>Delivery Cars</span>
          </div>
          <div className=' flex flex-col gap-2'>
            <span className=' max-md:text-xl text-3xl font-semibold'>20<span className=' text-[#F79132] px-1'>+</span></span>
            <span className='max-md:text-sm text-gray-500'>Intercity Trucks</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About