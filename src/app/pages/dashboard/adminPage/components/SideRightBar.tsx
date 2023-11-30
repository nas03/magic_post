import React from 'react'
import Chart from './LineChart'
import Radar_Chart from './RadarChart'
import Pie_Chart from './PieChart'

function SideRightBar() {
  return (
    <div className='w-full h-full p-[2%] flex flex-col justify-between'>
      <div className=' w-full h-[20%] rounded-xl bg-[#FBE9DD] p-[2%]'>
          <span className=' text-pink-600 text-base'>Return Usage</span>
          <div  className=' w-full h-[90%]'>
            <Chart/>
          </div>
      </div>
      <div className=' W-full h-[40%] rounded-xl bg-[] p-[2%]'>
          <span className=' text-[#564ec3] text-base'>Satisfaction Level</span>
          <div  className=' w-full h-[90%]'>
            <Radar_Chart/>
          </div>
      </div>
      <div className=' W-full h-[35%] rounded-xl bg-[] p-[2%]'>
          <span className=' text-[#ed9468] text-base'>Source Of Income</span>
          <div  className=' w-full h-[90%]'>
            <Pie_Chart/>
          </div>
      </div>
    </div>
  )
}

export default SideRightBar