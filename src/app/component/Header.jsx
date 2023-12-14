import React from 'react';
import Image from "next/image";
import MinTheinKha from '../../../image/mintheinkhalogo.png'
const Header = () => {
    return (
        <div>
            <div className='flex justify-between border-b border-gray-600 pb-6'>
                <div>
                    <span className='text-5xl font-bold block text-amber-900'>မင်းသိင်္ခ</span>
                    <span className='ml-1'>လက်ထောက်ဗေဒင်</span>
                </div>

                <div>
                    <Image src={MinTheinKha} alt="MinTheinKhaLogo" className='w-24 h-24 rounded-full mr-5'></Image>
                </div>
            </div>
        </div>
    );
};

export default Header;