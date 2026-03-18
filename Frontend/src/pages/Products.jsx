import React, { useState, useEffect } from 'react';
import { ShoppingBag, Leaf, Search, ArrowRight, ChevronRight, SlidersHorizontal, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    fetch('http://localhost/NutriNest/Backend/api/products.php')
      .then(res => res.json())
      .then(data => {
        const formattedData = data.map((dbProd) => ({
          id: dbProd.product_id,
          name: dbProd.name,
          image: dbProd.image_url,
          description: dbProd.description || 'Pure organic goodness, naturally dried.',
          price: parseFloat(dbProd.base_price),
          category: dbProd.category_name || 'Snacks',
          calories: dbProd.calories || '250',
          protein: dbProd.protein || '5g'
        }));
        setProducts(formattedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p =>
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const handleAddToCart = (e, prod) => {
    e.preventDefault();
    addToCart(prod, '100g', prod.price);
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  if (loading) {
    return (
      <div className="section container text-center" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Leaf size={48} color="var(--primary)" className="animate-float" />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px' }}>
      <style>{`
        .prod-card { position: relative; }
        .prod-card .prod-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(46,125,50,0.06) 100%);
          opacity: 0; transition: opacity 0.4s;
        }
        .prod-card:hover .prod-overlay { opacity: 1; }
        .prod-card:hover .prod-img { transform: scale(1.08); }
        .prod-card:hover .prod-view { opacity: 1; transform: translateY(0); }
        .prod-card:hover { border-color: var(--primary) !important; background: var(--white) !important; }
        .cat-btn { position: relative; }
        .cat-btn::after {
          content: ''; position: absolute; left: 0; bottom: 0;
          width: 0; height: 2px; background: var(--primary);
          transition: width 0.3s;
        }
        .cat-btn:hover::after, .cat-btn.active::after { width: 100%; }
        .add-btn {
          position: relative; overflow: hidden;
        }
        .add-btn::before {
          content: ''; position: absolute; inset: 0;
          background: var(--primary);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
        }
        .add-btn:hover::before { transform: scaleX(1); }
        .add-btn:hover { color: white !important; border-color: var(--primary) !important; }
        .add-btn span, .add-btn svg { position: relative; z-index: 1; }
        .search-pro:focus { 
          border-color: var(--primary) !important; 
          box-shadow: 0 0 0 3px rgba(46,125,50,0.08) !important; 
        }
      `}</style>

      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Hero Header */}
        <section style={{ padding: '5rem 0 3rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ maxWidth: '650px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '2px', background: 'var(--primary)' }}></div>
                <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Our Collection
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 900, color: 'var(--text)' }}>
                Farm-Fresh <span style={{ color: 'var(--primary)' }}>Organic</span> Snacks
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Handpicked, naturally dried, and packed with nutrition. Every item is 100% pure with zero refined sugars.
              </p>
            </div>
            
            <div style={{ width: '100%', maxWidth: '380px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="search-pro"
                  style={{ 
                    width: '100%', padding: '1rem 1rem 1rem 3.2rem', 
                    border: '2px solid var(--gray-200)', borderRadius: '8px',
                    fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--font-body)',
                    outline: 'none', transition: 'all 0.3s',
                    background: 'var(--white)'
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.3rem', marginTop: '3rem', borderBottom: '2px solid var(--gray-200)', paddingBottom: '0' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  background: 'none', border: 'none', 
                  padding: '0.8rem 1.5rem', 
                  fontWeight: selectedCategory === cat ? 800 : 600,
                  color: selectedCategory === cat ? 'var(--primary)' : 'var(--text-muted)',
                  fontSize: '0.9rem', cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'color 0.3s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Results Count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Showing <strong style={{ color: 'var(--text)' }}>{filteredProducts.length}</strong> products
          </span>
        </div>

        {/* Product Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem',
          paddingBottom: '6rem'
        }}>
          {filteredProducts.map((prod) => (
            <Link 
              key={prod.id} 
              to={`/products/${prod.id}`}
              className="prod-card"
              style={{ 
                display: 'block', textDecoration: 'none', color: 'inherit',
                border: '1px solid var(--gray-200)', borderRadius: '12px',
                background: 'var(--white)', overflow: 'hidden',
                transition: 'all 0.35s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden', background: 'var(--gray-50)' }}>
                <img 
                  className="prod-img"
                  src={prod.image} 
                  alt={prod.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2rem', transition: 'transform 0.5s ease' }} 
                />
                <div className="prod-overlay" />
                
                {/* Category Badge */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span style={{ 
                    background: 'var(--white)', padding: '0.4rem 0.8rem', 
                    borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, 
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    color: 'var(--text)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    {prod.category}
                  </span>
                </div>

                {/* Quick View */}
                <div className="prod-view" style={{ 
                  position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%) translateY(10px)',
                  opacity: 0, transition: 'all 0.3s ease'
                }}>
                  <span style={{ 
                    background: 'var(--text)', color: 'white',
                    padding: '0.5rem 1.2rem', borderRadius: '6px',
                    fontSize: '0.75rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', gap: '0.4rem'
                  }}>
                    <Eye size={14} /> Quick View
                  </span>
                </div>
              </div>

              {/* Details */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text)' }}>{prod.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.2rem', lineHeight: 1.5, height: '2.5em', overflow: 'hidden' }}>
                  {prod.description}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', display: 'block', marginBottom: '0.15rem' }}>From</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary)' }}>₹{prod.price}</span>
                  </div>
                  <button 
                    className="add-btn"
                    onClick={(e) => handleAddToCart(e, prod)}
                    style={{ 
                      background: 'transparent', 
                      border: '2px solid var(--gray-200)', 
                      color: 'var(--text)', 
                      padding: '0.6rem 1.2rem', 
                      borderRadius: '8px',
                      fontWeight: 700, fontSize: '0.8rem', 
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      fontFamily: 'var(--font-body)',
                      transition: 'color 0.3s, border-color 0.3s'
                    }}
                  >
                    <span>{addedId === prod.id ? '✓ ADDED' : 'ADD TO BOX'}</span> 
                    <ShoppingBag size={14} style={{ position: 'relative', zIndex: 1 }} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
            <Search size={48} color="var(--gray-300)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.8rem', color: 'var(--text)' }}>No products found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem' }}>Try adjusting your search or category filter.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} 
              style={{ 
                background: 'var(--primary)', color: 'white', border: 'none', 
                padding: '0.9rem 2rem', fontWeight: 700, cursor: 'pointer',
                borderRadius: '8px', fontSize: '0.9rem',
                fontFamily: 'var(--font-body)'
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
