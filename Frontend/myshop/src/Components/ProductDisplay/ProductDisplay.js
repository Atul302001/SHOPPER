import React, { useEffect, useState, useContext } from 'react';
import './ProductDisplay.css';
import starIcon from '../Assets/star_icon.png';
import starDullIcon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { useParams } from 'react-router-dom';
const ProductDisplay = () => {
    const { productId } = useParams();
    console.log("Atul kumar ", productId);
    const { addToCart } = useContext(ShopContext);
    const [product, setProduct] = useState(undefined);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:4000/product/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const productData = await response.json();
                console.log("use effect is working ...", productData);
                setProduct(productData);

            } catch (error) {
                console.error('Error fetching product:', error);
                // Handle error state if needed
            }
        };

        fetchProduct(); // Call the async function immediately
    }, [productId]);
    console.log(product, "hihi");
    return (
        <>
        {product ? (
               <div className="productdisplay">
               <div className="productdisplay-left">
                   <div className="productdisplay-img-list">
                       <img src={product.image} alt="Product thumbnail" />
                       <img src={product.image} alt="Product thumbnail" />
                       <img src={product.image} alt="Product thumbnail" />
                       <img src={product.image} alt="Product thumbnail" />
                   </div>
                   <div className="productdisplay-img">
                       <img className="productdisplay-main-img" src={product.image} alt="Main product" />
                   </div>
               </div>
               <div className="productdisplay-right">
                   <h1>{product.name}</h1>
                   <div className="productdisplay-right-star">
                       <img src={starIcon} alt="Star rating" />
                       <img src={starIcon} alt="Star rating" />
                       <img src={starIcon} alt="Star rating" />
                       <img src={starIcon} alt="Star rating" />
                       <img src={starDullIcon} alt="Star rating" />
                       <p>(122)</p>
                   </div>
                   <div className="productdisplay-right-prices">
                       <div className="productdisplay-right-price-old">${product.old_price}</div>
                       <div className="productdisplay-right-price-new">${product.new_price}</div>
                   </div>
                   <div className="productdisplay-right-description">
                       This clothing item features a modern design with high-quality fabric for comfort and durability. It's available in multiple colors and sizes, making it a versatile choice for any wardrobe. Perfect for everyday wear.
                   </div>
                   <div className="productdisplay-right-size">
                       <h1>Select size</h1>
                       <div className="productdisplay-right-size-options">
                           <div>S</div>
                           <div>M</div>
                           <div>L</div>
                           <div>XL</div>
                           <div>XXL</div>
                       </div>
                   </div>
                   <button onClick={() => addToCart(productId)}>ADD TO CART</button>
                   <p className="productdisplay-right-category"><span>Category:</span> {product.category}</p>
                   {/* <p className="productdisplay-right-category"><span>Tags:</span> {product.tags.join(', ')}</p> */}
               </div>
           </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
       
    );
};

export default ProductDisplay;
