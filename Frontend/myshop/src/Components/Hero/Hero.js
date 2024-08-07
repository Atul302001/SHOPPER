import React from 'react';
import './Hero.css';
import handicon from '../Assets/hand_icon.png'
import arrow from '../Assets/arrow.png'
import hero from '../Assets/GirlShop.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-left'>
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
        <div className='hand-hand-icon'>
          <p>new</p>
          <img src={handicon } alt="hand icon"/>
        </div>
        <p>collection</p>
        <p>for everyone</p>
        </div>
        <div className='hero-latest-btn'>
        <div>Latest collection</div>
        <img src={arrow} alt="arrow"/>
      </div>
      </div>
      
      <div className='hero-right'>
        <img src={hero} alt="hero image" style={{height:'70%'}}/>
      </div>
    </div>
  );
};

export default Hero;