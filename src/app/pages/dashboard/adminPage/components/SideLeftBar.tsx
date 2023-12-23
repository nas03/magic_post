'use client'
import React, {useState} from 'react'
import { ArchiveBoxIcon, TruckIcon, XCircleIcon, ChevronRightIcon, BuildingStorefrontIcon, UserGroupIcon, ChatBubbleLeftRightIcon, BookOpenIcon, BanknotesIcon, Squares2X2Icon, UserIcon } from '@heroicons/react/24/solid'
import { InputContext } from '@/src/components/Header'
import { InputLabel } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function SideLeftBar() {
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [showModal, setShowModal] = useState(false)

    const handleClick = (name:any) => {
        setName(name)
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
            name: 'Transaction Point',
            icon: <BanknotesIcon className='text-[#32989a] w-6 h-6 '/>,
            defaultIcon: <BanknotesIcon className='text-gray-300 w-6 h-6 '/>
        },
        {
            id: '2',
            name: 'Gathering Leader',
            icon: <UserIcon className='text-[#32989a] w-6 h-6 '/>,
            defaultIcon: <UserIcon className='text-gray-300 w-6 h-6 '/>
        },
        {
            id: '3',
            name: 'Transaction Leader',
            icon: <UserIcon className='text-[#32989a] w-6 h-6 '/>,
            defaultIcon: <UserIcon className='text-gray-300 w-6 h-6 '/>
        },
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
        <button onClick={() => setShowModal(true)} className=' rounded-md bg-[#4C9E9C] py-2 text-xs cursor-pointer text-white hover:bg-transparent hover:border-2 hover:border-[#4C9E9C] hover:text-[#4C9E9C]'>Create Transaction Staff Account</button>
            {showModal ? (
            <>
                <div className="justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className=' bg-white rounded-md flex flex-col justify-center items-center relative'>
                            <XCircleIcon onClick={() => setShowModal(false)} color='red' className=' z-50 w-5 h-5 absolute right-[5%] top-[5%] object-contain  cursor-pointer'/>
                            <div className="flex justify-center py-5 items-center text-2xl font-semibold text-gray-900 dark:text-white">
                                <img className="w-8 h-8 mr-2 rounded-full" src="/image/magic-post-logo.png" alt="logo"/>
                                Magic Post    
                            </div>
                            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Create Transaction Staff Account
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                                        </div>
                                        <div>
                                            <label  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                            <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Location ID</label>
                                            <input type="number" name="confirm-password" id="confirm-password" placeholder="Ex: ChIJhSxoJzyuEmsR9gBDBR09ZrE" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                        </div>
                                        <div>
                                            <FormControl sx={{ m: 0.3, minWidth: 380 }} className=' bg-gray-50 border border-gray-300'>
                                                <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={role}
                                                onChange={((role:SelectChangeEvent) => setRole(role.target.value))}
                                                autoWidth
                                                label="Age"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10} className=' text-black'>Hub Manager</MenuItem>
                                                <MenuItem value={21} className=' text-black'>Branch Manager</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <button type="submit" onClick={() => setShowModal(false)} className="w-full hover:bg-transparent hover:text-[#F79132] hover:border-1 hover:border-[#F79132] bg-[#F79132] text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
    </div>
  )
}

export default SideLeftBar