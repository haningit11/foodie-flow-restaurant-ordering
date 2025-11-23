import React, { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

const DetailsModal = ({ item, onClose, onAddToCart }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Focus trap and keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // Tab trapping
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Focus the close button when modal opens
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    onAddToCart(item);
    toast.success('Added to cart');
  };

  if (!item) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="backdrop-blur-sm bg-black/40 fixed inset-0 z-40"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
          {/* Close Button - Top Right */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 shadow-md text-foodie-charcoal/70 hover:text-foodie-red hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-foodie-orange"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image */}
          <div className="relative w-full h-64 overflow-hidden rounded-xl mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            {/* Header */}
            <div className="mb-4">
              <h2 id="modal-title" className="text-2xl font-bold text-foodie-charcoal mb-2">
                {item.name}
              </h2>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-foodie-green/20 text-foodie-charcoal rounded-full text-sm font-semibold">
                  {item.category}
                </span>
                <span className="text-xl font-bold text-foodie-red">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p id="modal-description" className="text-foodie-charcoal/80 text-base leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Add to Cart Icon Button */}
            <div className="flex justify-center">
              <button
                onClick={handleAddToCart}
                className="p-3 rounded-full bg-foodie-red hover:bg-[#D32F3D] text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-foodie-red focus:ring-offset-2"
                aria-label="Add to cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsModal;
