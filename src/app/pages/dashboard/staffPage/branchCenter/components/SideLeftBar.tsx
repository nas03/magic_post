'use client'
import React, {useState} from 'react'
import { ArchiveBoxIcon, TruckIcon, ClipboardDocumentListIcon, ChevronRightIcon, BuildingStorefrontIcon, UserGroupIcon, ChatBubbleLeftRightIcon, BookOpenIcon, BanknotesIcon, Squares2X2Icon, UserIcon } from '@heroicons/react/24/solid'
import { InputContext } from '@/src/components/Header'
import { InputLabel } from '@mui/material'
import { updateTableGather } from '../../../../../context/actions/updateTable'
import { useDispatch } from 'react-redux'

function SideLeftBar() {
    const [name, setName] = useState('')
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    const handleClick = (name:any) => {
        setName(name)
        dispatch(updateTableGather(name))
    }

    const dataDashboard = [
        {
            id: '0',
            name: 'Gathering Point',
            icon: <TruckIcon className='text-[#32989a] w-6 h-6 '/>,
            defaultIcon: <TruckIcon className='text-gray-300 w-6 h-6 '/>
        },
        {
            id: '1',
            name: 'Create Orders',
            icon: <ClipboardDocumentListIcon className='text-[#32989a] w-6 h-6 '/>,
            defaultIcon: <ClipboardDocumentListIcon className='text-gray-300 w-6 h-6 '/>
        }
    ]

  return (
    <div className=' h-full w-[90%] flex flex-col justify-between py-5 '>
        <div className=' h-[90%] w-full'>
            <span className=' text-xl text-gray-400 font-semibold mb-[5%]'>DASHBOARD</span>
            {
                dataDashboard.map((item, index) => (
                    <div key={index} onClick={() => handleClick(item.name)} 
                        className={` ${ name == item.name ? 'bg-[#F7F8FA] text-[#32989a]' : 'bg-white'} cursor-pointer px-[1%] flex h-[10%] w-full justify-between items-center `}
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