"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const scrollToSection = (sectionId: string) => {
	const element = document.getElementById(sectionId);
	if (element) {
		element.scrollIntoView({ behavior: "smooth" });
	}
};

const Header = () => {
	const pathname = usePathname();
	const isLandingPage = pathname === "/";

	return (
		<>
			<header className="h-15 sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow">
				<div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<Link
								href="/"
								className="text-xl font-bold text-gray-900 hover:text-[#00a497] transition-colors"
							>
								It.dev
							</Link>
						</div>
						{isLandingPage && (
							<nav className="flex space-x-10">
								{['profile-title', 'services-title', 'works-title'].map((sectionId) => (
									<Link
										key={sectionId}
										href="#"
										onClick={(e) => {
											e.preventDefault();
											scrollToSection(sectionId);
										}}
										className='text-gray-600 hover:text-[#00a497] transition-colors'
									>
										{sectionId.replace("-title", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
									</Link>
								))}
							</nav>
						)}
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
