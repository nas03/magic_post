'use client';
import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { SignInOptions, SignInResponse, signIn } from 'next-auth/react';
import { sign } from 'crypto';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
function page() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const router = useRouter();
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		console.log('Submit Form');
		const formData = new FormData(e.target);
		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirm-password');

		const response = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});
		console.log('responses', response);
		if (response?.ok) {
			router.push('/pages/adminPage');
		} else {
			//TODO: @Babybluess Show error on page
			const error = response?.error;
		}
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
					<img
						className="w-8 h-8 mr-2 rounded-full"
						src="/image/magic-post-logo.png"
						alt="logo"
					/>
					Magic Post
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Your Account
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							action="#"
							onSubmit={(e) => handleSubmit(e)}>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									onChange={(e) => setEmail(e.target.value)}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@company.com"
									required
								/>
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									onChange={(e) => setPassword(e.target.value)}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Confirm password
								</label>
								<input
									type="password"
									name="confirm-password"
									id="confirm-password"
									placeholder="••••••••"
									onChange={(e) => setConfirmPassword(e.target.value)}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										id="terms"
										aria-describedby="terms"
										type="checkbox"
										className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										required
									/>
								</div>
								<div className="ml-3 text-sm">
									<label className="font-light text-gray-500 dark:text-gray-300">
										I accept the{' '}
										<a
											className="font-medium text-primary-600 hover:underline dark:text-primary-500"
											href="#">
											Terms and Conditions
										</a>
									</label>
								</div>
							</div>
							<div>
								<button
									type="submit"
									className=" hover:w-full hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-[#F79132] text-white hover:text-[#F79132] hover:border-2 hover:border-[#F79132] hover:bg-transparent">
									Login
								</button>
							</div>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Already have an account?{' '}
								<a
									href="#"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500">
									Sign up here
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default page;