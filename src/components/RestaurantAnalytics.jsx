import { useState } from 'react';

// Mock data for analytics
const mockAnalyticsData = {
  dailyOrders: [12, 18, 22, 15, 25, 30, 28],
  weeklyRevenue: [320, 480, 590, 430, 680, 790, 750],
  popularItems: [
    { name: 'Organic Garden Salad', count: 48, percentage: 15 },
    { name: 'Vegetable Risotto', count: 42, percentage: 13 },
    { name: 'Quinoa Bowl', count: 38, percentage: 12 },
    { name: 'Seasonal Soup', count: 35, percentage: 11 },
    { name: 'Chocolate Avocado Mousse', count: 30, percentage: 9 },
  ],
  deliveryMethods: [
    { method: 'Bike', count: 85, percentage: 45, co2Saved: 127.5 },
    { method: 'EV', count: 65, percentage: 35, co2Saved: 97.5 },
    { method: 'Drone', count: 38, percentage: 20, co2Saved: 76 },
  ],
  peakHours: [
    { hour: '11:00 - 12:00', orders: 18 },
    { hour: '12:00 - 13:00', orders: 32 },
    { hour: '13:00 - 14:00', orders: 28 },
    { hour: '18:00 - 19:00', orders: 35 },
    { hour: '19:00 - 20:00', orders: 42 },
    { hour: '20:00 - 21:00', orders: 30 },
  ],
};

const RestaurantAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week'); // 'day', 'week', 'month', 'year'
  const [analyticsData, setAnalyticsData] = useState(mockAnalyticsData);

  // Function to handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // In a real app, you would fetch new data based on the time range
    // For now, we'll just use the same mock data
  };

  // Calculate total orders
  const totalOrders = analyticsData.dailyOrders.reduce((sum, count) => sum + count, 0);
  
  // Calculate total revenue
  const totalRevenue = analyticsData.weeklyRevenue.reduce((sum, amount) => sum + amount, 0);
  
  // Calculate total CO2 saved
  const totalCO2Saved = analyticsData.deliveryMethods.reduce((sum, method) => sum + method.co2Saved, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
          Restaurant Analytics
        </h2>
        <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          <button
            onClick={() => handleTimeRangeChange('day')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'day'
                ? 'bg-emerald-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => handleTimeRangeChange('week')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'week'
                ? 'bg-emerald-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => handleTimeRangeChange('month')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'month'
                ? 'bg-emerald-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => handleTimeRangeChange('year')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'year'
                ? 'bg-emerald-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Orders</h3>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{totalOrders}</p>
          <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
            </svg>
            <span>12% from last {timeRange}</span>
          </div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${totalRevenue.toFixed(2)}</p>
          <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
            </svg>
            <span>8% from last {timeRange}</span>
          </div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">CO₂ Saved</h3>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{totalCO2Saved.toFixed(1)} kg</p>
          <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
            </svg>
            <span>15% from last {timeRange}</span>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Orders Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.dailyOrders.map((count, index) => {
              const height = (count / Math.max(...analyticsData.dailyOrders)) * 100;
              const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index];
              
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-emerald-500 rounded-t-sm" 
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">{day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Items */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Items</h3>
          <div className="space-y-4">
            {analyticsData.popularItems.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-32 text-sm text-gray-600 dark:text-gray-300 truncate">
                  {item.name}
                </div>
                <div className="flex-1 mx-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      className="bg-emerald-500 h-2.5 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 w-16 text-right">
                  {item.count} orders
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Methods */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delivery Methods</h3>
          <div className="grid grid-cols-3 gap-4">
            {analyticsData.deliveryMethods.map((method, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">
                  {method.method === 'Bike' ? '🚲' : method.method === 'EV' ? '🚚' : '🚁'}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {method.percentage}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {method.count} orders
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  {method.co2Saved} kg CO₂ saved
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Peak Hours</h3>
          <div className="space-y-3">
            {analyticsData.peakHours.map((hour, index) => (
              <div key={index} className="flex items-center">
                <div className="w-32 text-sm text-gray-600 dark:text-gray-300">
                  {hour.hour}
                </div>
                <div className="flex-1 mx-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      className="bg-emerald-500 h-2.5 rounded-full" 
                      style={{ width: `${(hour.orders / Math.max(...analyticsData.peakHours.map(h => h.orders))) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 w-16 text-right">
                  {hour.orders} orders
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantAnalytics; 