import React from 'react'

function Feedback() {
  return (
    <div name='feedback' className=' w-[100vw] h-[100vh] flex flex-col gap-5 justify-center items-center bg-[#fafafa]'>
        <span className=' text-5xl font-medium '>People say about Magic Post</span>
        <span className=' text-gray-400 text-sm mb-10'>all from clients, we play here so you can see</span>
        <div className=' w-[80%] h-[70%] flex flex-wrap gap-10 justify-between items-center'>
                <div className=' w-[25%] h-[40%] relative bg-black rounded-xl bg-feedback shadow-2xl'>
                    <div className='absolute w-[90%] h-[80%] gap-3 justify-center items-center flex flex-col px-5 shadow-xl rounded-xl'>
                        <div className=' w-[100%] h-[30%] flex gap-2 flex justify-center items-center'>
                            <img src="./image/avartar1.jpg" className=' w-[25%] object-cover h-[100%] rounded-full' alt="" />
                            <div className=' flex flex-col w-[80%]'>
                              <span className=' font-bold'>Alexandro</span>
                              <span className=' text-sm'>Programer <span className=' no-underline text-sky-500'>@metaku</span></span>
                            </div>
                        </div>
                        <span className=' text-gray-400 text-sm'>"This application is very charming, the minimalist makes users not confused when using it"</span>
                    </div>
                </div>
                <div className=' w-[25%] h-[40%] relative bg-black rounded-xl bg-feedback shadow-2xl'>
                    <div className='absolute w-[90%] h-[80%] gap-3 justify-center items-center flex flex-col px-5 shadow-xl rounded-xl'>
                        <div className=' w-[100%] h-[30%] flex gap-2 flex justify-center items-center'>
                            <img src="./image/avatar2.jpg" className=' w-[25%] object-cover h-[100%] rounded-full' alt="" />
                            <div className=' flex flex-col w-[80%]'>
                              <span className=' font-bold'>Misaki Sensei</span>
                              <span className=' text-sm'>Designer <span className=' no-underline text-sky-500'>@guruband</span></span>
                            </div>
                        </div>
                        <span className=' text-gray-400 text-sm'>"I had a good experience while using this app, what fascinated me was the live tracking feature"</span>
                    </div>
                </div>
                <div className=' w-[25%] h-[40%] relative bg-black rounded-xl bg-feedback shadow-2xl'>
                    <div className='absolute w-[90%] h-[80%] gap-3 justify-center items-center flex flex-col px-5 shadow-xl rounded-xl'>
                        <div className=' w-[100%] h-[30%] flex gap-2 flex justify-center items-center'>
                            <img src="./image/avatar3.jpg" className=' w-[25%] object-cover h-[100%] rounded-full' alt="" />
                            <div className=' flex flex-col w-[80%]'>
                              <span className=' font-bold'>Ronald Robin</span>
                              <span className=' text-sm'>Illustrator <span className=' no-underline text-sky-500'>@shiemic</span></span>
                            </div>
                        </div>
                        <span className=' text-gray-400 text-sm'>"I've been using this app for 2 years and haven't had any errors during that time, thanks for making this app"</span>
                    </div>
                </div>
                <div className=' w-[25%] h-[40%] relative bg-black rounded-xl bg-feedback shadow-2xl'>
                    <div className='absolute w-[90%] h-[80%] gap-3 justify-center items-center flex flex-col px-5 shadow-xl rounded-xl'>
                        <div className=' w-[100%] h-[30%] flex gap-2 flex justify-center items-center'>
                            <img src="./image/avatar4.jpg" className=' w-[25%] object-cover h-[100%] rounded-full' alt="" />
                            <div className=' flex flex-col w-[80%]'>
                              <span className=' font-bold'>Emma Syaril</span>
                              <span className=' text-sm'>Logo designer <span className=' no-underline text-sky-500'>@googles</span></span>
                            </div>
                        </div>
                        <span className=' text-gray-400 text-sm'>"Hello, let me introduce myself, I'm Emma from Googles Studio, I know Magic Post from my college friend, and I'm very grateful"</span>
                    </div>
                </div>
                <div className=' w-[25%] h-[40%] relative bg-black rounded-xl bg-feedback shadow-2xl'>
                    <div className='absolute w-[90%] h-[80%] gap-3 justify-center items-center flex flex-col px-5 shadow-xl rounded-xl'>
                        <div className=' w-[100%] h-[30%] flex gap-2 flex justify-center items-center'>
                            <img src="./image/avatar5.jpg" className=' w-[25%] h-[100%] rounded-full object-cover' alt="" />
                            <div className=' flex flex-col w-[80%]'>
                              <span className=' font-bold'>Emina Rose</span>
                              <span className=' text-sm'>Influencer <span className=' no-underline text-sky-500'>@enroll</span></span>
                            </div>
                        </div>
                        <span className=' text-gray-400 text-sm'>"Hi, I'm Emina from enroll studio, thank you for making my dream come true by presenting this application"</span>
                    </div>
                </div>
                <div className=' w-[25%] h-[40%] relative bg-black rounded-xl bg-feedback shadow-2xl'>
                    <div className='absolute w-[90%] h-[80%] gap-3 justify-center items-center flex flex-col px-5 shadow-xl rounded-xl'>
                        <div className=' w-[100%] h-[30%] flex gap-2 flex justify-center items-center'>
                            <img src="./image/avatar6.jpg" className=' w-[25%] h-[100%] rounded-full object-cover' alt="" />
                            <div className=' flex flex-col w-[80%]'>
                              <span className=' font-bold'>Agasya Winarni</span>
                              <span className=' text-sm'>Vloger <span className=' no-underline text-sky-500'>@cptions</span></span>
                            </div>
                        </div>
                        <span className=' text-gray-400 text-sm'>"This application was created to make life easier, let's use this application together because it is very useful"</span>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Feedback