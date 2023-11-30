'use client';
import React, { useState, createContext } from 'react';
import { useRouter } from 'next/navigation';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react';
import QRCode from './QRCode';
import axios from 'axios';
import { Link } from 'react-scroll';
import LogIn from './LogIn';
import CustomButton from './CustomButton';

export const InputContext = createContext();

const Header = () => {
	const router = useRouter();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [response, setResponse] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const [orderNumber, setOrderNumber] = useState('');

	const config = {
		headers: { Authorization: 'Bearer 1e818890-8aea-11ee-b22a-0dc7d55af999' },
	};
	const bodyParameters = {
		colorDark: 'black',
		qrCategory: 'url',
		text: orderNumber,
	};
	const getQrCode = async () => {
		try {
			setLoading(true);
			const res = await axios.post(
				'https://qrtiger.com/api/qr/static',
				bodyParameters,
				config
			);
			setResponse(res.data.url);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	const value = {
		orderNumber,
		getQrCode,
		response,
		loading,
		error,
	};

	const handleSubmit = () => {
		getQrCode();
		onOpen();
	};

	return (
		<div id="home" className=" w-[100vw] h-[100vh] flex flex-col relative ">
			<img
				src="/image/background.jpg"
				className=" w-[100%] h-[100%] object-cover saturate-50"
				alt=""
			/>
			<div className=" absolute w-[100%] h-[25%] flex justify-between p-[2%]">
				<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">
									QR code of your order
								</ModalHeader>
								<ModalBody>
									<InputContext.Provider value={value}>
										<QRCode />
									</InputContext.Provider>
								</ModalBody>
								<ModalFooter>
									<CustomButton orderNumber={orderNumber} />
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
				<Link
					to="home"
					spy={true}
					smooth={true}
					offset={50}
					duration={500}
					className="w-[70px] z-50 cursor-pointer">
					<img
						className=" z-50"
						src="./image/magic-post-high-resolution-logo-transparent.png"
					/>
				</Link>
				<div className=" text-gray-500 ">
					<ul className=" max-md:text-sm max-sm:text-xs flex gap-[20%] justify-center items-center py-[3%]">
						<Link
							to="home"
							spy={true}
							smooth={true}
							offset={50}
							duration={500}
							className="hover:text-white cursor-pointer">
							HOME
						</Link>
						<Link
							to="about"
							spy={true}
							smooth={true}
							duration={500}
							className="hover:text-white cursor-pointer">
							ABOUT
						</Link>
						<Link
							to="features"
							spy={true}
							smooth={true}
							duration={500}
							className="hover:text-white cursor-pointer">
							FEATURE
						</Link>
						<Link
							to="feedback"
							spy={true}
							smooth={true}
							duration={500}
							className="hover:text-white cursor-pointer">
							FEEDBACK
						</Link>
					</ul>
				</div>
				<LogIn />
			</div>
			<div className=" flex p-[6%] w-[100vw] h-[80%] absolute justify-between items-center bottom-0 ">
				<div className=" text-white w-[30%] gap-[5%] flex-col flex">
					<span className="max-lg:text-4xl max-md:text-2xl text-6xl font-semibold">
						The powerfull shipping app in the world
					</span>
					<span className="max-lg:text-sm max-md:text-xs text-gray-400 py-6">
						We serve your shipments quickly and safely. Purdence and Security of
						carried on our couriers will be truly maintained until the
						destination.
					</span>
					<div className=" h-[95%] justify-center items-center flex">
						<input
							onChange={(e) => setOrderNumber(e.target.value)}
							value={orderNumber}
							className=" max-lg:text-sm max-md:text-xs pl-2 appearance-none bg-white rounded-l-xl text-gray-700 h-[5vh] w-[70%] leading-tight focus:outline-none border-medium border-teal-500"
							type="text"
							placeholder="Search your order"
							aria-label="Full name"
						/>
						<button
							onClick={() => handleSubmit()}
							className=" max-lg:text-sm max-md:text-xs w-[30%] h-[5vh] rounded-r-xl text-center bg-[#029827]">
							Search Now
						</button>
					</div>
				</div>
				<div className=" max-lg:right-0 max-sm:w-[35vw] w-[40vw] h-[80vh] right-[5%] z-40 flex">
					<img
						src="/image/Sale_Box_1.png"
						className=" w-[20%] h-[20%] -mx-20 animate-bounce object-fill top-0 z-40"
						alt=""
					/>
					<img
						src="/image/Delivery_Success_(1).png"
						className=" animate-go w-[100%] h-[90%] transition-transform duration-20 "
						alt=""
					/>
					<img
						src="/image/Business_Remote.png"
						className=" max-sm:h-[20%] animate-wiggle w-[30%] h-[30%] bottom-2 right-0"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
