import React from 'react'

function Intro() {
  return (
    <div className=' w-[100vw] h-[60vh] flex justify-center gap-[10%] items-center'>
        <div className=' w-[30%] flex flex-col justify-center items-center gap-5'>
            <span className='max-lg:text-3xl text-5xl font-medium'>Download and use it on your phone</span>
            <span className='max-md:text-xs text-gray-400 text-sm mb-10'>Immediately download Magic Post for free on your cellphoe, don't let you miss the promo promos that are offered because we always share interesting promos</span>
            <div className=' w-[100%] flex justify-between'>
              <div className=' w-[45%] h-[50%]'>
                  <img src="./image/appstore.png" className='h-[100%] object-cover rounded-xl' alt="" />
              </div>
              <div className=' w-[45%] h-[50%]'>
                  <img src="./image/ggplay.png" className=' h-[100%] object-cover rounded-xl' alt="" />
              </div>
            </div>
        </div>
        <div className='max-md:h-[90%] w-[35%] h-[100%]'>
          <img src="./image/Certificate.png" className='w-full h-full' alt="" />
        </div>
    </div>
  )
}

export default Intro