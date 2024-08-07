import React from 'react'
 import './Relatedproduct.css'
 import data_product from '../Assets/data';

 import Item from'../item/Item.js'
 const Relatedproduct = () => {
  return (
    <div className='relatedproduct'>
   <h1>Related Product</h1>
 <hr/>
 <div className='relatedproduct-item'>
{console.log('relatedProduct',data_product)}


{data_product.map((item,i)=>{
    return <Item key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
  
})}


 </div>
    </div>
  )
}

export default Relatedproduct;
