import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <header className="h-15 sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/admin"
                className="text-xl font-bold text-gray-900 hover:text-[#00a497] transition-colors"
              >
                It.dev
              </Link>
            </div>
            <div>
              <nav className="hidden md:flex space-x-4">
                <Link
                  href="#profile-title"
                  className="text-gray-600 hover:text-[#00a497] transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href="#services-title"
                  className="text-gray-600 hover:text-[#00a497] transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="#contact-title"
                  className="text-gray-600 hover:text-[#00a497] transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
