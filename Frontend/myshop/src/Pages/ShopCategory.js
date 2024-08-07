import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/item/Item';

const ShopCategory = ({ banner, category }) => {
  // Use context to get all products from ShopContext
  const { allProducts } = useContext(ShopContext);
  
  // Ensure `allProducts` is defined and an array before filtering
  const filteredProducts = Array.isArray(allProducts)
      ? allProducts.filter((item) => item.category?.toLowerCase().trim() === category.toLowerCase().trim())
      : [];

  return (
      <div className='shop-category'>
          <img src={banner} alt='Shop Category Banner' className='shop-category-banner' />

          <div className='shopcategory-indexSort'>
              <p><span>Showing 1-12</span> out of 36</p>
              <div className='shopcategory-sort'>
                  Sort by <img src={dropdown_icon} alt='Sort dropdown icon' />
              </div>
          </div>

          <div className='shopcategory-products'>
              {filteredProducts.map((item) => (
                  <Item
                      key={item._id}
                      id={item._id}
                      name={item.name}
                      image={item.image}
                      new_price={item.new_price}
                      old_price={item.old_price}
                  />
              ))}
          </div>

          <div className='shopcategory-loadmore'>
              Explore More
          </div>
      </div>
  );
};
export default ShopCategory;
