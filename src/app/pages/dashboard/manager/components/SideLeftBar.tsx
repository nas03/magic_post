'use client';
import React, { useEffect, useState } from 'react';
import {
	ArchiveBoxIcon,
	TruckIcon,
	XCircleIcon,
	ChevronRightIcon,
	UserIcon,
	UserGroupIcon,
} from '@heroicons/react/24/solid';
import { InputContext } from '@/src/components/Header';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import api from '@/src/lib/axios';
import { updateTableType } from '../../../../context/actions/updateDataAdmin';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { formDataToJson } from '@/src/util';

function SideLeftBar() {
	const [name, setName] = useState('');
	const [role, setRole] = useState('');
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	const { data: session } = useSession();
	const [managerRole, setManagerRole] = useState(session?.user?.role || '');
	const [managerLocation, setManagerLocation] = useState(
		session?.user?.location_id || 0
	);
	// Update managerRole when the session changes
	useEffect(() => {
		setManagerRole(session?.user?.role || '');
		setManagerLocation(session?.user?.location_id || 0);
		console.log('role', managerRole, managerLocation);
	}, [session]);

	//* Handle create account function
	const handleClick = async (name: any) => {
		setName(name);
		dispatch(updateTableType(name));
	};
	const handleCreateAccount = async (e: any) => {
		e.preventDefault();

		const formData = formDataToJson(new FormData(e.target));
		console.log('formData', formData);
		const data = {
			fullName: formData['full-name'],
			email: formData.email,
			password: formData.password,
			role: formData.role,
			location_id: formData.location_id,
		};

		const response = await fetch('http://localhost:3000/api/manager/account', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			cache: 'no-cache',
		});
		const body = await response.json();
		console.log('body', body);
		if (!body) {
			console.log('Error');
		}
	};
	const dataDashboard = [
		{
			id: '0',
			name: 'Location Management',
			icon: <TruckIcon className="text-[#32989a] w-6 h-6 " />,
			defaultIcon: <TruckIcon className="text-gray-300 w-6 h-6 " />,
		},
		{
			id: '1',
			name: 'Employee Account Management',
			icon: <UserGroupIcon className="text-[#32989a] w-8 h-8 " />,
			defaultIcon: <UserGroupIcon className="text-gray-300 w-8 h-8 " />,
		},
	];

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
						} cursor-pointer px-1 flex h-[10%] w-full justify-between items-center `}>
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
				Create Staff Account
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
										Create Account
									</h1>
									<form
										className="space-y-4 md:space-y-6"
										action="#"
										onSubmit={(e) => {
											handleCreateAccount(e);
											setShowModal(false);
										}}>
										<div>
											<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
												Full Name
											</label>
											<input
												type="text"
												name="full-name"
												id="full-name"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="John Doe"
												required
											/>
										</div>
										<div>
											<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
												Email
											</label>
											<input
												type="email"
												name="email"
												id="email"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="name@company.com"
												required
											/>
										</div>
										<div>
											<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
												Password
											</label>
											<input
												type="password"
												name="password"
												id="password"
												placeholder="••••••••"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>
										<div>
											<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
												Confirm password
											</label>
											<input
												type="password"
												name="confirm-password"
												id="confirm-password"
												placeholder="••••••••"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>
										<div>
											<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
												Role
											</label>
											<input
												type="text"
												name="role"
												id="role"
												value={
													managerRole == 'BRANCH_CENTER_MANAGER'
														? 'BRANCH_OFFICER'
														: 'HUB_OFFICER'
												}
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>
										<div>
											<label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
												Location ID
											</label>
											<input
												type="number"
												name="location_id"
												id="location_id"
												value={managerLocation}
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>
										<button
											type="submit"
											className="w-full hover:bg-transparent hover:text-[#F79132] hover:border-1 hover:border-[#F79132] bg-[#F79132] text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
											Create an account
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
