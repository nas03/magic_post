import React from 'react'

function Gallery() {
  return (
    <div className='w-[100vw] h-[70vh] flex justify-between items-center'>
      <div className=' w-[25%] h-full flex flex-col justify-center items-center'>
          <div className='max-lg:h-[30%] w-[50%] h-[40%] rounded-xl bg-white z-40 flex justify-center items-center translate-y-[30%] translate-x-[5%]'>
            <img src="./image/giveBox.jpg" className=' w-[95%] h-[95%] rounded-xl' alt="" />
          </div>
          <div className=' max-lg:h-[60%] max-md:h-[50%] bg-[#FAFAFA] w-[70%] h-[70%] rounded-xl flex justify-center items-center -translate-y-[5%] -translate-x-[30%]'>
            <img src="./image/liftBox.jpg" className=' w-[95%] h-[95%] rounded-xl' alt="" />
          </div>
      </div>
      <div className=' w-[45%] h-full justify-center items-center flex flex-col gap-5'>
          <span className='max-lg:text-3xl max-md:text-xl text-center text-5xl font-medium '>See a gallery of what we do at Magic Post and share it to all</span>
          <span className='max-md:text-xs text-gray-400 text-sm w-[80%] text-center mb-10'>Our experience of working is 20 years and of course that makes us work more professionally and be careful about the shipments made</span>
          <div className=' max-md:text-xs text-white w-[25%] h-[50px] bg-[#F79132] justify-center items-center flex rounded-xl cursor-pointer hover:bg-white hover:border-2 hover:border-[#F79132] hover:text-[#F79132]'>
            <span>View more</span>
          </div>     
      </div>
      <div className=' w-[25%] h-full flex flex-col justify-center items-center'>
          <div className='max-lg:h-[60%] max-md:h-[50%] w-[70%] h-[80%] rounded-xl bg-white  flex justify-center items-center translate-y-[5%] translate-x-[35%]'>
            <img src="./image/shipment.jpg" className=' w-[90%] h-[90%] rounded-xl' alt="" />
          </div>
          <div className='max-lg:h-[25%] bg-[#FAFAFA] w-[50%] h-[50%] rounded-xl z-40 flex justify-center items-center -translate-y-[35%] -translate-x-[5%]'>
            <img src="./image/liftbox2.jpg" className='w-[95%] h-[95%] rounded-xl' alt="" />
          </div>
      </div>
    </div>
  )
}

export default Gallery