import React, { useEffect, useState } from 'react'
import './NewCollection.css'

import Item from '../item/Item'
const NewCollection = () => {

const [new_collection,setNew_collection] =useState([]);

useEffect(()=>{
  fetch('http://localhost:4000/newcollections')
  .then((response)=>response.json())
  .then((data)=>setNew_collection(data))
  .catch((error)=>(console.log("error",error))
);
},[])

  return (
    <div className='new-collections'> 
    <h1>NEW COLLECTIONS</h1>
    <hr/>
    <div className='collections'>
   {new_collection.map((item,i)=>{return<Item key={i}
   

  
      id={item._id}
      name={item.name}
      image={item.image}
      new_price={item.new_price}
      old_price={item.old_price}

/>

})}
    </div>
    </div>

  )
}

export default NewCollection