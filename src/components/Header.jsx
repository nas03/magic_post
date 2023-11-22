import React from 'react'
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import { useNavigate } from "react-router-dom";

function Header() {

  let navigate = useNavigate(); 
  const loginRouter = () =>{ 
    navigate('login');
  }

  return (
      <div name="home" className=' w-[100vw] h-[100vh] flex flex-col relative '>
        <img src="./image/background.jpg" className=' w-[100%] h-[100%] object-cover saturate-50' alt="" />
        <div className=' absolute w-[100%] h-[25%] flex justify-between p-[2%]'>
            <Link 
              to='home'
              spy={true} 
              smooth={true} 
              offset={50} 
              duration={500} 
              className='w-[70px] z-50 cursor-pointer'>
              <img className=' z-50' src='./image/magic-post-high-resolution-logo-transparent.png' />
            </Link>
            <div className=' text-gray-500'>
                <ul className=' flex gap-16'>
                    <Link to='home'
                          spy={true} 
                          smooth={true} 
                          offset={50} 
                          duration={500} 
                    className='hover:text-white cursor-progress'>HOME</Link>
                    <Link to='about'
                          spy={true} 
                          smooth={true} 
                          offset={50} 
                          duration={500}      
                    className='hover:text-white cursor-pointer'>ABOUT</Link>
                    <Link to='features'
                           spy={true} 
                           smooth={true} 
                           offset={50} 
                           duration={500} 
                    className='hover:text-white cursor-pointer'>FEATURE</Link>
                    <Link to='feedback'
                          spy={true} 
                          smooth={true} 
                          offset={50} 
                          duration={500} 
                    className='hover:text-white cursor-pointer'>FEEDBACK</Link>
                </ul>
            </div>
            <Link onClick={() => navigate('login')} className=' w-[5%] h-[30%] border-2 border-white rounded-xl text-white justify-center items-center flex hover:bg-white hover:text-[#2980B9] font-semibold cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110'>
              <span>Log In</span>
            </Link> 
        </div>
        <div className=' flex p-[15%] w-[100vw] h-[80%] absolute justify-between items-center bottom-0 '>
            <div className=' text-white w-[38%]'>
                <span className=' text-6xl font-semibold'>The powerfull shipping app in the world</span>
                <p className=' text-gray-400 py-6'>We serve your shipments quickly and safely. Purdence and Security of carried on our couriers will be truly maintained until the destination.</p>
                <div className=' h-[95%] justify-center items-center flex'>
                    <input className=" pl-2 appearance-none bg-white rounded-l-xl text-gray-700 h-[5vh] w-[70%] leading-tight focus:outline-none border-medium border-teal-500" type="text" placeholder="Search your order" aria-label="Full name"/>
                    <button className='w-[30%] h-[5vh] rounded-r-xl text-center bg-[#029827]'>Search Now</button>
                </div>
            </div>
            <div className=' w-[40vw] h-[80vh] absolute right-[8%] z-40 flex'>
              <img src="./image/Sale_Box_1.png" className=' w-[20%] h-[20%] -mx-20 animate-bounce object-fill top-0 z-40' alt="" />
              <img src="./image/Delivery_Success_(1).png" className='animate-go w-[100%] h-[90%] transition-transform duration-20  object-fill' alt="" />
              <img src="./image/Business_Remote.png" className='animate-wiggle w-[30%] -mx-20 h-[30%] bottom-2 absolute right-0 -translate-y-4 translate-x-80' alt="" />
            </div>
        </div>
      </div>
  )
}

export default Header