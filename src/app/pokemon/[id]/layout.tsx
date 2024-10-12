import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div
			className={
				"relative flex flex-col items-center justify-center min-h-screen"
			}>
			<Link href='/' className='mb-10'>
				<Button>Back Home</Button>
			</Link>
			{children}
		</div>
	);
}
