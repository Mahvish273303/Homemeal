import React, { useEffect, useRef, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const chefs = [
  { id: 1, image: '/images/aunty1.png' },
  { id: 2, image: '/images/aunty2.png' },
  { id: 3, image: '/images/aunty3.png' },
  { id: 4, image: '/images/aunty4.png' },
];

const ChefCard = ({ chef }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/chefs/${chef.id}`);
  };

  return (
    <div 
      className="w-[500px] h-[500px] mx-10 p-6 text-[#dfd218] rounded-lg shadow-lg flex flex-col justify-between cursor-pointer transition-transform duration-300 hover:scale-105 relative"
      style={{
        backgroundImage: `url(${chef.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>

      <div className="relative z-10 p-4 text-left">
        {/* Add Chef Details if Needed */}
      </div>

      <div className="relative z-10 flex justify-center">
        <button
          onClick={handleProfileClick}
          className="mt-4 bg-[#FF5226] text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-all"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

const MostLovedChefs = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const cardsRef = useRef(null);

  const repeatedChefs = [...chefs, ...chefs];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartAnimation(true);
        } else {
          setStartAnimation(false);
        }
      },
      { threshold: 0.5 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => {
      if (cardsRef.current) observer.unobserve(cardsRef.current);
    };
  }, []);

  return (
    <div className="mt-12 w-full overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-6">Most Loved Chefs</h2>
      <p className="text-center text-gray-600 mb-8">
        Discover the top-rated chefs based on student reviews and ratings.
      </p>

      <style>
        {`
          @keyframes scrolling {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-650px * ${chefs.length})); }
          }
          .scrolling-container {
            display: flex;
            width: fit-content;
            gap: 50px;
          }
          .scrolling-container > div {
            flex: 0 0 auto;
          }
          @media (max-width: 768px) {
            @keyframes scrolling-mobile {
              0%, 25% { transform: translateX(0); }
              33%, 58% { transform: translateX(-100%); }
              66%, 91% { transform: translateX(-200%); }
              100% { transform: translateX(-300%); }
            }
            .scrolling-container {
              animation: scrolling-mobile 12s linear infinite !important;
            }
          }
        `}
      </style>

      <div ref={cardsRef} className="relative mx-auto overflow-hidden">
        <div
          className="scrolling-container py-4"
          style={{
            animation: startAnimation ? `scrolling ${chefs.length * 12}s linear infinite` : 'none',
          }}
        >
          {repeatedChefs.map((chef, index) => (
            <div key={index}>
              <ChefCard chef={chef} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostLovedChefs;
