'use client';
import React, { ComponentProps, useEffect, useState } from 'react';
import { ArrowSmallLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Divider,
} from '@mui/material';
import Link from 'next/link';
import api from '@/src/lib/axios';
import { Package, TransshipmentLog, Location } from '@/src/util/type';
import { getFormattedDate } from '@/src/util';
import prisma from '@/src/lib/prisma';

const PackageStatus = ({ location }) => {
	return (
		<>
			<div className=" w-[15%] flex-col flex">{location}</div>
		</>
	);
};

const CircleIcon = ({ number }) => {
	return (
		<>
			<div className=" h-[70%] w-6 bg-[#4E4AFF] rounded-full justify-center items-center text-center text-white">
				<span>{number}</span>
			</div>
		</>
	);
};

const Page = ({ params }: { params: { orderNumber: number } }) => {
	const [transLog, setTransLog] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`http://localhost:3000/api/client?package_id=${params.orderNumber}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					cache: 'force-cache',
				}
			);
			const { data } = await response.json();
			setTransLog(data);
			setLoading(false);
			return data;
		};
		fetchData();
	}, []);
	if (loading) {
		// Render a loading indicator
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className=" w-[100vw] h-[100vh] flex justify-center items-center ">
				<div className=" w-full h-full px-[5%] py-[2%]">
					<div className="w-full h-[10%] flex gap-1 text-gray-500">
						<Link
							href={'/'}
							className="w-[3%] h-[50%] hover:-translate-x-3 cursor-pointer object-fill">
							<ArrowSmallLeftIcon className=" w-full h-full" />
						</Link>
						<span className=" text-lg">Orders</span>
					</div>
					<div className=" w-full h-[15%] justify-between flex-col flex px-[1%]">
						<div className=" w-[80%]  flex gap-[3%]">
							<span className=" text-5xl font-semibold">Order details #1</span>
							<div className=" w-[20%] bg-[#EEF2FF] p-2 rounded-xl flex justify-center items-center">
								<span className=" text-[#403DFF] text-xl font-semibold">
									SHIPPING
								</span>
							</div>
						</div>
						<span className=" text-gray-400 ">Date: 08/02/2023</span>
					</div>
					<div className=" w-full h-[20%] my-2 flex-col flex">
						<div className=" w-full h-[30%] relative flex items-center justify-between">
							<img
								src="/image/substract.png"
								className=" w-full h-full px-5"
								alt=""
							/>
							<div className=" absolute bg-lineBackground w-full h-full flex justify-between items-center">
								{/* {transLog.map((index) => (
									<CircleIcon number={index + 1} />
								))} */}
								<CircleIcon number={'22'}/>
							</div>
						</div>
						<div className=" w-full h-[40%] flex justify-between">
							{/* <PackageStatus location={transLog.name} /> */}
						</div>
					</div>
					<div className=" w-full h-[10%] my-[1.5%] justify-between flex">
						<form className=" w-[45%] h-[full] flex-col flex gap-2">
							<label htmlFor="" className=" text-gray-600 font-medium">
								Courier name
							</label>
							<span className=" w-full py-2 px-4 border-2 border-gray-400 rounded-xl">
								Adora Express
							</span>
						</form>
						<form className=" w-[45%] h-[full] flex-col flex gap-2">
							<label htmlFor="" className=" text-gray-600 font-medium">
								Tracking Number
							</label>
							<span className=" w-full py-2 px-4 border-2 border-gray-400 rounded-xl">
								1
							</span>
						</form>
					</div>
					<div className=" w-full h-[40%] flex flex-col gap-5">
						<span className=" text-base font-bold">Item Orders</span>
						<div className="w-full h-[80%] bg-[#d7dbe3] rounded-xl px-[3%] flex gap-[5%] items-center justify-center">
							<List
								sx={{
									width: '80%',
									bgcolor: '#d7dbe3',
								}}
								className=" bg-white rounded-xl">
								<ListItem>
									<ListItemAvatar>
										<Avatar src="/image/diorEaring.avif" />
									</ListItemAvatar>
									<ListItemText
										primary="Dior Tribales Earrings Front View"
										secondary="Beige Multicolor Mizza"
									/>
									<ListItemText primary="1x" />
									<ListItemText primary="$450 000 USD" />
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem className=" w-full">
									<ListItemAvatar>
										<Avatar src="/image/slingback.jpg" />
									</ListItemAvatar>
									<ListItemText
										primary="Mizza Slingback Ballerina Flat"
										secondary="Multicolor Shiny"
									/>
									<ListItemText primary="1x" />
									<ListItemText primary="$450 000 USD" />
								</ListItem>
								<Divider variant="inset" component="li" />
							</List>

							<List
								sx={{
									width: '40%',
									bgcolor: '#d7dbe3',
								}}
								className=" bg-white rounded-xl">
								<ListItem>
									<ListItemText
										primary="Product Total"
										secondary="Shipping cost"
									/>
									<ListItemText primary="$ 900 000 USD" secondary="Free" />
								</ListItem>
								<Divider />
								<ListItem className=" w-full">
									<ListItemText primary="Total Cost" className=" font-bold" />
									<ListItemText primary={`$ ${90}`} className=" font-bold" />
								</ListItem>
								<Divider />
							</List>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
