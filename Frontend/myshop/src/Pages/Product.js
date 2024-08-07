import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import { Breadcrums } from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProduct from '../Components/Relatedproduct/Relatedproduct';

export const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();

    // Check if all_product is available and is an array
    if (!all_product || !Array.isArray(all_product)) {
        return <div>Loading...</div>; // or handle it appropriately
    }

    // Find the product with the matching productId
    const product = all_product.find((e) => e._id === productId);

    // Check if the product exists
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <Breadcrums product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox product={product} />
            <RelatedProduct product={product} />
        </div>
    );
};

export default Product;
