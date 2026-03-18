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

  // EMPTY STATE
  if (cartItems.length === 0 && formState !== 'success') {
    return (
      <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px', position: 'relative', overflow: 'hidden' }}>
        {/* Background shapes */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--primary-light) 0%, transparent 70%)', opacity: 0.2, filter: 'blur(40px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--secondary-light) 0%, transparent 70%)', opacity: 0.2, filter: 'blur(40px)', zIndex: 0 }} />

        <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="glass-panel slide-up delay-100" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
             <div style={{ marginBottom: '2rem', display: 'inline-flex', padding: '2rem', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '50%', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} className="animate-float">
                <ShoppingBag size={56} color="var(--primary)" />
             </div>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--text)' }}>Your Cart is Empty</h2>
             <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem', lineHeight: 1.6 }}>We have freshly harvested, 100% organic goodies waiting for you. Let's fill up this box!</p>
             <button className="btn btn-cart" onClick={() => navigate('/products')} style={{ padding: '1.2rem 3rem', borderRadius: '16px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
               EXPLORE GOODNESS <ArrowRight size={20} />
             </button>
          </div>
        </div>
      </div>
    );
  }

  // SUCCESS STATE
  if (formState === 'success') {
    return (
      <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px', position: 'relative', overflow: 'hidden' }}>
        {/* Background shapes */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(60px)', zIndex: 0 }} />

        <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="glass-panel slide-up delay-100" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
             <div style={{ marginBottom: '2.5rem', display: 'inline-flex', padding: '2rem', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', color: 'white', borderRadius: '50%', boxShadow: '0 15px 30px rgba(46, 125, 50, 0.3)' }} className="animate-float">
                <CheckCircle2 size={56} />
             </div>
             <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--text)' }}>Order Confirmed!</h1>
             <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
               Thank you for choosing NutriNest. Your selection of natural goodness is being prepared for dispatch. We've sent an email confirmation with all the details.
             </p>
             <div className="flex" style={{ justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
               <button className="btn" onClick={() => navigate('/')} style={{ borderRadius: '16px', background: 'var(--white)', color: 'var(--text)', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', padding: '1.2rem 2.5rem', fontWeight: 800 }}>
                  BACK TO HOME
               </button>
               <button className="btn btn-cart" onClick={() => navigate('/products')} style={{ borderRadius: '16px', padding: '1.2rem 2.5rem' }}>
                  CONTINUE SHOPPING
               </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE CHECKOUT STATE
  return (
    <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px', position: 'relative', overflow: 'hidden' }}>
       {/* High-end decorative background */}
       <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '400px', background: 'linear-gradient(180deg, var(--white) 0%, var(--gray-50) 100%)', zIndex: 0 }} />
       <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--primary-light) 0%, transparent 70%)', opacity: 0.15, filter: 'blur(50px)', zIndex: 0 }} />

      <div className="container" style={{ padding: '0 1rem', position: 'relative', zIndex: 1 }}>
        
        {/* Header Block */}
        <section className="reveal slide-up delay-100" style={{ textAlign: 'center', padding: '5rem 0 4rem 0' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
             <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(46, 125, 50, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
               <ShieldCheck size={16} /> SECURE CHECKOUT
             </span>
             <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 900 }}>
               Finalize Your <span style={{ color: 'var(--primary)' }}>Wholesome Box.</span>
             </h1>
          </div>
        </section>

        <div className="grid md-grid-2 reveal slide-up delay-200" style={{ gap: '2rem', paddingBottom: '6rem', alignItems: 'start' }}>
          
          {/* Left Column: Form */}
          <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
             <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '3rem' }}>
                   <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)' }}>
                     <div style={{ padding: '0.5rem', background: 'rgba(46, 125, 50, 0.1)', borderRadius: '12px' }}><MapPin size={20} /></div>
                     Delivery Information
                   </h3>
                   
                   <div className="grid md-grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                      <div className="input-group">
                        <label className="input-label" style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--gray-500)', marginLeft: '0.5rem' }}>First Name</label>
                        <input type="text" className="form-input" placeholder="e.g. John" required style={{ borderRadius: '12px', background: 'var(--gray-50)', border: '1px solid transparent', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)', padding: '1rem 1.2rem' }} />
                      </div>
                      <div className="input-group">
                        <label className="input-label" style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--gray-500)', marginLeft: '0.5rem' }}>Last Name</label>
                        <input type="text" className="form-input" placeholder="e.g. Doe" required style={{ borderRadius: '12px', background: 'var(--gray-50)', border: '1px solid transparent', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)', padding: '1rem 1.2rem' }} />
                      </div>
                   </div>

                   <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="input-label" style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--gray-500)', marginLeft: '0.5rem' }}>Email Address</label>
                      <input type="email" className="form-input" placeholder="john.doe@example.com" required style={{ borderRadius: '12px', background: 'var(--gray-50)', border: '1px solid transparent', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)', padding: '1rem 1.2rem' }} />
                   </div>

                   <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="input-label" style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--gray-500)', marginLeft: '0.5rem' }}>Street Address</label>
                      <input type="text" className="form-input" placeholder="123 Nature Road, Apt 4" required style={{ borderRadius: '12px', background: 'var(--gray-50)', border: '1px solid transparent', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)', padding: '1rem 1.2rem' }} />
                   </div>

                   <div className="grid md-grid-2" style={{ gap: '1.5rem' }}>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--gray-500)', marginLeft: '0.5rem' }}>City / State</label>
                        <input type="text" className="form-input" placeholder="Metro City" required style={{ borderRadius: '12px', background: 'var(--gray-50)', border: '1px solid transparent', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)', padding: '1rem 1.2rem' }} />
                      </div>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--gray-500)', marginLeft: '0.5rem' }}>Postal Code</label>
                        <input type="text" className="form-input" placeholder="e.g. 10001" required style={{ borderRadius: '12px', background: 'var(--gray-50)', border: '1px solid transparent', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)', padding: '1rem 1.2rem' }} />
                      </div>
                   </div>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                   <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)' }}>
                     <div style={{ padding: '0.5rem', background: 'rgba(46, 125, 50, 0.1)', borderRadius: '12px' }}><CreditCard size={20} /></div>
                     Payment Details
                   </h3>
                   <div style={{ padding: '1.2rem', background: 'rgba(255, 193, 7, 0.1)', borderRadius: '16px', border: '1px solid rgba(255, 193, 7, 0.3)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <Lock size={20} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                        This is a secure checkout simulation. Payments are processed securely via verified gateways like Stripe or Razorpay. No card details are saved on our servers.
                      </p>
                   </div>
                   <div className="input-group">
                      <label className="input-label" style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--gray-500)', marginLeft: '0.5rem' }}>Card Number</label>
                      <input type="text" className="form-input" placeholder="XXXX XXXX XXXX XXXX" required style={{ borderRadius: '12px', background: 'var(--gray-50)', border: '1px solid transparent', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)', padding: '1rem 1.2rem', fontFamily: 'monospace', fontSize: '1.1rem' }} />
                   </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-cart" 
                  style={{ width: '100%', padding: '1.4rem', borderRadius: '16px', fontSize: '1.1rem', letterSpacing: '0.05em' }}
                >
                   {formState === 'loading' ? 'PROCESSING...' : `PAY ₹${cartTotal} SECURELY`}
                </button>
             </form>
          </div>

          {/* Right Column: Order Manifest */}
          <div style={{ position: 'sticky', top: '100px' }}>
             <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '2rem', color: 'var(--text)' }}>
                  Order Summary
                </h3>
                
                <div style={{ marginBottom: '2rem', maxHeight: '40vh', overflowY: 'auto', paddingRight: '1rem' }} className="custom-scrollbar">
                   {cartItems.map((item, index) => (
                     <div key={`${item.id}-${item.size}-${index}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 0', borderBottom: index < cartItems.length - 1 ? '1px dashed var(--gray-200)' : 'none' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ width: '64px', height: '64px', padding: '0.5rem', background: 'white', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                             <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          </div>
                          <div>
                             <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--text)' }}>{item.name}</h4>
                             <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-400)' }}>{item.size} × {item.quantity}</span>
                          </div>
                       </div>
                       <span style={{ fontWeight: 900, fontSize: '1.05rem', color: 'var(--text)' }}>₹{item.price * item.quantity}</span>
                     </div>
                   ))}
                </div>

                <div style={{ padding: '1.5rem', background: 'var(--gray-50)', borderRadius: '16px', marginTop: '1rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-500)' }}>Subtotal</span>
                      <span style={{ fontWeight: 800, color: 'var(--text)' }}>₹{cartTotal}</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-500)' }}>Shipping Estimate</span>
                      <span style={{ fontWeight: 800, color: 'var(--primary)' }}>FREE</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px dashed var(--gray-200)' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text)' }}>Total to Pay</span>
                      <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.03em' }}>₹{cartTotal}</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
