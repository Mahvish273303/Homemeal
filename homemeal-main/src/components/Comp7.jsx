import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { image: "S1.png", text: "Freshly home made meals,", highlight: "Cooked with love", subtext: " In your own neighbourhood." },
  { image: "S2.png", text: "Experience healthy eating,", highlight: "Organic & fresh", subtext: " Straight to your plate." },
  { image: "S3.png", text: "Savor delicious dishes,", highlight: "Crafted by experts", subtext: " With authentic flavors." },
  { image: "S4.png", text: "Bringing communities together,", highlight: "One meal at a time", subtext: " Cooked by home chefs." },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('images/bgp.png')" }}>
     
      <div className="absolute inset-0 flex items-center">
        {slides.map((slide, index) => (
          index === currentIndex && (
            <AnimatePresence key={index}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="flex w-full px-12"
              >
                {/* Left Side - Image */}
                <div className="w-1/2 flex justify-center items-center">
                  <img src={`images/${slide.image}`} alt={`Slide ${index + 1}`} className="w-3/4 h-auto object-cover" />
                </div>

                {/* Right Side - Text */}
                <div className="w-1/2 text-white flex flex-col justify-center">
                  <h1 className="text-6xl font-extrabold leading-tight">{slide.text}</h1>
                  <span className="bg-green-600 text-black px-4 py-3 text-5xl rounded-lg mt-4 inline-block">{slide.highlight}</span>
                  <p className="text-3xl mt-3 font-medium">{slide.subtext}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          )
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute bottom-8 right-8 flex gap-4">
        <button onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}>
          <img src="images/B1.png" alt="Previous" className="w-12 h-12" />
        </button>
        <button onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}>
          <img src="images/B2.png" alt="Next" className="w-12 h-12" />
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
