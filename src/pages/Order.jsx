import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useCart } from '../context/CartContext';
import { FaUtensils, FaFire, FaTruck, FaCheckCircle } from 'react-icons/fa';

const Order = () => {
  const { cart, setCart, removeFromCart } = useCart();
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Duration per stage (seconds)
  const STAGE_DURATION = 3;

  useEffect(() => {
    let interval;
    if (orderPlaced && orderStatus) {
      const statuses = ['Preparing', 'Cooking', 'Out for delivery', 'Delivered'];
      let currentIndex = statuses.indexOf(orderStatus);

      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);

        if (elapsedTime >= STAGE_DURATION && currentIndex < statuses.length - 1) {
          currentIndex++;
          setOrderStatus(statuses[currentIndex]);
          setElapsedTime(0);
        }

        //sstops completely at Delivered
        if (orderStatus === 'Delivered') {
          clearInterval(interval);
        }
      }, 900);

      return () => clearInterval(interval);
    }
  }, [orderPlaced, orderStatus, elapsedTime]);

  const updateQuantity = (itemId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) return null;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setOrderPlaced(true);
    setOrderStatus('Preparing');
    setElapsedTime(0);
    setCart([]);
    toast.success('Order placed successfully!');
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const statusDetails = {
    Preparing: {
      color: 'bg-foodie-orange',
      icon: <FaUtensils className="text-2xl animate-pulse" />,
      message: 'We are preparing your order...',
    },
    Cooking: {
      color: 'bg-foodie-green',
      icon: <FaFire className="text-2xl animate-pulse" />,
      message: 'Your food is being cooked with care...',
    },
    'Out for delivery': {
      color: 'bg-foodie-red',
      icon: <FaTruck className="text-2xl animate-pulse" />,
      message: 'Your order is on the way!',
    },
    Delivered: {
      color: 'bg-foodie-green',
      icon: <FaCheckCircle className="text-2xl animate-bounce" />,
      message: 'Your order has been delivered. Enjoy your meal!',
    },
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-foodie-charcoal mb-8 text-center">Your Order</h1>

        {orderPlaced && orderStatus && (
          <Card className="mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foodie-charcoal mb-4 text-center">Order Status</h2>

            <div className="flex flex-col items-center justify-center mb-6">
              <div
                className={`${statusDetails[orderStatus].color} text-white px-6 py-3 rounded-lg font-semibold text-lg flex items-center gap-3`}
              >
                {statusDetails[orderStatus].icon}
                {orderStatus}
              </div>
              <p className="mt-4 text-foodie-charcoal/70 text-center">
                {statusDetails[orderStatus].message}
              </p>
              {orderStatus !== 'Delivered' && (
                <p className="mt-2 text-sm text-foodie-charcoal/50">
                  Time in this stage: {elapsedTime}s
                </p>
              )}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-foodie-charcoal/10 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  orderStatus === 'Preparing'
                    ? 'bg-foodie-orange w-1/4'
                    : orderStatus === 'Cooking'
                    ? 'bg-foodie-green w-2/4'
                    : orderStatus === 'Out for delivery'
                    ? 'bg-foodie-red w-3/4'
                    : 'bg-foodie-green w-full'
                }`}
              />
            </div>
          </Card>
        )}

        {cart.length === 0 && !orderPlaced ? (
          <Card className="text-center py-12">
            <p className="text-foodie-charcoal/70 text-lg">Your cart is empty.</p>
            <p className="text-foodie-charcoal/50 mt-2">Add some delicious items from our menu!</p>
          </Card>
        ) : !orderPlaced ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foodie-charcoal mb-1">{item.name}</h3>
                      <p className="text-sm text-foodie-charcoal/60 mb-2">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full bg-foodie-cream hover:bg-foodie-orange/20 text-foodie-charcoal flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="font-semibold w-8 text-center text-foodie-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full bg-foodie-cream hover:bg-foodie-orange/20 text-foodie-charcoal flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-semibold text-foodie-red">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-foodie-red hover:text-[#B03A3A] transition-colors"
                            aria-label="Remove item"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <Card>
                <h2 className="text-2xl font-bold text-foodie-charcoal mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-foodie-charcoal/70">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold text-foodie-charcoal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-foodie-charcoal/10 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-foodie-charcoal">Total</span>
                    <span className="text-2xl font-bold text-foodie-red">${total.toFixed(2)}</span>
                  </div>
                  <Button
                    text="Place Order"
                    onClick={placeOrder}
                    variant="primary"
                    className="w-full"
                  />
                </div>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Order;
