import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";



const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  

  return (
    <div className="relative w-full min-h-screen text-white flex items-center mb-35">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full min-h-screen object-cover"
      >
        <source src="../images/process_bg.mp4" type="video/mp4" />
      </video>

      {/* Content Wrapper */}
      <div className="relative z-10 ml-10 md:ml-20 mt-52 flex flex-col justify-center max-w-3xl">
                {/* Section Heading */}
        <div className="text-left md:text-left mt-[-500px] left-0">
          <img src="../images/process_heading.png" alt="The Process" className="w-[500px] md:w-[500px]" />
        </div>

       
        {/* Testimonial Card */}
        
      </div>
    </div>
  );
};

export default TestimonialsSection;
