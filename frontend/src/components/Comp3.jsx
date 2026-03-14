import React from "react";

const Comp3 = () => {
  return (
    <section className="flex flex-col items-center max-w-9xl mx-auto px-16 py-26"
    style={{ backgroundImage: "url('/images/paybg.png')" }}>
      {/* Centered Image at the Top with Increased Size */}
      <div className="flex justify-center mb-8">
        <img 
          src="/images/hmwallet.png" 
          alt="With hm wallet" 
          className="w-[400px] sm:w-[500px] md:w-[800px]"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center w-full relative">
        {/* Left Side: App Interface Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            src="./images/leftimage.png"
            alt="App Interface"
            className="w-full max-w-lg"
          />
        </div>

        {/* Right Side: Content with Crescent Shape Effect */}
        <div className="w-full md:w-1/2 md:pl-16 bg-black p-8 rounded-2 shadow-lg">
          <h2 className="text-4xl font-sans mb-4 font-bold text-center text-[#dfd218] md:text-left">Seamless Transactions</h2>
          <p className="text-lg mb-6 text-center md:text-left text-white">
            No need to carry cash! Simply recharge your HM Wallet and enjoy hassle-free payments.
          </p>

          <h2 className="text-4xl font-sans mb-4 font-bold text-center text-[#dfd218] md:text-left">Instant Alerts</h2>
          <p className="text-lg mb-6 text-center md:text-left text-white">
            Get notified if your wallet balance is low before placing an order.
          </p>

          <h2 className="text-4xl font-sans mb-4 font-bold text-center text-[#dfd218] md:text-left">Quick Recharge</h2>
          <p className="text-lg mb-6 text-center md:text-left text-white">
            Add money to your HM Wallet anytime to keep enjoying delicious meals without interruptions.
          </p>

          <h2 className="text-4xl font-sans mb-4 font-bold text-center text-[#dfd218] md:text-left">Auto-Deduction</h2>
          <p className="text-lg mb-6 text-center md:text-left text-white">
            Payments are deducted directly from your wallet when you order.
          </p>

          <h2 className="text-4xl font-sans mb-4 font-bold text-center text-[#dfd218] md:text-left">Stay in Control</h2>
          <p className="text-lg mb-6 text-center md:text-left text-white">
            Easily manage transactions and track spending within the app.
          </p>

          {/* Buttons */}
          <div className="flex justify-center md:justify-start space-x-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-md flex items-center">
              <i className="fab fa-whatsapp mr-2"></i> CHAT WITH US
            </button>
            <button className="bg-white text-green px-6 py-2 rounded-md flex items-center">
              <i className="fas fa-download mr-2 "></i> DOWNLOAD
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comp3;
