import React from 'react';
import { IoHeart, IoHeartOutline, IoEyeOutline, IoCartOutline } from 'react-icons/io5';

const MenuItemCard = ({ item, onAddToCart, onToggleFavorite, onViewDetails, isFavorite }) => {


  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      <div className="relative overflow-hidden h-56">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(item.id)}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md z-10 ${
            isFavorite
              ? 'bg-foodie-red text-white'
              : 'bg-white text-foodie-text/70 hover:bg-gray-100'
          } transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foodie-red`}
          aria-label="Toggle favorite"
        >
          {isFavorite ? <IoHeart className="w-5 h-5" /> : <IoHeartOutline className="w-5 h-5" />}
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-foodie-text mb-2">{item.name}</h3>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-foodie-text/10">
          <span className="text-2xl font-black text-foodie-red">${item.price.toFixed(2)}</span>

          <div className="flex justify-end gap-2">
            {/* View Details */}
            <button
              onClick={() => onViewDetails(item)}
              className="p-2 rounded-full bg-foodie-text/10 hover:bg-foodie-text/20 text-foodie-text transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-foodie-text focus:ring-offset-2"
              aria-label={`View details for ${item.name}`}
            >
              <IoEyeOutline className="w-5 h-5" />
            </button>

            {/* Add to Cart */}
            <button
              onClick={() => onAddToCart(item)}
              className="p-2 rounded-full bg-foodie-orange hover:bg-foodie-red text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-foodie-orange focus:ring-offset-2"
              aria-label={`Add ${item.name} to cart`}
            >
              <IoCartOutline className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;