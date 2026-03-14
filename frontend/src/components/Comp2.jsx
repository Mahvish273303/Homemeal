import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      image: '/images/f1.png',
      title: 'Helping homemakers earn',
      points: [
        'Helping homemakers earn by sharing their skills',
        'Building a community of food lovers & chefs',
        'Reviews & ratings to boost credibility'
      ]
    },
    {
      image: '/images/f2.png',
      title: 'Home-cooked meals',
      points: [
        'Home-cooked by passionate homemakers',
        'Gym & diet-oriented meal options',
        'No preservatives—only fresh ingredients'
      ]
    },
    {
      image: '/images/f3.png',
      title: 'Easy ordering system',
      points: [
        'Easy-to-use online ordering system',
        'Real-time reviews & ratings for better experience',
        'A platform that brings homemade food to your doorstep'
      ]
    },
    {
      image: '/images/f4.png',
      title: 'Doorstep delivery',
      points: [
        'Doorstep delivery at your chosen time',
        'Meal scheduling—order for a day/week in advance',
        'Variety of cuisines & multiple homemakers to choose from'
      ]
    }
  ];

  return (
    <div 
      className="relative min-h-screen py-16 px-6 sm:p-16 bg-cover bg-center text-white text-center" 
      style={{ backgroundImage: "url('/images/provide.png')" }}
    >
      <div className="max-w-5xl mx-auto p-8">
        {/* Replacing h2 with an img tag for full control */}
        <img 
          src="/images/wcu.png" 
          alt="Why Choose Us" 
          className="mx-auto mb-6 w-[300px] sm:w-[400px]" 
        />

        <p className="text-lg mb-8 max-w-4xl mx-auto">
          We connect you with talented homemakers who prepare fresh, healthy, and delicious meals. 
          From doorstep delivery to personalized meal plans, we bring you a wholesome dining experience like never before!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <img src={feature.image} alt={feature.title} className="w-40 h-40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <ul className="text-sm opacity-90 list-disc list-inside">
                {feature.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
