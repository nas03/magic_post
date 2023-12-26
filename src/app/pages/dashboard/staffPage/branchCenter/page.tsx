'use client';
import {
	MagnifyingGlassIcon,
	BellAlertIcon,
	PlusSmallIcon,
	ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { MainContext, SideLeftBar } from './components';
import { signOut } from 'next-auth/react';
import myStore from '../../../../context/store';
import { Provider } from 'react-redux';
import { useState } from 'react';
import api from '@/src/lib/axios';

const fetchRowsData = async (location_id: number) => {
	try {
		const response = await api.get('/api/branch-officer/client', {
			params: {
				location_id,
			},
		});
		const data = response.data.data;
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};

const fetchPackageData = async (package_id: number) => {
	try {
		const response = await api.get('/api/branch-officer/package', {
			params: {
				package_id,
			},
		});
		const data = response.data.data;
		return data;
	} catch (error) {
		console.log('Error fetching package to UI', error);
		return null;
	}
};
function Page() {
	const [rowsData, setRowsData] = useState(null);
	const { data: session } = useSession();
	if (session && session.user.location_id) {
		const fetchAllData = async () => {
			const rows = await fetchRowsData(session.user.location_id);
			// const package = await fetchPackageData();

			console.log('rows', rows);
			setRowsData(rows);
		};
		fetchAllData();
	}

	return (
		<Provider store={myStore}>
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
							<span className="text-xl font-semibold">Magic Post</span>
							<span className="text-gray-200 text-xs">staff panel</span>
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
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
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
					<div className=" w-[10%] h-[55%] flex gap-[5%] justify-end">
						<BellAlertIcon className=" w-[15%]" />
						<div className=" w-[60%] flex rounded-md cursor-pointer gap-1 bg-[#4C9E9C] text-white h-full justify-center items-center hover:border-2 hover:border-[#4C9E9C] hover:bg-white hover:text-[#4C9E9C]">
							<ArrowLeftOnRectangleIcon className=" w-[20%] object-contain" />
							<span
								onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
								Log out
							</span>
						</div>
					</div>
				</div>
				<div className=" h-[90%] w-full flex">
					<div className=" h-full w-[15%] flex justify-center">
						<SideLeftBar />
					</div>
					<div className=" h-full w-[85%] flex justify-center border-l-2 border-gray-300 ">
						<MainContext tableData={rowsData} />
					</div>
				</div>
			</div>
		</Provider>
	);
}

export default Page;
