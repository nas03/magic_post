import React from 'react'
import Link from 'next/link'

const Header = () => {


  return (
      <div id="home" className=' w-[100vw] h-[100vh] flex flex-col relative '>
        <img src="./image/background.jpg" className=' w-[100%] h-[100%] object-cover saturate-50' alt="" />
        <div className=' absolute w-[100%] h-[25%] flex justify-between p-[2%]'>
            <div 
              // to="home"
              // spy={true} 
              // smooth={true} 
              // offset={50} 
              // duration={500} 
              className='w-[70px] z-50 cursor-pointer'>
              <img className=' z-50' src='./image/magic-post-high-resolution-logo-transparent.png' />
            </div>
            <div className=' text-gray-500 '>
                <ul className=' max-md:text-sm max-sm:text-xs flex gap-[20%] justify-center items-center py-[3%]'>
                    <div 
                          // to='home'
                          // spy={true} 
                          // smooth={true} 
                          // offset={50} 
                          // duration={500} 
                    className='hover:text-white cursor-progress'>HOME</div>
                    <div
                          // to="about"
                          // spy={true} 
                          // smooth={true} 
                          // offset={50} 
                          // duration={500}      
                    className='hover:text-white cursor-pointer'>ABOUT</div>
                    <div 
                          // to='features'
                          //  spy={true} 
                          //  smooth={true} 
                          //  offset={50} 
                          //  duration={500} 
                    className='hover:text-white cursor-pointer'>FEATURE</div>
                    <div 
                          // to='feedback'
                          // spy={true} 
                          // smooth={true} 
                          // offset={50} 
                          // duration={500} 
                    className='hover:text-white cursor-pointer'>FEEDBACK</div>
                </ul>
            </div>
            <Link href='/login' className=' max-lg:text-sm max-sm:text-xs max-lg:w-[10%] w-[5%] h-[30%] border-2 border-white rounded-xl text-white justify-center items-center flex hover:bg-white hover:text-[#2980B9] font-semibold cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110'>
              <span>Log In</span>
            </Link> 
        </div>
        <div className=' flex p-[6%] w-[100vw] h-[80%] absolute justify-between items-center bottom-0 '>
            <div className=' text-white w-[30%] gap-[5%] flex-col flex'>
                <span className='max-lg:text-4xl max-md:text-2xl text-6xl font-semibold'>The powerfull shipping app in the world</span>
                <span className='max-lg:text-sm max-md:text-xs text-gray-400 py-6'>We serve your shipments quickly and safely. Purdence and Security of carried on our couriers will be truly maintained until the destination.</span>
                <div className=' h-[95%] justify-center items-center flex'>
                    <input className=" max-lg:text-sm max-md:text-xs pl-2 appearance-none bg-white rounded-l-xl text-gray-700 h-[5vh] w-[70%] leading-tight focus:outline-none border-medium border-teal-500" type="text" placeholder="Search your order" aria-label="Full name"/>
                    <button className=' max-lg:text-sm max-md:text-xs w-[30%] h-[5vh] rounded-r-xl text-center bg-[#029827]'>Search Now</button>
                </div>
            </div>
            <div className=' max-lg:right-0 max-sm:w-[35vw] w-[40vw] h-[80vh] right-[5%] z-40 flex'>
              <img src="./image/Sale_Box_1.png" className=' w-[20%] h-[20%] -mx-20 animate-bounce object-fill top-0 z-40' alt="" />
              <img src="./image/Delivery_Success_(1).png" className=' animate-go w-[100%] h-[90%] transition-transform duration-20 ' alt="" />
              <img src="./image/Business_Remote.png" className=' max-sm:h-[20%] animate-wiggle w-[30%] h-[30%] bottom-2 right-0' alt="" />
            </div>
        </div>
      </div>
  )
}

export default Header