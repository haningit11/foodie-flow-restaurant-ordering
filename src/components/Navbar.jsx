import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCartIcon, UserIcon, ArrowRightEndOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; 

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
        const savedCart = localStorage.getItem('foodieflow_cart');
        if (savedCart) {
          const cart = JSON.parse(savedCart);
          const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(totalItems);
        } else {
          setCartCount(0);
        }
      };
      updateCartCount();
      window.addEventListener('storage', updateCartCount);
      window.addEventListener('cartUpdated', updateCartCount);
      return () => {
        window.removeEventListener('storage', updateCartCount);
        window.removeEventListener('cartUpdated', updateCartCount);
      };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Specials', path: '/Specials' },
    { name: 'Favorites', path: '/favorites' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false); // Close menu on action
  }

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu on action
  }

  return (
    <nav className="sticky top-0 z-50 shadow-lg bg-foodie-cream">
      {/* Desktop/Header Container */}
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* 1. Logo (Left) */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl font-extrabold text-foodie-primary hover:text-foodie-red transition duration-300">FoodieFlow</span>
        </Link>

        {/* 2. Desktop Navigation Links (Center) - Hidden on mobile */}
        <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex gap-8 items-center text-base font-medium">
            {navLinks.map((link) => (
                <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                    
                    `relative transition text-foodie-text hover:text-foodie-primary 
                     before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-foodie-primary before:transition-all before:duration-300
                     ${
                    isActive
                        ? 'font-bold text-foodie-primary before:w-full'
                        : 'hover:before:w-full'
                    }`
                }
                >
                {link.name}
                </NavLink>
            ))}
            </ul>
        </div>

        {/* 3. Desktop Icons (Right) - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          
          {/* Cart Icon */}
          <Link to="/order" className="relative p-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-foodie-primary">
            <ShoppingCartIcon className="w-6 h-6 text-foodie-text" aria-label="View Cart" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-foodie-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-foodie-cream">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {/* Auth Icon */}
          <div>
            {user ? (
              <button 
                onClick={handleLogout} 
                aria-label="Logout" 
                className="p-2 rounded-full hover:bg-gray-100 transition group focus:outline-none focus:ring-2 focus:ring-foodie-red"
              >
                <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-foodie-text group-hover:text-foodie-red transition" />
              </button>
            ) : (
              <button 
                onClick={() => handleNavigate('/login')} 
                aria-label="Login"
                className="p-2 rounded-full hover:bg-gray-100 transition group focus:outline-none focus:ring-2 focus:ring-foodie-primary"
              >
                <UserIcon className="w-6 h-6 text-foodie-text group-hover:text-foodie-primary transition" />
              </button>
            )}
          </div>
        </div>

        {/* 4. Mobile Menu & Cart Button (Visible on small screens) */}
        <div className="md:hidden flex items-center">
            {/* Cart Icon (Mobile View) */}
            <Link to="/order" className="relative p-2 mr-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-foodie-primary">
                <ShoppingCartIcon className="w-6 h-6 text-foodie-text" aria-label="View Cart" />
                {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-foodie-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-foodie-cream">
                    {cartCount > 99 ? '99+' : cartCount}
                </span>
                )}
            </Link>

            {/* Hamburger/Close Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-foodie-text rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-foodie-primary transition"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
            >
                {isMenuOpen ? (
                    <XMarkIcon className="w-7 h-7" />
                ) : (
                    <Bars3Icon className="w-7 h-7" />
                )}
            </button>
        </div>
      </div>

      {/* Mobile Menu Drawer (Conditionally rendered) */}
      <div 
        className={`md:hidden absolute w-full bg-white shadow-xl transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0 opacity-100 visible border-t border-gray-100' : '-translate-y-full opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col p-4 space-y-2">
            {/* Navigation Links */}
            {navLinks.map((link) => (
                <NavLink
                    key={`mobile-${link.name}`}
                    to={link.path}
                    // Close menu when navigating
                    onClick={() => handleNavigate(link.path)}
                    className={({ isActive }) =>
                        `py-2 px-3 rounded-lg text-base font-medium text-foodie-text transition duration-200 block text-center 
                         ${isActive 
                            ? 'bg-foodie-primary text-white shadow-md' 
                            : 'hover:bg-gray-100'}`
                    }
                >
                    {link.name}
                </NavLink>
            ))}

            <div className="pt-2 border-t border-gray-200">
                {/* Auth Action in Mobile Menu */}
                {user ? (
                    <button 
                        onClick={handleLogout} 
                        className="w-full py-2 px-3 rounded-lg text-base font-medium text-white bg-foodie-red hover:bg-foodie-danger/90 transition duration-200 block text-center mt-2 shadow-md"
                    >
                        Logout
                    </button>
                ) : (
                    <button 
                        onClick={() => handleNavigate('/login')} 
                        className="w-full py-2 px-3 rounded-lg text-base font-medium text-white bg-foodie-primary hover:bg-foodie-primary/90 transition duration-200 block text-center mt-2 shadow-md"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;