import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Session from '@/src/components/SessionProvider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Magic Post',
	description: 'The Magic Post that everyone need',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Session>{children}</Session>
			</body>
		</html>
	);
}
