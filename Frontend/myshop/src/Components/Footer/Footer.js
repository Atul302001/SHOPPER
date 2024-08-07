import React from 'react'
import './Footer.css'
import logo_big from '../Assets/logo12.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
const Footer = () => {
  return (
    <div className='footer'>
    <div className='footer-logo'>
<img src={logo_big} alt=""style={{height:'100px'}}/>
 <p>SHOPPER</p>
</div>
    <ul className='footer-links'>
       <li>COMPANY</li>
      <li> Offices</li>
      <li>Products</li>
      <li>About</li>
      <li>Contact</li>
  </ul>
  
  
   <div className='footer-social-links'>
   <div className='footer-icons-container'>
    <img src={instagram_icon} alt=""/>
   </div>
   <div className='footer-icons-container'>
    <img src={pintester_icon} alt=""/>
   </div>
   <div className='footer-icons-container'>
    <img src={whatsapp_icon} alt=""/>
   </div>
  </div>
  <div className='footer-copyright'>
 <hr/>
 <p>Copyright@2024 - All Right Reserved.</p>

  </div>
 </div>

  )
}

export default Footer;
