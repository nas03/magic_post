'use client';
import React, { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import DateTimePickerValue from './DateTime';
import DataTable from './DataTable';
import { useSession } from 'next-auth/react';
import api from '@/src/lib/axios';
import DataAccount from './DataAccount';
import { useSelector } from 'react-redux';
import { table } from 'console';

function MainContent(props) {
	const tableType = useSelector((state: any) => state.dataAdmin.tableType);
	const [currentTable, setCurrentTable] = useState('');

	useEffect(() => {
		setCurrentTable(tableType);
	}, [tableType]);

	return (
		<div className=" w-full h-full p-[2%]">
			<div className=" w-full h-[30%] flex flex-col gap-[5%]">
				<div className=" w-full h-[20%] gap-[1%] flex items-center">
					<span className=" text-3xl font-bold">Hi, Magic Post</span>
					<img src="/image/goodbye.png" className=" w-[5%] h-full" alt="" />
				</div>
				<div className=" h-[55%] w-full flex justify-center">
					<div className=" w-[30%] rounded-l-lg bg-[#FBE2DE] flex gap-[5%] justify-center items-center">
						<img
							src="/image/onGoing.jpg"
							className="w-[35%] h-[80%] rounded-xl object-fill"
							alt=""
						/>
						<div className="flex flex-col justify-between py-[5%] h-[80%]">
							<span className=" font-semibold text-[#54555E]">Received</span>
							<div className=" flex justify-between items-end gap-[30%] w-[80%]">
								<span className=" text-xl font-bold text-[#0F0D16]">
									{props.receivedCount}
								</span>
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
							className="w-[35%] h-[80%] rounded-xl object-fill"
							alt=""
						/>
						<div className="flex flex-col justify-between py-[5%] h-[80%]">
							<span className=" font-semibold text-[#54555E]">Shiped</span>
							<div className=" flex justify-between items-end gap-[30%] w-[80%]">
								<span className=" text-xl font-bold text-[#0F0D16]">
									{props.sentCount}
								</span>
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
							className="w-[35%] h-[80%] rounded-xl object-fill"
							alt=""
						/>
						<div className="flex flex-col justify-between py-[5%] h-[80%]">
							<span className=" font-semibold text-[#54555E]">Completed</span>
							<div className=" flex justify-between items-end gap-[30%] w-[80%]">
								<span className=" text-xl font-bold text-[#0F0D16]">1,327</span>
								<div className=" text-[#4D7B7B] flex">
									<ArrowUpIcon className=" w-4 h-4 " />
									<span className=" text-sm">2.4%</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className=" w-full h-[65%] flex flex-col gap-[5%]">
				<div className=" w-full justify-between flex items-center">
					<span className=" text-[#54555E] font-semibold">
						Shipping Reports
					</span>
					<DateTimePickerValue />
				</div>
				{tableType === 'Employee Account Management' ? (
					<DataAccount
						tableType={currentTable}
						managerRole={props.managerRole}
						managerLocation={props.managerLocation}
					/>
				) : (
					<DataTable
						tableType={currentTable}
						managerRole={props.managerRole}
						managerLocation={props.managerLocation}
					/>
				)}
			</div>
		</div>
	);
}

export default MainContent;
