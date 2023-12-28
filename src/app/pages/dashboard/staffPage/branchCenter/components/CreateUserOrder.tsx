import { XCircleIcon } from '@heroicons/react/24/solid'
import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {updateSenderBranch,  updateSenderLocation, updateSenderPhone, updateReceiverBranch, updateReceiverLocation, updateReceiverPhone, updateCustomInstruction} from '../../../../../context/actions/updateDataBranch'
import Link from 'next/link';

const CreateUserOrder = () => {
    const [showModal, setShowModal] = useState(false);
	const [showModalBill, setShowModalBill] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const dispatch = useDispatch();
	const dataBranch = useSelector((state:any) => state.dataBranch)

	console.log('sender', dataBranch.sender)

    const openBillHandle = () => {
		setShowModalBill(true);
		setShowModal(true)
	
	};


  return (
             <>
					<button
						onClick={() => openBillHandle()}
						className=" rounded-md p-2 bg-[#4C9E9C] py-2 text-xs cursor-pointer text-white hover:bg-transparent hover:border-2 hover:border-[#4C9E9C] hover:text-[#4C9E9C]">
						Create User Orders
					</button>
					{showModal ? (
						<>
						<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className=' w-[60vw] py-5 bg-white rounded-md flex flex-col justify-center items-center relative'>
                                    <XCircleIcon onClick={() => setShowModal(false)} color='red' className=' z-50 w-5 h-5 absolute right-[5%] top-[5%] object-contain  cursor-pointer'/>
                                    <div className="flex items-center py-5 text-2xl font-semibold text-gray-900 dark:text-white ">
                                        <img className="w-8 h-8 mr-2 rounded-full" src="/image/magic-post-logo.png" alt="logo"/>
                                        Magic Post    
                                    </div>
                                    <div className="w-[40vw] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                        <div className="p-5 space-y-4 md:space-y-6 sm:p-8">
                                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                                Modify Information
                                            </h1>
                                            <form className="space-y-4 md:space-y-6 grid items-end justify-center grid-cols-2 gap-2" action="#">
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Sender
														</label>
														<input
															type="text"
															onChange={(e) => dispatch(updateSenderBranch(e.target.value))}
															className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															required
														/>
													</div>
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Sender Location
														</label>
														<input
															type="text"
															onChange={(e) => dispatch(updateSenderLocation(e.target.value))}
															className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															required
														/>
													</div>
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Sender Phone Number
														</label>
														<input
															type="text"
															onChange={(e) => dispatch(updateSenderPhone(e.target.value))}
															className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															required
														/>
													</div>
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Receiver
														</label>
														<input
															type="text"
															onChange={(e) => dispatch(updateReceiverBranch(e.target.value))}
															className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															required
														/>
													</div>
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Receiver Location
														</label>
														<input
															type="text"
															onChange={(e) => dispatch(updateReceiverLocation(e.target.value))}
															className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															required
														/>
													</div>
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Receiver Phone Number
														</label>
														<input
															type="text"
															onChange={(e) => dispatch(updateReceiverPhone(e.target.value))}
															className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															required
														/>
													</div>
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Order Type
														</label>
														<span className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{dataBranch.orderType}</span>
													</div>
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Custom Intruction
														</label>
														<input
															type="text"
															onChange={(e) => dispatch(updateCustomInstruction(e.target.value))}
															className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															required
														/>
													</div>
                                               <Link href={'/pages/dashboard/staffPage/branchCenter/user-Order'} className="w-full hover:bg-transparent hover:text-[#F79132] hover:border-1 hover:border-[#F79132] bg-[#F79132] text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Generate Bill</Link>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
						</>
					) : null}
			</>
  )
}

export default CreateUserOrder