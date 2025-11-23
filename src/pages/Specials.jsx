import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaPizzaSlice, FaHamburger, FaLeaf, FaDrumstickBite, FaSeedling, FaCheese, FaUtensils, FaTimes, FaSearch, FaCheck, FaEdit, FaTrashAlt, FaShoppingCart } from 'react-icons/fa';
import tofusaladchesse from '../assets/images/tofusaladcheese.jpg';    
import burgerfries from '../assets/images/burgerfries.jpg';   
import pizzawithsauce from '../assets/images/pizzawithsauce.jpg';    
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

// Ingredient data 
const ingredientOptions = {
  base: [
    { name: 'Pizza', price: 8, image: pizzawithsauce, icon: FaPizzaSlice },
    { name: 'Burger', price: 6, image: burgerfries, icon: FaHamburger },
    { name: 'Salad', price: 5, image: tofusaladchesse, icon: FaLeaf },
  ],
  protein: [
    { name: 'Chicken', price: 3, icon: FaDrumstickBite },
    { name: 'Beef', price: 4, icon: FaHamburger }, 
    { name: 'Tofu', price: 2, icon: FaSeedling },
  ],
  extras: [
    { name: 'Cheese', price: 1, icon: FaCheese },
    { name: 'Fries', price: 2, icon: FaUtensils },
    { name: 'Sauce', price: 1, icon: FaUtensils },
  ],
};

const formatPrice = (n) => `€${n.toFixed(2)}`;

const Specials = () => {
  const { addToCart } = useCart();

  const [selection, setSelection] = useState({ base: null, protein: null, extras: [] });
  const [specials, setSpecials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  // --- Helper Functions 

  const calculateTotalPrice = () => {
    const basePrice = selection.base?.price || 0;
    const proteinPrice = selection.protein?.price || 0;
    const extrasPrice = selection.extras.reduce((s, e) => s + (e.price || 0), 0);
    return basePrice + proteinPrice + extrasPrice;
  };
  
  const totalPrice = calculateTotalPrice(); 

  const filterSpecials = () => {
    const q = search.trim().toLowerCase();
    if (!q) return specials;
    return specials.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  };

  const filteredSpecials = filterSpecials(); 

  // --- Selection and Special Management ---

  const toggleExtra = (extra) => {
    setSelection((prev) => {
      const exists = prev.extras.some((e) => e.name === extra.name);
      return {
        ...prev,
        extras: exists ? prev.extras.filter((e) => e.name !== extra.name) : [...prev.extras, extra],
      };
    });
  };

  const resetSelection = () => setSelection({ base: null, protein: null, extras: [] });

  const createSpecial = () => {
    if (!selection.base || !selection.protein) {
      toast.error('Please choose both a base and a protein.');
      return;
    }

    const id = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    const name = `${selection.base.name} with ${selection.protein.name}`;
    const description = selection.extras.length > 0 ? selection.extras.map((e) => e.name).join(', ') : 'No extras';

    const newSpecial = {
      id,
      name,
      category: 'Custom Special',
      description: `Includes: ${description}`,
      price: totalPrice,
      image: selection.base?.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
      meta: { base: selection.base, protein: selection.protein, extras: selection.extras },
    };

    setSpecials((prev) => [newSpecial, ...prev]);
    toast.success('Special created!');
    resetSelection();
  };

  const removeSpecial = (id) => {
    setSpecials((prev) => prev.filter((s) => s.id !== id));
    toast('Special removed', { icon: '🗑️' });
  };

  const addSpecialToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
    
  };

  const startEdit = (id) => setEditingId(id);
  const stopEdit = () => {
    setEditingId(null);
    toast.success('Special name updated.');
  }

  const updateSpecialName = (id, name) => {
    setSpecials((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s)));
  };

  // --- Ingredient Selection Component ---

  const IngredientSelector = ({ title, options, type, icon }) => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2 text-foodie-charcoal">
        {React.createElement(icon, { className: 'text-foodie-primary' })}
        {title}
      </h2>
      <div className="flex flex-wrap gap-4">
        {options.map((item) => {
          const isSelected = type === 'extras' 
            ? selection.extras.some((x) => x.name === item.name)
            : selection[type]?.name === item.name;

          const onClickHandler = () => {
            if (type === 'extras') {
              toggleExtra(item);
            } else {
              setSelection((prev) => ({ ...prev, [type]: item }));
            }
          };

          return (
            <button
              key={item.name}
              onClick={onClickHandler}
              className={`
                group p-4 rounded-xl border-2 transition-all duration-200 ease-in-out text-left shadow-sm
                ${isSelected 
                  ? 'border-foodie-primary bg-foodie-primary/10 ring-4 ring-foodie-primary/20 scale-105' 
                  : 'border-gray-200 hover:border-foodie-charcoal/50 bg-white hover:shadow-md'
                }
              `}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-3">
                {item.icon ? (
                  React.createElement(item.icon, { className: `text-2xl ${isSelected ? 'text-foodie-primary' : 'text-foodie-charcoal/60'}` })
                ) : (
                  <FaCheck className={`text-2xl ${isSelected ? 'text-foodie-primary' : 'text-foodie-charcoal/60'}`} />
                )}
                <div className='min-w-0'>
                  <div className={`font-semibold truncate ${isSelected ? 'text-foodie-primary' : 'text-foodie-charcoal'}`}>{item.name}</div>
                  <div className="text-sm text-foodie-charcoal/60">{formatPrice(item.price)}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // --- Main Component Render ---
  return (
    <div className="min-h-screen py-16 bg-foodie-cream">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-foodie-charcoal tracking-tight">The Chef's Corner</h1>
          <p className="mt-3 text-lg text-foodie-charcoal/70 max-w-3xl mx-auto">
            Design your signature dish. Choose your base, protein, and extras, then save it as your own special menu item!
          </p>
        </header>

        {/* Builder Section */}
        <Card className="p-8 mb-12 shadow-2xl border-t-4 border-foodie-primary">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <IngredientSelector 
              title="Step 1: The Foundation" 
              options={ingredientOptions.base} 
              type="base" 
              icon={FaPizzaSlice} 
            />
            <IngredientSelector 
              title="Step 2: The Core Protein" 
              options={ingredientOptions.protein} 
              type="protein" 
              icon={FaDrumstickBite} 
            />
            <IngredientSelector 
              title="Step 3: Signature Extras" 
              options={ingredientOptions.extras} 
              type="extras" 
              icon={FaUtensils} 
            />
          </div>

          <hr className="my-8 border-foodie-charcoal/10" />

          {/* Creation and Preview */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-foodie-primary/5 p-4 rounded-xl border border-foodie-primary/20">
            <div className="text-foodie-charcoal flex-1 min-w-0">
              <h3 className="text-xl font-bold">Your Custom Special:</h3>
              <div className="mt-1 font-medium text-2xl truncate">
                {selection.base?.name || 'Base'} &mdash; {selection.protein?.name || 'Protein'}
              </div>
              <div className="text-sm text-foodie-charcoal/70 mt-1 truncate">
                {selection.extras.length > 0 ? selection.extras.map((e) => e.name).join(', ') : 'No extras added'}
              </div>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-4xl font-extrabold text-foodie-primary">{formatPrice(totalPrice)}</div>
              <Button 
                text="Save Special" 
                onClick={createSpecial} 
                variant="primary" 
                className="shadow-lg hover:shadow-xl"
                disabled={!selection.base || !selection.protein}
              />
              <Button text="Reset" onClick={resetSelection} variant="ghost" icon={<FaTimes />} />
            </div>
          </div>
        </Card>

        {/* Specials List Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold text-foodie-charcoal">Your Saved Specials ({specials.length})</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foodie-charcoal/50" />
                <input
                  className="w-full md:w-64 input input-md pl-10 pr-4 py-2 border rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-foodie-primary"
                  placeholder="Search your specials..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search saved specials"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-foodie-charcoal/70"
                    aria-label="Clear search"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
              <Button 
                text="Clear All" 
                variant="outline" 
                onClick={() => { setSpecials([]); toast('All specials cleared', { icon: '🧹' }); }} 
                className="text-red-600 border-red-200 hover:bg-red-50"
              />
            </div>
          </div>

          {filteredSpecials.length === 0 && !search ? (
            <Card className="py-16 text-center bg-white shadow-lg">
              <p className="text-foodie-charcoal/70 text-2xl font-semibold">Ready to get cooking?</p>
              <p className="text-foodie-charcoal/50 mt-2">Use the builder above to create and save your first signature special!</p>
            </Card>
          ) : filteredSpecials.length === 0 && search ? (
            <Card className="py-16 text-center bg-white shadow-lg">
                <p className="text-foodie-charcoal/70 text-2xl font-semibold">No results found.</p>
                <p className="text-foodie-charcoal/50 mt-2">Try a different search term or reset the search.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSpecials.map((item) => (
                <article key={item.id} className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow bg-white flex flex-col">
                  <div className="relative h-48">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-black/30 transition-opacity"></div>
                    <div className="absolute left-0 bottom-0 right-0 p-4 pt-10 text-white bg-gradient-to-t from-black/80 to-transparent">
                      {editingId === item.id ? (
                        <div className="flex items-center gap-2">
                            <input
                                value={item.name}
                                onChange={(e) => updateSpecialName(item.id, e.target.value)}
                                className="input input-sm px-2 py-1 border rounded text-foodie-charcoal font-semibold flex-grow"
                            />
                            <Button text={<FaCheck />} variant="primary" onClick={stopEdit} className="h-8 w-8 p-0" />
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                            <div className="font-extrabold text-xl truncate">{item.name}</div>
                            <button onClick={() => startEdit(item.id)} className="text-white/70 hover:text-white transition-colors" aria-label="Edit name"><FaEdit /></button>
                        </div>
                      )}
                      
                      <div className="text-sm text-white/80 mt-1">{item.description}</div>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="mb-3">
                      <div className="text-foodie-charcoal font-medium text-sm">{item.category}</div>
                      <div className="text-sm text-foodie-charcoal/60 mt-1 font-mono">
                        {item.meta?.base?.name} + {item.meta?.protein?.name}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-dashed">
                      <div className="text-2xl font-bold text-foodie-primary">{formatPrice(item.price)}</div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          text={<FaShoppingCart />} 
                          variant="primary" 
                          onClick={() => addSpecialToCart(item)} 
                          className="h-9 w-9 p-0"
                          aria-label={`Add ${item.name} to cart`}
                        />
                        <Button 
                          text={<FaTrashAlt />} 
                          variant="outline" 
                          onClick={() => removeSpecial(item.id)} 
                          className="text-red-600 border-red-200 h-9 w-9 p-0"
                          aria-label={`Delete ${item.name}`}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Specials;