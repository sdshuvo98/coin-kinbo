import React from 'react';
import { Link } from 'react-router-dom';

const Coin = ({ coin, addToCart }) => {
    const { id, name, symbol, image, current_price, price_change_percentage_24h, total_volume, market_cap, market_cap_rank } = coin;

    return (
        <div>
            <div className='grid grid-cols-8 py-5 border-b hover:bg-slate-800 items-center'>
                <div className='flex items-center justify-around'>
                    <p className='text-left'>{market_cap_rank}</p>
                    <img className='w-7 h-7' src={image} alt="" />
                </div>
                <Link className='col-span-2' to={`/details/${id}`}>
                    <p className='text-left font-semibold'>{name} <small className='font-thin'>({symbol}/usdt)</small></p>
                </Link>
                <p className='text-right'>${(current_price).toLocaleString("en-US")}</p>
                <p className={`${price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-700'} font-semibold`}>{(price_change_percentage_24h).toFixed(2)}%</p>
                <p>${(total_volume).toLocaleString("en-US")}</p>
                <p>${(market_cap).toLocaleString("en-US")}</p>
                <div className='flex justify-center items-center gap-2'>
                    <Link to={`/details/${id}`} className='text-base text-rose-500 hover:underline'>Details</Link>
                    <button onClick={() => addToCart(coin)} className='text-base border border-green-500 rounded-md py-1 px-2 hover:bg-green-500 duration-300 ease-in'>Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default Coin;