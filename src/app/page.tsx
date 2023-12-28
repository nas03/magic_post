'use client'
import {
	About,
	Features,
	Feedback,
	Footer,
	Gallery,
	Intro,
	Header,
} from '@/src/components';
import Image from 'next/image';
import { Provider } from 'react-redux'
import myStore from '../app/context/store'

export default function Home() {
	return (
	<Provider store={myStore}>
		<div className=" w-[98vw + 2px] justify-center items-center flex flex-col overflow-hidden bg-white">
			<Header />
			<About />
			<Features />
			<Gallery />
			<Feedback />
			<Intro />
			<Footer />
		</div>
	</Provider>
	);
}
