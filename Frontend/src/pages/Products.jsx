import React, { useState, useEffect } from 'react';
import { ShoppingBag, Leaf, Search, Filter, ArrowRight, ChevronRight, X, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  if (loading) {
    return (
      <div className="section container text-center" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Leaf size={48} color="var(--primary)" className="animate-float" />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container wf-container" style={{ padding: 0 }}>
        
        {/* Header Section */}
        <section className="wf-section-header" style={{ padding: '6rem 4rem' }}>
          <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ maxWidth: '700px' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>
                02 / Catalog
              </span>
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.9, marginBottom: '2rem', fontWeight: 900 }}>
                The <span style={{ color: 'var(--primary)' }}>Snack</span> Inventory.
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Every item in our nest is verified for 100% purity. Zero refined sugars, zero preservatives, infinite goodness.
              </p>
            </div>
            
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input 
                  type="text" 
                  placeholder="SEARCH INVENTORY..." 
                  className="form-input wf-border" 
                  style={{ borderRadius: '0', paddingLeft: '3rem', fontSize: '0.85rem', fontWeight: 700 }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <div style={{ display: 'flex', minHeight: '800px' }}>
          
          {/* Filter Sidebar (Framed) */}
          <aside style={{ width: '280px', borderRight: '1px solid var(--gray-200)', padding: '3rem', flexShrink: 0 }}>
             <div style={{ marginBottom: '4rem' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SlidersHorizontal size={14} /> CATEGORIES
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                   {categories.map(cat => (
                     <button 
                       key={cat}
                       onClick={() => setSelectedCategory(cat)}
                       style={{ 
                         textAlign: 'left', 
                         background: 'none', 
                         border: 'none', 
                         padding: '0.5rem 0', 
                         fontWeight: selectedCategory === cat ? 900 : 500,
                         color: selectedCategory === cat ? 'var(--primary)' : 'var(--text-muted)',
                         fontSize: '0.95rem',
                         cursor: 'pointer',
                         transition: 'color 0.2s',
                         display: 'flex',
                         justifyContent: 'space-between',
                         alignItems: 'center'
                       }}
                     >
                       {cat.toUpperCase()}
                       {selectedCategory === cat && <ChevronRight size={14} />}
                     </button>
                   ))}
                </div>
             </div>

             <div style={{ marginBottom: '4rem' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>DIETARY</h4>
                {['No Added Sugar', 'Vegan Rooted', 'High Fiber', 'Gluten Free'].map(tag => (
                  <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input type="checkbox" style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                    {tag}
                  </label>
                ))}
             </div>

             <div style={{ padding: '2rem', background: 'var(--gray-100)', borderRadius: '4px' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>NEED BULK?</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Contact our wholesale team for special pricing.</p>
                <Link to="/contact" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 900, color: 'var(--primary)' }}>
                  INQUIRE NOW <ArrowRight size={14} />
                </Link>
             </div>
          </aside>

          {/* Product Grid (Structured) */}
          <main style={{ flexGrow: 1, background: 'var(--white)' }}>
            <div className="wf-grid-bordered md-grid-2 lg-grid-3" style={{ border: 'none' }}>
              {filteredProducts.map((prod, idx) => (
                <Link 
                  key={prod.id} 
                  to={`/products/${prod.id}`}
                  style={{ display: 'block', padding: '2.5rem', border: '1px solid var(--gray-200)', margin: '-0.5px', textDecoration: 'none', color: 'inherit', transition: 'var(--transition-base)' }}
                  className="product-card-wf"
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
                >
                  <div style={{ position: 'relative', height: '240px', marginBottom: '2rem', overflow: 'hidden', background: 'var(--gray-50)', padding: '1rem' }}>
                     <img 
                       src={prod.image} 
                       alt={prod.name} 
                       style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.6s' }} 
                     />
                     <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                        <span style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', padding: '0.3rem 0.6rem', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase' }}>
                          {prod.category}
                        </span>
                     </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{prod.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', height: '2.5rem', overflow: 'hidden' }}>{prod.description}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--gray-200)', paddingTop: '1.5rem' }}>
                       <div>
                         <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase' }}>Starting at</span>
                         <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>₹{prod.price}</span>
                       </div>
                       <button 
                         onClick={(e) => { e.preventDefault(); addToCart(prod, '100g', prod.price); }}
                         style={{ 
                           background: 'none', 
                           border: '2px solid var(--primary)', 
                           color: 'var(--primary)', 
                           padding: '0.5rem 1rem', 
                           fontWeight: 900, 
                           fontSize: '0.75rem', 
                           cursor: 'pointer',
                           display: 'flex',
                           alignItems: 'center',
                           gap: '0.5rem'
                         }}
                       >
                         ADD TO BOX <ShoppingBag size={14} />
                       </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div style={{ padding: '8rem 4rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No results found.</h3>
                <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search terms.</p>
                <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} style={{ marginTop: '2rem', background: 'var(--primary)', color: 'white', border: 'none', padding: '1rem 2rem', fontWeight: 800, cursor: 'pointer' }}>
                  RESET ALL FILTERS
                </button>
              </div>
            )}
          </main>
        </div>

      </div>
    </div>
  );
};

export default Products;
