import { useState, useEffect } from 'react';
import CO2Calculator from '../components/CO2Calculator';

const EnvironmentalImpact = () => {
  // Mock data for environmental impact statistics
  const [stats, setStats] = useState({
    co2Saved: 1234567,
    treesEquivalent: 56789,
    plasticReduced: 98765,
    greenDeliveries: 876543,
    localPartnerships: 234,
    organicMeals: 543210
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const impactCards = [
    {
      icon: "🌱",
      title: "Eco-Friendly Deliveries",
      description: "Our fleet of electric bikes, EV vans, and drones reduces carbon emissions by eliminating traditional fuel-based delivery vehicles.",
      stats: `${(stats.co2Saved / 1000).toFixed(1)}k kg CO₂ saved`
    },
    {
      icon: "🌳",
      title: "Carbon Offset Program",
      description: "Every delivery contributes to our tree-planting initiatives, effectively offsetting the carbon footprint of our operations.",
      stats: `${(stats.treesEquivalent / 1000).toFixed(1)}k trees planted`
    },
    {
      icon: "♻️",
      title: "Sustainable Packaging",
      description: "We partner with restaurants using biodegradable packaging, reducing plastic waste and environmental pollution.",
      stats: `${(stats.plasticReduced / 1000).toFixed(1)}k kg plastic reduced`
    },
    {
      icon: "🚲",
      title: "Green Transportation",
      description: "By prioritizing zero-emission vehicles, we're creating cleaner air and quieter streets in our communities.",
      stats: `${(stats.greenDeliveries / 1000).toFixed(1)}k green deliveries`
    },
    {
      icon: "🤝",
      title: "Local Partnerships",
      description: "Supporting local, sustainable restaurants reduces food miles and strengthens the local eco-friendly food ecosystem.",
      stats: `${stats.localPartnerships} eco-partners`
    },
    {
      icon: "🥗",
      title: "Organic & Plant-Based",
      description: "Promoting organic and plant-based options helps reduce water usage and agricultural emissions.",
      stats: `${(stats.organicMeals / 1000).toFixed(1)}k organic meals`
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-16">
        <div className="container mx-auto px-4">
          <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Making Food Delivery
              <span className="text-primary"> Sustainable</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              At GreenEats, we're committed to revolutionizing food delivery by making it environmentally conscious. 
              Calculate your impact and see how choosing eco-friendly delivery options makes a difference.
            </p>
          </div>
        </div>
      </div>

      {/* CO2 Calculator Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <CO2Calculator />
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Our Environmental Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactCards.map((card, index) => (
            <div 
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-all duration-500 hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {card.description}
              </p>
              <div className="text-primary font-semibold">
                {card.stats}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment Section */}
      <div className="container mx-auto px-4">
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Our Commitment to Sustainability
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  🎯 Environmental Goals
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We aim to become carbon negative by 2025, offsetting more carbon than we emit. 
                  This includes our delivery operations, restaurant partners, and corporate facilities.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  📊 Transparent Reporting
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We provide real-time environmental impact data for every order, helping our customers 
                  make informed decisions about their food delivery choices.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  🌍 Community Impact
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Beyond delivery, we organize local environmental initiatives, support sustainable 
                  farming practices, and educate communities about eco-friendly food choices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Join the Green Revolution
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Every sustainable choice matters. Start making a difference today by choosing 
            eco-friendly food delivery with GreenEats.
          </p>
          <button className="btn btn-primary px-8 py-3">
            Order Now & Make an Impact
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalImpact; 