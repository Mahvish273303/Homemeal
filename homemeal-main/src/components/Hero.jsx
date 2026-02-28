import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div 
      className="relative min-h-screen flex items-center bg-fixed p-8 sm:p-16 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative text-left text-[#faf8f8] max-w-3xl z-10">
        {/* Logo Image */}
        <div className='mb-4 sm:mb-6'>
          <img src='/images/t1.png' className="h-15 sm:h-20 md:h-24" alt="Organic" />
        </div>

        {/* Headings */}
        <h1 className="text-5xl lg:text-6xl font-extralight tracking-tight mb-3 sm:mb-5">
          Ditch <span className='text-[#dfd218] font-bold tracking-tighter'>Junk</span>, Eat <span className='text-[#dfd218] font-bold tracking-tighter'>Fresh</span> 
        </h1>
        <h2 className="text-xl sm:text-2xl font-extralight tracking-tight mb-3 sm:mb-5">
          Because Nothing Beats <span className='text-[#dfd218] tracking-tighter'>Ghar Ka Khana!</span>  
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm max-w-3xl uppercase font-medium tracking-widest mb-8 sm:mb-12">
          SCHEDULED MEALS | AFFORDABLE & HEALTHY | TRACK YOUR TIFFIN | COMMUNITY VOTES
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-6">
          <Link 
            className="px-6 py-3 bg-[#dfd218] text-black text-base font-medium rounded shadow-md tracking-tight transition duration-300 hover:bg-[#c4b417]" 
            to="/Process"
          >
            Learn More
          </Link>

          <Link 
            className="px-6 py-3 bg-[#484206] text-white text-base font-medium rounded shadow-md flex items-center gap-3 transition duration-300 hover:bg-[#3b3404]" 
            to="/download" 
          >
            <img src="/images/ps-icon.png" alt="Download Icon" className="h-5 w-5" />
            Download
          </Link>
        </div>
      </div>

      {/* See More Button */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <button onClick={handleScroll} className="flex flex-col items-center text-white">
          <span className="text-sm font-light">See More</span>
          <img src="/images/arrow.png" alt="Scroll Down" className="h-5 w-5 mt-1 animate-bounce" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
