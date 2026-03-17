import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ShieldCheck, Leaf, ChevronRight, CheckCircle2, Star, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost/NutriNest/Backend/api/products.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if(data.message === 'Product not found') {
           navigate('/products');
           return;
        }

        const mappedProduct = {
          id: data.product_id,
          name: data.name,
          image: data.image_url,
          description: data.description,
          ingredients: data.ingredients || '100% pure fruit. Absolutely no artificial additives or refined sugars.',
          nutrition: data.nutrition_info,
          storage: data.storage_instructions || 'Store in a cool, dry place. Reseal tightly after opening to preserve crunch.',
          sizes: data.sizes && data.sizes.length > 0 
                  ? data.sizes.map(s => ({ label: s.size_label, price: parseFloat(s.price) })) 
                  : [{ label: '100g', price: parseFloat(data.base_price) }]
        };
        
        setProduct(mappedProduct);
        if(mappedProduct.sizes.length > 0) {
           setSelectedSize(mappedProduct.sizes[0].label);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch product bounds", err);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading || !product) {
    return (
      <div className="section container text-center" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Leaf size={48} color="var(--primary)" className="animate-float" />
      </div>
    );
  }

  const currentPrice = product.sizes.find(s => s.label === selectedSize)?.price || product.sizes[0].price;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, currentPrice);
  };

  return (
    <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container wf-container" style={{ padding: 0 }}>
        
        {/* Navigation Breadcrumb Strip */}
        <div style={{ padding: '1.5rem 4rem', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', fontWeight: 800 }}>
           <Link to="/products" style={{ color: 'var(--text-muted)' }}>CATALOG</Link>
           <ChevronRight size={14} color="var(--gray-300)" />
           <span style={{ color: 'var(--primary)', letterSpacing: '0.05em' }}>{product.name.toUpperCase()}</span>
        </div>

        {/* Main Product Frame */}
        <div className="wf-grid-bordered md-grid-2" style={{ border: 'none' }}>
           
           {/* Left: Product Image (Framed) */}
           <div style={{ padding: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--white)', borderRight: '1px solid var(--gray-200)' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
                 <div style={{ position: 'absolute', top: '-1rem', left: '-1rem', padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', fontSize: '0.7rem', fontWeight: 900, zIndex: 1 }}>
                    B-0{product.id} / ORIGIN ASSURED
                 </div>
                 <div className="wf-border" style={{ padding: '2rem', background: 'var(--gray-50)' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                 </div>
                 <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                    {[1,2,3].map(i => (
                      <div key={i} className="wf-border" style={{ width: '60px', height: '60px', opacity: i === 1 ? 1 : 0.4, cursor: 'pointer' }}>
                        <img src={product.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Right: Product Details (Structured) */}
           <div style={{ padding: '4rem', background: 'var(--white)' }}>
              <div style={{ marginBottom: '3rem' }}>
                 <div className="flex" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--secondary)" color="var(--secondary)" />)}
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginLeft: '0.5rem' }}>(4.9/5 RATING)</span>
                 </div>
                 <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.9, marginBottom: '1.5rem', fontWeight: 900 }}>
                   {product.name}
                 </h1>
                 <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                   {product.description}
                 </p>
              </div>

              {/* Pricing & Selection Frame */}
              <div className="wf-border" style={{ padding: '2.5rem', marginBottom: '3rem' }}>
                 <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div>
                       <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase' }}>Current Price</span>
                       <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)' }}>₹{currentPrice}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                       <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase' }}>In Stock</span>
                       <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.85rem' }}>Ready to Nest</span>
                    </div>
                 </div>

                 <div style={{ marginBottom: '2.5rem' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text)', textTransform: 'uppercase', marginBottom: '1rem' }}>Select Portion</span>
                    <div className="flex" style={{ flexWrap: 'wrap', gap: '0.8rem' }}>
                       {product.sizes.map(size => (
                         <button
                           key={size.label}
                           onClick={() => setSelectedSize(size.label)}
                           style={{
                             padding: '0.8rem 1.5rem',
                             border: `2px solid ${selectedSize === size.label ? 'var(--primary)' : 'var(--gray-200)'}`,
                             background: selectedSize === size.label ? 'var(--primary)' : 'transparent',
                             color: selectedSize === size.label ? 'white' : 'var(--text)',
                             fontWeight: 800,
                             fontSize: '0.85rem',
                             cursor: 'pointer',
                             transition: 'all 0.2s'
                           }}
                         >
                           {size.label.toUpperCase()}
                         </button>
                       ))}
                    </div>
                 </div>

                 <button 
                   onClick={handleAddToCart}
                   className="btn btn-primary" 
                   style={{ width: '100%', padding: '1.4rem', borderRadius: '0', fontSize: '1rem', letterSpacing: '0.05em' }}
                 >
                   APPEND TO BOX <ShoppingBag size={20} />
                 </button>
              </div>

              {/* Technical Specifications (Framed blocks) */}
              <div className="wf-grid-bordered md-grid-2">
                 <div style={{ padding: '1.5rem' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem' }}>Ingredients</span>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{product.ingredients}</p>
                 </div>
                 <div style={{ padding: '1.5rem' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem' }}>Nutrition</span>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{product.nutrition}</p>
                 </div>
                 <div style={{ padding: '1.5rem' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem' }}>Storage</span>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{product.storage}</p>
                 </div>
                 <div style={{ padding: '1.5rem' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem' }}>Purity</span>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>100% Lab Verified</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Footer Info Block */}
        <section style={{ padding: '4.5rem', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)', background: 'var(--gray-50)' }}>
           <div className="grid md-grid-3" style={{ gap: '4rem' }}>
              <div className="flex" style={{ alignItems: 'flex-start' }}>
                 <div style={{ padding: '1rem', background: 'var(--white)', border: '1px solid var(--gray-200)' }}><Leaf size={24} color="var(--primary)" /></div>
                 <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Sustainable Sourcing</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>We work directly with local farms ensuring fair wages and chemical-free cultivation.</p>
                 </div>
              </div>
              <div className="flex" style={{ alignItems: 'flex-start' }}>
                 <div style={{ padding: '1rem', background: 'var(--white)', border: '1px solid var(--gray-200)' }}><ShieldCheck size={24} color="var(--primary)" /></div>
                 <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Purity Promise</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No refined oils, no added sugars, no artificial colors. Ever.</p>
                 </div>
              </div>
              <div className="flex" style={{ alignItems: 'flex-start' }}>
                 <div style={{ padding: '1rem', background: 'var(--white)', border: '1px solid var(--gray-200)' }}><CheckCircle2 size={24} color="var(--primary)" /></div>
                 <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Doorstep Delivery</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Carefully packed to preserve crunch and freshness until it reaches your doorstep.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Related Products Hook */}
        <div style={{ padding: '4rem', textAlign: 'center' }}>
           <h4 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Complete the <span style={{ color: 'var(--primary)' }}>Wholesome</span> Experience</h4>
           <Link to="/products" className="btn" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '0' }}>
             BROWSE CATALOG <ChevronRight size={18} />
           </Link>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
