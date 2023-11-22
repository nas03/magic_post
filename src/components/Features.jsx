import React from 'react';
import { FireIcon, PlayIcon } from '@heroicons/react/24/solid';

function Features() {
	return (
		<div
			name="features"
			className=" w-[100vw] h-[80vh] bg-[#FAFAFA] flex justify-between items-center px-[10%] gap-[5%] py-[5%] ">
			<div className=" w-[40%] h-[80%] flex flex-col gap-5">
				<div className=" flex  w-[100%] relative">
					<span className=" text-5xl font-medium">
						Our core feature on magic post
					</span>
					<FireIcon
						className=" w-[15%] translate-y-6 -translate-x-[400%] z-40 "
						color="#F79132"
					/>
				</div>
				<p className=" text-gray-400 text-sm">
					We offer everything you need for the delivery of your goods, the
					products sent can be viewed live streaming, because we use cameras on
					our helmets
				</p>
				<div className=" text-white w-[30%] h-[50px] bg-[#F79132] justify-center items-center flex rounded-xl cursor-pointer hover:bg-white hover:border-2 hover:border-[#F79132] hover:text-[#F79132]">
					<span>View more</span>
				</div>
			</div>
			<div className=" w-[50%] h-[90%] flex relative justify-center items-center">
				<div className=" animate-wiggle w-[60%] h-[100%] bg-white border-2 rounded-xl justify-center items-center flex-col flex px-5">
					<div className=" relative w-[100%] h-[70%] mb-5 bg-[#E5AD67] rounded-xl justify-center items-center flex">
						<img
							src="./image/Brown_Aesthetic.png"
							className="w-[100%] h-[100%] rounded-xl"
							alt=""
						/>
						<div className=" w-[40%] h-[50%] rounded-full bg-[#EDCEA8] absolute justify-center items-center flex">
							<img
								src="./image/freshBox.png"
								className=" w-[80%] h-[80%]"
								alt=""
							/>
						</div>
					</div>
					<div className=" w-[100%] flex justify-between items-center">
						<div className=" flex flex-col gap-2 w-[80%]">
							<span className=" text-3xl font-semibold">Check Receipts</span>
							<span className=" text-gray-400">Check from anywhere</span>
						</div>
						<div className="w-[12%] h-[60%] rounded-full border-2 flex justify-center items-center ">
							<PlayIcon className=" w-[90%]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Features;
