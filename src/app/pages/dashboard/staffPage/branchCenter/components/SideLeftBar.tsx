'use client';
import React, { useState } from 'react';
import {
	ArchiveBoxIcon,
	TruckIcon,
	ClipboardDocumentListIcon,
	ChevronRightIcon,
	BuildingStorefrontIcon,
	UserGroupIcon,
	ChatBubbleLeftRightIcon,
	BookOpenIcon,
	BanknotesIcon,
	Squares2X2Icon,
	XCircleIcon,
	UserIcon,
} from '@heroicons/react/24/solid';
import { InputContext } from '@/src/components/Header';
import { InputLabel } from '@mui/material';
import { updateTableGather } from '../../../../../context/actions/updateTable';
import { useDispatch } from 'react-redux';
import { formDataToJson } from '@/src/util';

function SideLeftBar({ staffLocation }) {
	const [name, setName] = useState('');
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();

	const handleClick = (name: any) => {
		setName(name);
		dispatch(updateTableGather(name));
	};

	const dataDashboard = [
		{
			id: '0',
			name: 'Gathering Point',
			icon: <TruckIcon className="text-[#32989a] w-6 h-6 " />,
			defaultIcon: <TruckIcon className="text-gray-300 w-6 h-6 " />,
		},
		{
			id: '1',
			name: 'Create Orders',
			icon: <ClipboardDocumentListIcon className="text-[#32989a] w-6 h-6 " />,
			defaultIcon: (
				<ClipboardDocumentListIcon className="text-gray-300 w-6 h-6 " />
			),
		},
	];
	const handleCreatePackage = async (e: any) => {
		e.preventDefault();
		const formData = formDataToJson(new FormData(e.target));
		const data = {
			sender: formData.sender,
			receiver: formData.receiver,
			sender_location: formData.sender_location,
			receiver_location: formData.receiver_location,
			sender_phone: formData.sender_phone,
			receiver_phone: formData.receiver_phone,
			type: formData.type,
			fee: 90,
			received_location_id: staffLocation,
			destination_location_id: Number(formData.destination_location_id),
		};
		const response = await fetch('http://localhost:3000/api/employee/package', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			cache: 'no-cache',
		});
		const body = await response.json();
		if (!body.data) {
			//TODO:Show ERROR
		}
	};
	return (
		<div className=" h-full w-[90%] flex flex-col justify-between py-5 ">
			<div className=" h-[90%] w-full">
				<span className=" text-xl text-gray-400 font-semibold mb-[5%]">
					DASHBOARD
				</span>
				{dataDashboard.map((item, index) => (
					<div
						key={index}
						onClick={() => handleClick(item.name)}
						className={` ${
							name == item.name ? 'bg-[#F7F8FA] text-[#32989a]' : 'bg-white'
						} cursor-pointer px-[1%] flex h-[10%] w-full justify-between items-center `}>
						<div className=" w-full flex gap-[3%] items-center">
							{name == item.name ? item.icon : item.defaultIcon}
							<span className=" font-medium">{item.name}</span>
						</div>
						{name == item.name ? (
							<ChevronRightIcon className=" w-6 h-6 text-[#32989a] " />
						) : (
							''
						)}
					</div>
				))}
			</div>
			<button
				onClick={() => setShowModal(true)}
				className=" rounded-md bg-[#4C9E9C] py-2 text-xs cursor-pointer text-white hover:bg-transparent hover:border-2 hover:border-[#4C9E9C] hover:text-[#4C9E9C]">
				Create New Order
			</button>
			{showModal ? (
				<>
					<div className="justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="  w-[40vw] py-5 bg-white rounded-md flex flex-col justify-center items-center relative">
							<XCircleIcon
								onClick={() => setShowModal(false)}
								color="red"
								className=" z-50 w-5 h-5 absolute right-[5%] top-2 object-contain cursor-pointer"
							/>
							<div className="flex justify-center py-5 items-center text-2xl font-semibold text-gray-900 dark:text-white">
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
										Create New Order
									</h1>
									<form
										className="space-y-4 md:space-y-6 h-100 overflow-y-scroll"
										action="#"
										onSubmit={(e) => {
											handleCreatePackage(e);
											setShowModal(false);
										}}>
										<div className="flex flex-row">
											<div>
												<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
													Sender Name
												</label>
												<input
													type="text"
													name="sender"
													id="sender"
													className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
													placeholder=""
													required
												/>
											</div>
											<div>
												<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
													Sender Phone Number
												</label>
												<input
													type="text"
													name="sender_phone"
													id="sender_phone"
													className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
													placeholder=""
													required
												/>
											</div>
										</div>
										<div>
											<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
												Sender Location
											</label>
											<input
												type="text"
												name="sender_location"
												id="sender_location"
												placeholder=""
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>
										<div className="flex flex-row">
											<div className="flex-grow">
												<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
													Receiver Name
												</label>
												<input
													type="text"
													name="receiver"
													id="receiver"
													placeholder=""
													className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
													required
												/>
											</div>
											<div>
												<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
													Receiver Phone Number
												</label>
												<input
													type="text"
													name="receiver_phone"
													id="receiver_phone"
													placeholder=""
													className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
													required
												/>
											</div>
										</div>
										<div>
											<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
												Receiver Location
											</label>
											<input
												type="text"
												name="receiver_location"
												id="receiver_location"
												placeholder=""
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>

										<div>
											<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
												Package Type
											</label>
											<select
												name="type"
												id="type"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required>
												<option value="DOCUMENT">DOCUMENT</option>
												<option value="GOODS">GOODS</option>
											</select>
										</div>
										<div>
											<div className="flex flex-row">
												<div className="">
													<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
														Destination
													</label>
													<input
														type="number"
														name="destination_location_id"
														id="destination_location_id"
														placeholder="Destination"
														className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
														required
													/>
												</div>
												<div className="">
													<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
														State
													</label>
													<input
														type="text"
														name="state"
														id="state"
														placeholder=""
														value={'ONGOING'}
														className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
														required
													/>
												</div>
											</div>
										</div>

										<button
											type="submit"
											className="w-full hover:bg-transparent hover:text-[#F79132] hover:border-1 hover:border-[#F79132] bg-[#F79132] text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
											Create New Order
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
	);
}

export default SideLeftBar;
