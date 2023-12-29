'use client';
import React, { useEffect, useState } from 'react';
import {
	ArrowUpIcon,
	MapPinIcon,
	XCircleIcon,
} from '@heroicons/react/24/solid';
import DateTimePickerValue from './DateTime';
import DataTable from './DataTable';
import { useSelector, useDispatch } from 'react-redux';
import {
	updateOrderList,
	clearOrderName,
	clearOrderType,
} from '../../../../../context/actions/updateOrderList';
import CreateUserOrder from './CreateUserOrder';
import DataTransshipment from './DataTransshipment';
import UpdateOrderState from './UpdateOrderState';
import SwitchButton from './SwitchButton';

const MainContext = (props) => {
	console.log(props.tableData);
	const dispatch = useDispatch();
	const tableType = useSelector((state: any) => state.tableData.tableData);
	const orderNameList = useSelector((state: any) => state.orderList.nameList);
	const orderTypeList = useSelector((state: any) => state.orderList.typeList);
	const orderList = useSelector((state: any) => state.orderList.orderList);
	const [showModal, setShowModal] = useState(false);

	if (orderList[1] != null) {
		console.log('name list', orderList[orderList.length - 1].col2);
	}

	const createOrderHandle = () => {
		dispatch(clearOrderName(''));
		dispatch(clearOrderType(''));
		setShowModal(false);
	};


	return (
		<div className=" w-full h-full p-[2%]">
			{tableType == 'Gathering Point' ? (
				<div className=" w-full h-[30%] flex flex-col gap-[5%]">
					<div className=" w-full h-[20%] gap-[1%] flex items-center">
						<span className=" text-3xl font-bold">Hi, Magic Post</span>
						<img src="/image/goodbye.png" className=" w-[3%] h-full" alt="" />
					</div>
					<div className=" h-[55%] w-full flex justify-center">
						<div className=" w-[30%] rounded-l-lg bg-[#FBE2DE] flex gap-[5%] justify-center items-center">
							<img
								src="/image/onGoing.jpg"
								className="w-[25%] h-[80%] rounded-xl object-fill"
								alt=""
							/>
							<div className="flex flex-col justify-between py-[5%] h-[80%]">
								<span className=" font-semibold text-[#54555E]">
									Return Transaction Point
								</span>
								<div className=" flex justify-between items-end gap-[30%] w-[80%]">
									<span className=" text-xl font-bold text-[#0F0D16]">259</span>
									<div className=" text-red-500 flex">
										<ArrowUpIcon className=" w-4 h-4 " />
										<span className=" text-sm">12.4%</span>
									</div>
								</div>
							</div>
						</div>
						<div className=" w-[30%] border-x-2 border-white bg-[#E5D6EB] flex gap-[5%] justify-center items-center">
							<img
								src="/image/shiped.jpg"
								className="w-[25%] h-[80%] rounded-xl object-fill"
								alt=""
							/>
							<div className="flex flex-col justify-between py-[5%] h-[80%]">
								<span className=" font-semibold text-[#54555E]">
									Unsuccessful Shipping
								</span>
								<div className=" flex justify-between items-end gap-[30%] w-[80%]">
									<span className=" text-xl font-bold text-[#0F0D16]">320</span>
									<div className=" text-violet-500 flex">
										<ArrowUpIcon className=" w-4 h-4 " />
										<span className=" text-sm">10.4%</span>
									</div>
								</div>
							</div>
						</div>
						<div className=" w-[30%] rounded-r-lg bg-[#C9E9E4] flex gap-[5%] justify-center items-center">
							<img
								src="/image/completed.jpg"
								className="w-[25%] h-[80%] rounded-xl object-fill"
								alt=""
							/>
							<div className="flex flex-col justify-between py-[5%] h-[80%]">
								<span className=" font-semibold text-[#54555E]">
									Successful Shipping
								</span>
								<div className=" flex justify-between items-end gap-[30%] w-[80%]">
									<span className=" text-xl font-bold text-[#0F0D16]">
										1,327
									</span>
									<div className=" text-[#4D7B7B] flex">
										<ArrowUpIcon className=" w-4 h-4 " />
										<span className=" text-sm">2.4%</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				''
			)}

			{/* table session */}

			{tableType == 'Packages' ? (
				<>
					<div className=" w-full h-[85%] flex flex-col gap-[5%]">
						<div className=" w-full justify-between flex items-center">
							<span className=" text-[#54555E] font-semibold">
								Shipping Reports
							</span>
							<DateTimePickerValue />
						</div>
						<div>
							<DataTransshipment />
						</div>
					</div>
					<div className=" w-full flex justify-end items-center h-[10%]">
						<button
							onClick={() => setShowModal(true)}
							className=" rounded-md p-2 bg-[#4C9E9C] py-2 text-xs cursor-pointer text-white hover:bg-transparent hover:border-2 hover:border-[#4C9E9C] hover:text-[#4C9E9C]">
							Verify Orders
						</button>
						{showModal ? (
							<>
								<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
									<div className=" w-[40vw] py-5 bg-white rounded-md flex flex-col justify-center items-center relative">
										<XCircleIcon
											onClick={() => setShowModal(false)}
											color="red"
											className=" z-50 w-5 h-5 absolute right-[5%] top-[5%] object-contain  cursor-pointer"
										/>
										<div className="flex items-center py-5 text-2xl font-semibold text-gray-900 dark:text-white">
											<img
												className="w-8 h-8 mr-2 rounded-full"
												src="/image/magic-post-logo.png"
												alt="logo"
											/>
											Magic Post
										</div>
										<div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
											<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
												<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
													Create Shipping Order
												</h1>
												<form className="space-y-4 md:space-y-6" action="#">
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Order Name
														</label>
														<input
															id="Order Name"
															placeholder={orderNameList}
															required
															className="bg-gray-50 py-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
														/>
													</div>
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Order Type
														</label>
														<input
															id="Order Name"
															placeholder={orderTypeList}
															required
															className="bg-gray-50 py-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
														/>
													</div>
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Come From
														</label>
														<input
															id="come from"
															placeholder="Empty"
															required
															className="bg-gray-50 py-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
														/>
													</div>
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Roads to goal
														</label>
														{/* <div className=" w-full h-[5vw] flex justify-between">
														{
															<div className=" w-full, h-[60%]">
																<MapPinIcon className=" w-3 h-3 object-contain" />
																<span className=" text-black">
																	{orderList[0].col2}
																</span>
															</div>
														}
													</div> */}
														<input
															id="Roads"
															placeholder="Empty"
															required
															className="bg-gray-50 py-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
														/>
													</div>
													<button
														type="submit"
														onClick={() => createOrderHandle()}
														className="w-full hover:bg-transparent hover:text-[#F79132] hover:border-1 hover:border-[#F79132] bg-[#F79132] text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
														Confirm Orders Received
													</button>
												</form>
											</div>
										</div>
									</div>
								</div>
								<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
							</>
						) : null}
					</div>
				</>
			) : (
				<>
					<div className=" w-full h-[65%] flex flex-col gap-[5%]">
						<div className=" w-full justify-between flex items-center">
							<span className=" text-[#54555E] font-semibold">
								Shipping Reports
							</span>
							<DateTimePickerValue />
						</div>
						<DataTable />
					</div>
					<div className=" w-full flex justify-end items-center gap-2 h-[25%]">
						<SwitchButton tableType={tableType}/>
						{/* <button
						onClick={() => openBillHandle()}
						className=" rounded-md p-2 bg-[#4C9E9C] py-2 text-xs cursor-pointer text-white hover:bg-transparent hover:border-2 hover:border-[#4C9E9C] hover:text-[#4C9E9C]">
						Create User Orders
					</button> */}
					</div>
				</>
			)}
		</div>
	);
};

export default MainContext;
