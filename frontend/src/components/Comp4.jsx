import React from "react";
import { motion } from "framer-motion";

const communitySections = [
  {
    title: "Cook’s Rating & Feedback ⭐",
    description:
      "Users can rate and review their home cook’s meals, helping others choose the best home-cooked food.",
    image: "/images/c1.png",
  },
  {
    title: "User Experience Posts 📸",
    description:
      "Share your meal moments with others! Post pictures, experiences, and favorite dishes in the community feed.",
    image: "/images/c2.png",
  },
  {
    title: "Menu Voting & Change ✅",
    description:
      "Vote for next week’s menu! Your choice helps shape what’s served, ensuring variety and satisfaction.",
    image: "/images/c3.png",
  },
  {
    title: "Social Media Interaction 📱",
    description:
      "Connect beyond the app! Share your favorite meals and moments on social media, tagging your friends and cooks.",
    image: "/images/c4.png",
  },
];

const Comp4 = () => {
  return (
    <div
      className="py-10 px-5 max-w-full mx-auto text-center"
      style={{
        backgroundImage: "url('/images/paybg.png')",
        backgroundSize: "contain",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "top center",
      }}
    >
      <div className="flex justify-center mb-8">
        <img src="/images/heading.png" alt="Join Our Foodie Community" className="w-196" />
      </div>

      <p className="text-[#dfd218] mb-10 text-xl">
        Share your experiences, rate meals, and connect with fellow food lovers
      </p>
      
      <div className="space-y-16">
        {communitySections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center p-12 shadow-xl w-full rounded-lg mx-auto"
            style={{
              background: "#E1E0BC",
              backdropFilter: "blur(5px)",
              marginLeft: index % 2 === 0 ? "20px" : "200px",
              marginRight: index % 2 === 0 ? "200px" : "20px",
              maxWidth: "calc(100% - 200px)",
            }}
          >
            <motion.div
              className="w-1/3 flex justify-center"
              whileInView={{ scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={section.image}
                alt={section.title}
                className="w-72 h-72 object-contain"
              />
            </motion.div>

            <div className="w-2/3 text-center px-8">
              <h3 className="text-4xl font-bold mb-3 text-black drop-shadow-lg">
                {section.title}
              </h3>
              <p className="text-gray-700 text-lg drop-shadow-md">{section.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Comp4;
