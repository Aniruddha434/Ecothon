import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { restaurantMenus } from '../data/restaurantMenus';

const MenuManagement = () => {
  const { getRestaurantId } = useAuth();
  const [menu, setMenu] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const restaurantId = getRestaurantId();
    const restaurantMenu = restaurantMenus[restaurantId];
    setMenu(restaurantMenu);
  }, [getRestaurantId]);

  const handleEditItem = (item) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleAddItem = (categoryName) => {
    setEditingItem({
      id: Date.now(), // Temporary ID for new item
      name: '',
      price: '',
      description: '',
      image: '',
      categoryName
    });
    setIsModalOpen(true);
  };

  const handleSaveItem = (item) => {
    // In a real app, this would make an API call to update the menu
    const updatedMenu = { ...menu };
    const category = updatedMenu.categories.find(cat => cat.name === item.categoryName);
    
    if (category) {
      const existingItemIndex = category.items.findIndex(i => i.id === item.id);
      if (existingItemIndex >= 0) {
        category.items[existingItemIndex] = item;
      } else {
        category.items.push(item);
      }
      setMenu(updatedMenu);
    }
    
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (categoryName, itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedMenu = { ...menu };
      const category = updatedMenu.categories.find(cat => cat.name === categoryName);
      
      if (category) {
        category.items = category.items.filter(item => item.id !== itemId);
        setMenu(updatedMenu);
      }
    }
  };

  if (!menu) {
    return <div>Loading menu...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Menu Management
        </h2>
        <button
          onClick={() => handleAddItem(menu.categories[0]?.name)}
          className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
        >
          Add New Item
        </button>
      </div>

      {menu.categories.map((category) => (
        <div key={category.name} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {category.name}
            </h3>
            <button
              onClick={() => handleAddItem(category.name)}
              className="text-sm text-emerald-500 hover:text-emerald-600"
            >
              + Add to {category.name}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {item.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {item.description}
                </p>
                <p className="text-emerald-500 font-medium mb-4">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEditItem({ ...item, categoryName: category.name })}
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(category.name, item.id)}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Edit/Add Item Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {editingItem.id ? 'Edit Item' : 'Add New Item'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveItem(editingItem)}
                className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement; 