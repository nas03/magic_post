'use client';
import React from 'react';
import {
	MagnifyingGlassIcon,
	BellAlertIcon,
	PlusSmallIcon,
} from '@heroicons/react/24/solid';
import { MainContent, SideLeftBar, SideRightBar } from './components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
function Page() {
	const router = useRouter();

	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/');
		},
	});
	//Get user role
	// const role = session?.user?.role;
	// if(role != '....'){
	//     router.push('/');
	// }

	// console.log('session', session?.user?.role);
	// console.log('status', status)
	return (
		<div className=" w-[99vw + 2px] h-[100vh] flex flex-col items-center">
			<div className=" w-full h-[10%] flex justify-between items-center px-[1%] border-y-[1px] shadow-md">
				<div className=" w-[20%] flex gap-[3%]  items-center">
					<div className=" w-[25%]">
						<img
							src="/image/magic-post-high-resolution-logo-transparent.png"
							className="w-full h-full object-contain"
							alt=""
						/>
					</div>
					<div className=" flex flex-col">
						<span className=" text-xl font-semibold">Magic Post</span>
						<span className=" text-gray-200 text-xs">admin panel</span>
					</div>
				</div>
				<form className=" w-[35%] h-[55%] flex justify-center items-center">
					<label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
						Search
					</label>
					<div className="relative w-full">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<svg
								className="w-4 h-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20">
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
						</div>
						<input
							type="text"
							id="search"
							className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search"
							required
						/>
						<button
							type="submit"
							className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Search
						</button>
					</div>
				</form>
				<div className=" w-[12%] h-[55%] flex gap-[5%] justify-between">
					<BellAlertIcon className=" w-[15%]" />
					<div className=" w-[80%] flex bg-[#4C9E9C] text-white h-full justify-center items-center hover:border-2 hover:border-[#4C9E9C] hover:-p-2 hover:bg-white hover:text-[#4C9E9C]">
						<PlusSmallIcon className=" w-[16%] object-contain" />
						<span>Add Report</span>
					</div>
				</div>
			</div>
			<div className=" h-[90%] w-full flex">
				<div className=" h-full w-[15%] flex justify-center border-r-2 border-gray-300">
					<SideLeftBar />
				</div>
				<div className=" h-full w-[65%] flex justify-center border-r-2 border-gray-300">
					<MainContent />
				</div>
				<div className="h-full w-[20%] flex flex-col justify-center">
					<SideRightBar />
				</div>
			</div>
		</div>
	);
}

export default Page;
