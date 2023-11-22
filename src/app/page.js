import Image from 'next/image';
import {
	Header,
	About,
	Features,
	Gallery,
	Feedback,
	Intro,
	Footer,
} from '@/components/index';

export default function Home() {
	return (
		<div className=" w-[98vw + 2px] justify-center items-center flex flex-col overflow-hidden">
			<Header />
			<About />
			<Features />
			<Gallery />
			<Feedback />
			<Intro />
			<Footer />
		</div>
	);
}
