import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Card from '../components/ui/Card';
import { menuData } from '../data/menuData';
import MenuItemCard from '../components/MenuItemCard';
import { useCart } from '../context/CartContext';
import DetailsModal from '../components/DetailsModal';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // track item for modal
  const { addToCart } = useCart();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('foodieflow_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const favoriteItems = menuData.filter((item) => favorites.includes(item.id));

  const removeFromFavorites = (itemId) => {
    const updatedFavorites = favorites.filter((id) => id !== itemId);
    setFavorites(updatedFavorites);
    localStorage.setItem('foodieflow_favorites', JSON.stringify(updatedFavorites));
    toast.success('Removed from favorites');
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-foodie-charcoal mb-8 text-center">My Favorites</h1>

        {favoriteItems.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-foodie-charcoal/70 text-lg mb-4">
              You haven't added any favorites yet.
            </p>
            <p className="text-foodie-charcoal/50">
              Start exploring our menu and add dishes you love!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
                onToggleFavorite={removeFromFavorites}
                onViewDetails={() => setSelectedItem(item)} // open modal
                isFavorite={true}
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
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
};

export default Favorites;