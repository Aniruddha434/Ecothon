import { useState } from 'react';

const CO2Calculator = () => {
  const [distance, setDistance] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('bike');
  const [calculatedCO2, setCalculatedCO2] = useState(null);

  // CO2 emission factors (grams per kilometer)
  const emissionFactors = {
    bike: 0, // Electric bikes have zero direct emissions
    ev: 30, // Electric vehicles have some emissions from electricity generation
    drone: 25, // Drones have emissions from electricity
    traditional: 120 // Traditional delivery vehicles (for comparison)
  };

  // Calculate CO2 savings
  const calculateCO2 = () => {
    if (!distance || isNaN(distance)) return;

    const distanceNum = parseFloat(distance);
    
    // Calculate emissions for selected method
    const selectedEmissions = emissionFactors[deliveryMethod] * distanceNum;
    
    // Calculate emissions if traditional delivery was used
    const traditionalEmissions = emissionFactors.traditional * distanceNum;
    
    // Calculate savings
    const savings = traditionalEmissions - selectedEmissions;
    
    setCalculatedCO2({
      saved: savings.toFixed(2),
      selected: selectedEmissions.toFixed(2),
      traditional: traditionalEmissions.toFixed(2)
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        CO₂ Savings Calculator
      </h3>
      
      <div className="space-y-6">
        {/* Distance Input */}
        <div>
          <label 
            htmlFor="distance" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Delivery Distance (km)
          </label>
          <input
            type="number"
            id="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter distance in kilometers"
            min="0"
            step="0.1"
          />
        </div>

        {/* Delivery Method Selection */}
        <div>
          <label 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Delivery Method
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setDeliveryMethod('bike')}
              className={`p-4 rounded-lg border ${
                deliveryMethod === 'bike'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 dark:border-gray-600'
              }`}
            >
              <span className="text-2xl">🚲</span>
              <p className="mt-2 text-sm">Electric Bike</p>
            </button>
            <button
              onClick={() => setDeliveryMethod('ev')}
              className={`p-4 rounded-lg border ${
                deliveryMethod === 'ev'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 dark:border-gray-600'
              }`}
            >
              <span className="text-2xl">🚚</span>
              <p className="mt-2 text-sm">EV Van</p>
            </button>
            <button
              onClick={() => setDeliveryMethod('drone')}
              className={`p-4 rounded-lg border ${
                deliveryMethod === 'drone'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 dark:border-gray-600'
              }`}
            >
              <span className="text-2xl">🚁</span>
              <p className="mt-2 text-sm">Drone</p>
            </button>
            <button
              onClick={() => setDeliveryMethod('traditional')}
              className={`p-4 rounded-lg border ${
                deliveryMethod === 'traditional'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 dark:border-gray-600'
              }`}
            >
              <span className="text-2xl">🛵</span>
              <p className="mt-2 text-sm">Traditional</p>
            </button>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateCO2}
          className="w-full btn btn-primary py-3"
          disabled={!distance || isNaN(distance)}
        >
          Calculate CO₂ Impact
        </button>

        {/* Results Display */}
        {calculatedCO2 && (
          <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Calculation Results
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Selected Method Emissions:</span>
                <span className="font-semibold text-primary">
                  {calculatedCO2.selected} g CO₂
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Traditional Delivery Emissions:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {calculatedCO2.traditional} g CO₂
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white font-semibold">CO₂ Savings:</span>
                  <span className="font-bold text-green-500">
                    {calculatedCO2.saved} g CO₂
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {calculatedCO2.saved > 0 
                    ? `That's equivalent to charging your smartphone ${Math.round(calculatedCO2.saved / 2.3)} times!`
                    : 'Consider choosing a more eco-friendly delivery option to reduce emissions.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CO2Calculator; 