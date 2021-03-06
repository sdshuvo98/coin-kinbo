import React, { useContext } from 'react';
import { ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/outline'
import CustomLink from '../CustomLink/CustomLink';
import { Link } from 'react-router-dom';
import { PathContext } from '../../App';

const Header = ({ crypto }) => {
    let quantity = 0;
    crypto.forEach(cryp => {
        quantity = quantity + cryp.quantity;
    })

    const path = useContext(PathContext)
    return (
        <nav className='flex items-center justify-between px-[100px] py-3 sticky top-0 z-10' style={path.includes('/home') || path.length <= 1 ? { backgroundColor: 'transparent' } : { backgroundColor: '#0f172a' }}>
            <div className='text-2xl font-semibold'>
                <Link to='/home'><h2>Coin<span className='text-rose-500'>Kinbo</span></h2></Link>
            </div>
            <div className='flex gap-5'>
                <CustomLink to='/home'>Home</CustomLink>
                <CustomLink to='/coins'>Coins</CustomLink>
                <CustomLink to='/search'>Search</CustomLink>
                <CustomLink to='/contact'>Contact</CustomLink>
            </div>
            <div className='flex items-center gap-3'>
                <Link className='flex relative' to='/cart'><p><ShoppingBagIcon className="h-7 w-7" /></p>
                    <p className='bg-rose-500 px-2 rounded-full bg-opacity-80 absolute left-3 bottom-2'><small>{quantity > 0 && quantity}</small></p></Link>
                <Link to='/profile'><UserCircleIcon className="h-7 w-7" /></Link>
            </div>
        </nav>
    );
};

export default Header;