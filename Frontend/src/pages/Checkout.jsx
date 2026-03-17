import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowRight, ChevronRight, Lock, CreditCard, MapPin, ShoppingBag } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formState, setFormState] = useState('idle'); // idle, loading, success

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    // Simulate API Call for order placement
    setTimeout(() => {
      setFormState('success');
      clearCart();
    }, 2000);
  };

  if (cartItems.length === 0 && formState !== 'success') {
    return (
      <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px' }}>
        <div className="container wf-container" style={{ padding: '8rem 4rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem', display: 'inline-flex', padding: '2rem', background: 'var(--white)', border: '1px solid var(--gray-200)' }}>
             <ShoppingBag size={48} color="var(--gray-200)" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>YOUR BOX IS VACANT.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Please add some healthy snacks to your selection before proceeding.</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')} style={{ borderRadius: '0', padding: '1.2rem 2.5rem' }}>
            SHOP CATALOG <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (formState === 'success') {
    return (
      <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px' }}>
        <div className="container wf-container" style={{ padding: '8rem 4rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '2.5rem', display: 'inline-flex', padding: '2rem', background: 'var(--primary)', color: 'white', borderRadius: '4px' }}>
             <CheckCircle2 size={48} />
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--primary)' }}>ORDER_CONFIRMED</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 4rem auto', lineHeight: 1.6 }}>
            Thank you for choosing NutriNest. Your selection of natural goodness is being prepared for dispatch. A breakdown has been sent to your email.
          </p>
          <div className="flex" style={{ justifyContent: 'center', gap: '1.5rem' }}>
            <button className="btn" onClick={() => navigate('/')} style={{ borderRadius: '0', background: 'var(--white)', border: '1px solid var(--gray-200)', padding: '1.2rem 2rem' }}>
               BACK TO HOME
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/products')} style={{ borderRadius: '0', padding: '1.2rem 2rem' }}>
               CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container wf-container" style={{ padding: 0 }}>
        
        {/* Header Block */}
        <section className="wf-section-header reveal" style={{ textAlign: 'left', padding: '6rem 4rem' }}>
          <div style={{ maxWidth: '800px' }}>
             <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>
               06 / Checkout
             </span>
             <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.9, marginBottom: '2rem', fontWeight: 900 }}>
               Secure Your <span style={{ color: 'var(--primary)' }}>Nest.</span>
             </h1>
             <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.6 }}>
               Your data is protected with 256-bit encryption. Complete the form below to finalize your weekly box delivery.
             </p>
          </div>
        </section>

        <div className="wf-grid-bordered md-grid-2 reveal">
          
          {/* Left Column: Information Gathering */}
          <div style={{ padding: '4rem', background: 'var(--white)', borderRight: '1px solid var(--gray-200)' }}>
             <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '4rem' }}>
                   <h3 style={{ fontSize: '1rem', fontWeight: 900, letterSpacing: '0.1em', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <MapPin size={18} /> DELIVERY_ADDRESS
                   </h3>
                   
                   <div className="grid md-grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                      <div className="input-group">
                        <label className="input-label" style={{ fontWeight: 900, fontSize: '0.7rem' }}>FIRST_NAME</label>
                        <input type="text" className="form-input wf-border" placeholder="Required" required style={{ borderRadius: 0 }} />
                      </div>
                      <div className="input-group">
                        <label className="input-label" style={{ fontWeight: 900, fontSize: '0.7rem' }}>LAST_NAME</label>
                        <input type="text" className="form-input wf-border" placeholder="Required" required style={{ borderRadius: 0 }} />
                      </div>
                   </div>

                   <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="input-label" style={{ fontWeight: 900, fontSize: '0.7rem' }}>CONTACT_EMAIL</label>
                      <input type="email" className="form-input wf-border" placeholder="name@email.com" required style={{ borderRadius: 0 }} />
                   </div>

                   <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="input-label" style={{ fontWeight: 900, fontSize: '0.7rem' }}>SHIPPING_STREET</label>
                      <input type="text" className="form-input wf-border" placeholder="123 Nature Road" required style={{ borderRadius: 0 }} />
                   </div>

                   <div className="grid md-grid-2" style={{ gap: '1.5rem' }}>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontWeight: 900, fontSize: '0.7rem' }}>CITY / STATE</label>
                        <input type="text" className="form-input wf-border" placeholder="Required" required style={{ borderRadius: 0 }} />
                      </div>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontWeight: 900, fontSize: '0.7rem' }}>POSTAL_CODE</label>
                        <input type="text" className="form-input wf-border" placeholder="Required" required style={{ borderRadius: 0 }} />
                      </div>
                   </div>
                </div>

                <div style={{ marginBottom: '4rem' }}>
                   <h3 style={{ fontSize: '1rem', fontWeight: 900, letterSpacing: '0.1em', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <CreditCard size={18} /> PAYMENT_PROTOCOL
                   </h3>
                   <div style={{ padding: '1.5rem', background: 'var(--gray-50)', border: '1px solid var(--gray-200)', marginBottom: '2rem' }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        This is a secure checkout simulation. In a live environment, you would be redirected to a verified payment gateway (Razorpay/Stripe).
                      </p>
                   </div>
                   <div className="input-group">
                      <label className="input-label" style={{ fontWeight: 900, fontSize: '0.7rem' }}>CARD_NUMBER</label>
                      <input type="text" className="form-input wf-border" placeholder="XXXX XXXX XXXX XXXX" required style={{ borderRadius: 0 }} />
                   </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '1.5rem', borderRadius: 0, fontSize: '1rem', letterSpacing: '0.05em' }}
                >
                   {formState === 'loading' ? 'AUTHORIZING...' : `FINALIZE TRANSACTION // ₹${cartTotal}`}
                </button>
             </form>
          </div>

          {/* Right Column: Order Manifest */}
          <div style={{ padding: '4rem', background: 'var(--white)' }}>
             <h3 style={{ fontSize: '1rem', fontWeight: 900, letterSpacing: '0.1em', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <ShieldCheck size={18} /> ORDER_MANIFEST
             </h3>
             
             <div style={{ marginBottom: '3rem' }}>
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.size}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0', borderBottom: '1px solid var(--gray-100)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                       <div style={{ width: '60px', height: '60px', padding: '0.3rem', border: '1px solid var(--gray-200)', background: 'var(--gray-50)' }}>
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                       </div>
                       <div>
                          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 900 }}>{item.name.toUpperCase()}</h4>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase' }}>{item.size} x {item.quantity}</span>
                       </div>
                    </div>
                    <span style={{ fontWeight: 900, fontSize: '1.1rem' }}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
             </div>

             <div className="wf-border" style={{ padding: '2.5rem', background: 'var(--gray-50)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                   <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--gray-400)', textTransform: 'uppercase' }}>Subtotal Value</span>
                   <span style={{ fontWeight: 900 }}>₹{cartTotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                   <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--gray-400)', textTransform: 'uppercase' }}>Shipping (Standard)</span>
                   <span style={{ fontWeight: 900, color: 'var(--primary)' }}>INCLUDED</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 900, borderTop: '1px solid var(--gray-200)', paddingTop: '1.5rem' }}>
                   <span style={{ color: 'var(--primary)' }}>TOTAL_PAYABLE</span>
                   <span>₹{cartTotal}</span>
                </div>
             </div>

             <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.8rem', opacity: 0.6 }}>
                <Lock size={14} />
                <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em' }}>ENCRYPTION_PROTOCOL_AES_256V1_ENABLED</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
