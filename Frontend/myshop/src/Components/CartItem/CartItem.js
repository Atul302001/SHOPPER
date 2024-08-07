import React, { useContext } from 'react';
import './CartItem.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItem = () => {
    const { getTotalCartAmount, allProducts, cartItems, removeFromCart } = useContext(ShopContext);

    return (
        <div className='cartitem'>
            <div className='cartitem-format-main'>
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {allProducts && cartItems && Object.keys(cartItems).length > 0 && allProducts.map((product) => {
                if (cartItems[product._id] > 0) {
                    return (
                        <div key={product._id}>
                            <div className='cartitem-format cartitem-format-main'>
                                <img src={product.image} alt="" className='carticon-product-icon' />
                                <p>{product.name}</p>
                                <p>{product.new_price}</p>
                                <p className='cartitem-quantity'>{cartItems[product._id]}</p>
                                <p>{product.new_price * cartItems[product._id]}</p>
                                <img src={remove_icon} onClick={() => removeFromCart(product._id)} alt="Remove" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}

            <div className='cartitem-down'>
                <div className='cartitem-total'>
                    <h1>Cart Totals</h1>
                    <div>
                        <div className='cartitem-total-item'>
                            <p>SubTotal</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cartitem-total-item'>
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className='cartitem-total-item'>
                            <h3>Total</h3>
                            <h3>{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className='cartitem-promocode'>
                    <p>You have a promo code. Enter here.</p>
                    <div className='cartitem-promobox'>
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
