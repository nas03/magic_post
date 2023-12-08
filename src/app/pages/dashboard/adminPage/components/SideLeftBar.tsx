'use client'
import React, {useState} from 'react'
import { ArchiveBoxIcon, TruckIcon, MapPinIcon, ChevronRightIcon, BuildingStorefrontIcon, UserGroupIcon, ChatBubbleLeftRightIcon, BookOpenIcon, BanknotesIcon, Squares2X2Icon } from '@heroicons/react/24/solid'

function SideLeftBar() {
    const [name, setName] = useState('')

    const handleClick = (name:any) => {
        setName(name)
    }

    const dataDashboard = [
        {
            id: '1',
            name: 'Shipping',
            icon: <TruckIcon className='text-[#32989a] w-6 h-6 '/>,
            defaultIcon: <TruckIcon className='text-gray-300 w-6 h-6 '/>
        },
        {
            id: '2',
            name: 'Orders',
            icon: <ArchiveBoxIcon className='text-[#32989a] w-6 h-6 '/>,
            defaultIcon: <ArchiveBoxIcon className='text-gray-300 w-6 h-6 '/>
        },
        {
            id: '3',
            name: 'Tracking',
            icon: <MapPinIcon className='text-[#32989a] w-6 h-6 '/>,
            defaultIcon: <MapPinIcon className='text-gray-300 w-6 h-6 '/>
        },
        {
            id: '4',
            name: 'Marketplace',
            icon: <BuildingStorefrontIcon className='text-[#32989a] w-6 h-6 '/>,
            defaultIcon: <BuildingStorefrontIcon className='text-gray-300 w-6 h-6 '/>
        },
        {
            id: '5',
            name: 'Customers',
            icon: <UserGroupIcon className='text-[#32989a] w-6 h-6 '/>,
            defaultIcon: <UserGroupIcon className='text-gray-300 w-6 h-6 '/>
        },
        {
            id: '6',
            name: 'Message',
            icon: <ChatBubbleLeftRightIcon className='text-[#32989a] w-6 h-6 '/>,
            defaultIcon: <ChatBubbleLeftRightIcon className='text-gray-300 w-6 h-6 '/>
        }
    ]

    const dataPayment = [
        {
            id: '1',
            name: 'Ledger',
            icon: <BookOpenIcon className='text-[#32989a] w-6 h-6' />,
            defaultIcon: <BookOpenIcon className='text-gray-300 w-6 h-6 '/> 
        },
        {
            id: '2',
            name: 'Taxes',
            icon:  <BanknotesIcon className='text-[#32989a] w-6 h-6'/>,
            defaultIcon: <BanknotesIcon className='text-gray-300 w-6 h-6 '/>
        },
        {
            id: '3',
            name: 'Payment Methods',
            icon: <Squares2X2Icon  className='text-[#32989a] w-6 h-6'/>,
            defaultIcon:  <Squares2X2Icon className='text-gray-300 w-6 h-6 '/>
        }
    ]

  return (
    <div className=' h-full w-[90%] flex flex-col justify-center '>
        <div className=' h-[90%] w-full'>
            <span className=' text-xl text-gray-400 font-semibold mb-[5%]'>DASHBOARD</span>
            {
                dataDashboard.map((item, index) => (
                    <div key={index} onClick={() => handleClick(item.name)} 
                        className={` ${ name == item.name ? 'bg-[#F7F8FA] text-[#32989a]' : 'bg-white'} cursor-pointer px-[5%] flex h-[10%] w-full justify-between items-center `}
                        >
                        <div className=' w-full flex gap-[3%] items-center'>
                            {
                               name == item.name 
                               ? item.icon
                               : item.defaultIcon
                            }
                            <span className=' font-medium'>{item.name}</span>
                        </div>
                        {
                         name == item.name
                        ?
                        <ChevronRightIcon className=' w-6 h-6 text-[#32989a] '/>
                        : 
                        ''
                        }
                </div>
                ))
            }
            <span className=' text-xl text-gray-400 font-semibold'>PAYMENT</span>
            {
                dataPayment.map((item, index) => (
                    <div key={index} onClick={() => handleClick(item.name)} 
                        className={` ${ name == item.name ? 'bg-[#F7F8FA] text-[#32989a]' : 'bg-white'} cursor-pointer px-[5%] flex h-[10%] w-full justify-between items-center `}
                        >
                        <div className=' w-full flex gap-[3%] items-center'>
                            {
                               name == item.name 
                               ? item.icon
                               : item.defaultIcon
                            }
                            <span className=' font-medium'>{item.name}</span>
                        </div>
                        {
                         name == item.name
                        ?
                        <ChevronRightIcon className=' w-6 h-6 text-[#32989a] '/>
                        : 
                        ''
                        }
                </div>
                ))
            }
           
        </div>
    </div>
  )
}

export default SideLeftBar