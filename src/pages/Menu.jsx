import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import MenuItemCard from '../components/MenuItemCard';
import DetailsModal from '../components/DetailsModal';
import { menuData } from '../data/menuData';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('foodieflow_favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem('foodieflow_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const categories = useMemo(
    () => ['All', ...new Set(menuData.map((item) => item.category))],
    []
  );

  const filteredItems = useMemo(() => {
    return menuData.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter((id) => id !== itemId));
      toast.success('Removed from favorites');
    } else {
      setFavorites([...favorites, itemId]);
      toast.success('Added to favorites');
    }
  };

  const handleAddToCart = (item) => {
    if (!user) {
      toast.error('Please log in to add items to your cart.');
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    addToCart(item); // only one call
  };

  return (
    <div className="min-h-screen py-10 bg-foodie-cream">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-foodie-text mb-2 text-center">
          Explore Our Menu
        </h1>
        <p className="text-lg text-foodie-text/70 mb-8 text-center">
          Fresh, fast, and delivered right to your table.
        </p>

        {/* Search Bar */}
        <div className="mb-10 w-full max-w-lg mx-auto">
          <div className="relative flex items-center group">
            <MagnifyingGlassIcon className="absolute left-4 w-5 h-5 text-foodie-text/50 group-focus-within:text-foodie-orange transition" />
            <input
              type="text"
              placeholder="Search delicious dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-foodie-orange/30 text-lg shadow-lg bg-white border border-foodie-orange/20 hover:border-foodie-orange transition"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12 flex gap-3 flex-wrap justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${
                selectedCategory === category
                  ? 'bg-foodie-orange text-white shadow-lg'
                  : 'bg-white text-foodie-text border border-foodie-text/20 hover:bg-foodie-orange/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foodie-text/70 text-xl font-medium">
              We couldn't find anything matching "{searchQuery}".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddToCart={() => handleAddToCart(item)} // safe single call
                onToggleFavorite={toggleFavorite}
                onViewDetails={setSelectedItem}
                isFavorite={favorites.includes(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <DetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={() => handleAddToCart(selectedItem)} // safe single call
        />
      )}
    </div>
  );
};

export default Menu;