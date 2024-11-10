// components/Navbar.tsx
import React from 'react';
import Image from 'next/image';
import logo from '/public/logo.svg';

const Navbar: React.FC = () => {
    return (
        <nav className="flex items-center justify-between w-full py-4 px-8 bg-[#2074ec]">
            <div className="flex items-center">
                <Image src={logo} alt="daddy" width={100} height={100} />
                <div className="ml-4 text-white">
                    <span className="block text-2xl font-semibold">Election Commission Of India</span>
                    <h2 className="text-2xl font-semibold">भारत निवारण आयोग</h2>
                </div>
            </div>
            <div className="text-white text-right">
                <span className="block text-2xl font-semibold">Voting Portal</span>
                <h2 className="block text-2xl font-semibold">वोटिंग पोर्टल</h2>
            </div>
        </nav>
    );
};

export default Navbar;
