import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

export const Breadcrums = (props) => {
    const { product } = props;

    // Check if product exists and has a category and name properties
    if (!product || !product.category || !product.name) {
        // Return null if product is undefined, or product.category or product.name is missing
        return null;
    }

    return (
        <div className='breadcrum'>
            HOME
            <img src={arrow_icon} alt='arrow icon' />
            SHOP
            <img src={arrow_icon} alt='arrow icon' />
            {product.category}
            <img src={arrow_icon} alt='arrow icon' />
            {product.name}
        </div>
    );
};
