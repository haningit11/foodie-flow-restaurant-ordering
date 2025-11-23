import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { menuData } from '../data/menuData';

const Home = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Lina', rating: 5, comment: 'The sushi was fresh and delicious!' },
    { id: 2, name: 'Omar', rating: 4, comment: 'Loved the pizza, will order again.' },
    { id: 3, name: 'Sara', rating: 5, comment: 'Fast delivery and great service!' },
  ]);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });

  useEffect(() => {
    const savedReviews = localStorage.getItem('foodieflow_reviews');
    if (savedReviews) {
      try {
        const parsed = JSON.parse(savedReviews);
        setReviews((prev) => {
          const existingIds = new Set(prev.map((r) => r.id));
          const newReviews = parsed.filter((r) => !existingIds.has(r.id));
          return [...prev, ...newReviews];
        });
      } catch (e) {
        console.error('Error loading reviews:', e);
      }
    }
  }, []);

  const featuredDishes = menuData.slice(0, 3).map(item => ({
    id: item.id,
    name: item.name,
    description: `Delicious ${item.name.toLowerCase()} from our ${item.category} collection`,
    price: `$${item.price.toFixed(2)}`,
    image: item.image,
  }));

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewForm.name,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    const userReviews = updatedReviews.filter((r) => r.id > 3);
    localStorage.setItem('foodieflow_reviews', JSON.stringify(userReviews));
    setReviewForm({ name: '', rating: 5, comment: '' });
    toast.success('Review submitted successfully!');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400 text-lg' : 'text-gray-300 text-lg'}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200)',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
            Welcome to FoodieFlow
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mb-10 font-light drop-shadow-md max-w-2xl mx-auto">
            Fresh ingredients, amazing flavors, delivered to your door
          </p>
          <Link to="/menu">
            <Button 
              text="Order Now" 
              variant="primary" 
              className="text-lg px-10 py-4 font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
            />
          </Link>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="max-w-screen-xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Featured Dishes</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDishes.map((dish) => (
            <div 
              key={dish.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{dish.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-red-600">{dish.price}</span>
                  <Link to="/menu">
                    <Button 
                      text="Order" 
                      variant="primary" 
                      className="text-sm px-5 py-2 font-semibold hover:shadow-lg transition-shadow"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Review Section */}
      <section className="max-w-screen-xl mx-auto px-4 py-20 bg-gradient-to-b from-transparent via-orange-50/50 to-transparent rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Customer Reviews</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Display Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900">{review.name}</h4>
                <div className="flex gap-1">{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-600 leading-relaxed italic">"{review.comment}"</p>
            </div>
          ))}
        </div>

        {/* Review Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">Write a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Name</label>
              <input
                type="text"
                value={reviewForm.name}
                onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
                placeholder="Your name"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Rating</label>
              <select
                value={reviewForm.rating}
                onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num > 1 ? 's' : ''} - {'★'.repeat(num)}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Comment</label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
                rows="5"
                placeholder="Share your experience..."
              />
            </div>
            <div className="text-center">
              <Button 
                text="Submit Review" 
                type="submit" 
                variant="primary" 
                className="w-full md:w-auto px-10 py-3 font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
              />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;