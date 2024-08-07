import React, { useContext,  useState } from 'react';
import "./Navbar.css";
import logo from '../logo12.png';
import cart_icon from '../cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../../Context/ShopContext';

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");

 const {getTotalCartItem} = useContext(ShopContext)
   


  return (
    <div className="Navbar">
      <div className='Nav-logo'>
        <img src={logo} alt='' style={{ width: '100px', height: '100px' }} />
        <p>SHOPPER</p>
      </div>
      
      <ul  className='nav-menu'>
        <li onClick={() => { setMenu("shop") }}> <Link style={{textDecoration:'none'}}to='/'>Shop </Link>{menu === "shop" ? <hr/> : <></>}</li>

        <li onClick={() => { setMenu("mens") }}> <Link  style={{textDecoration:'none'}}to='/mens'>Men </Link> {menu === "mens" ? <hr/> : <></>}</li>

        <li onClick={() => { setMenu("womens") }}>  <Link  style={{textDecoration:'none'}} to='/womens'>Women </Link>{menu === "womens" ? <hr/> : <></>}</li>

        <li onClick={() => { setMenu("kids") }}> <Link style={{textDecoration:'none'}} to='/kids'>kids</Link>{menu === "kids" ? <hr/> : <></>}</li>

      </ul>

      <div className='nav-login-cart'>
        { localStorage.getItem('auth-token')?<button onClick= {()=>
        {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>: <Link to='/login'><button >login</button>
        </Link>} 
         
         

         
       <Link to='/cart'><img src={cart_icon} alt='' style={{ width: '50px', height: '50px' }} /></Link> 
        <div className='nav-cart-count'>{getTotalCartItem()}</div>
      </div>
    </div>
  );
};

export default Navbar;
