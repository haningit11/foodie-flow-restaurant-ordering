import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-foodie-cream text-foodie-text border-t border-foodie-primary/20">
      <div className="max-w-screen-xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-foodie-primary">FoodieFlow</h2>
          <p className="text-sm text-foodie-text/70">Crafting culinary excellence since 2020</p>
        </div>

        {/* Quick Links */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium">
          <li><Link to="/menu" className="hover:text-foodie-primary">Menu</Link></li>
          <li><Link to="/specials" className="hover:text-foodie-primary">Specials</Link></li>
          <li><Link to="/about" className="hover:text-foodie-primary">About</Link></li>
          <li><Link to="/contact" className="hover:text-foodie-primary">Contact</Link></li>
          <li><Link to="/order" className="hover:text-foodie-primary">Order</Link></li>
        </ul>

        {/* Socials */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-foodie-primary">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-foodie-primary">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-foodie-primary">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-foodie-primary/20 mt-6 pt-4 text-center text-xs text-foodie-text/70">
        © {new Date().getFullYear()} FoodieFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;