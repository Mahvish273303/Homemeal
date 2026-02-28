import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "SARANGAN",
    location: "Hosur (Bharathi Nagar)",
    review:
      "Mysore rasam - Awesome, me and my wife loved and enjoyed it. Veg biryani - Good, we can spot all the vegetables and it has been cooked well but the taste can be better. I was surprised and felt happy for the breads. Morkulambu - Good at taste",
    image: "../images/user1.png",
  },
  {
    name: "AARAVI",
    location: "Bangalore",
    review:
      "Absolutely delicious meals! The flavors were rich and authentic. The dosa was crispy, and the sambhar had the perfect spice balance. Would definitely order again!",
    image: "../images/user2.png",
  },
  {
    name: "PRIYA",
    location: "Chennai",
    review:
      "The food quality was amazing. The paneer butter masala was so creamy, and the roti was fresh and soft. Highly recommended!",
    image: "../images/user3.png",
  },
  {
    name: "VIKRAMI",
    location: "Mumbai",
    review:
      "Loved the spice levels and the authentic taste of South Indian food. The rasam reminded me of home. Great service too!",
    image: "../images/user4.png",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setIsFlipped(false);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen text-white flex items-center mb-35">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full min-h-screen object-cover"
      >
        <source src="../images/commp.mp4" type="video/mp4" />
      </video>

      {/* Content Wrapper */}
      <div className="relative z-10 ml-10 md:ml-20 mt-52 flex flex-col justify-center max-w-3xl">
        <h2 className="text-7xl font-bold text-white mb-8 mt--3">
          Don’t take our word for it,{" "}
          <span className="text-[#dfd218]">take theirs...</span>
        </h2>

        {/* Testimonial Card */}
        <div className="relative w-full max-w-2xl">
          <motion.div
            key={currentIndex}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
            className="bg-green-800 p-8 rounded-lg shadow-lg"
            style={{
              transformStyle: "preserve-3d",
              perspective: 1000,
              backfaceVisibility: "hidden",
            }}
          >
            <div className="text-3xl mb-4 font-semibold">❝</div>
            <p className="text-lg italic">{testimonials[currentIndex].review}</p>
            <div className="mt-4 flex items-center">
              <div className="bg-white rounded-full p-2 mr-3">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div>
                <h4 className="font-semibold text-white">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-gray-200">
                  {testimonials[currentIndex].location}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
