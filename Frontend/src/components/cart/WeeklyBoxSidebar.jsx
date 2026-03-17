import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WeeklyBoxSidebar = () => {
  const { isSidebarOpen, closeSidebar, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isSidebarOpen) return null;

  const handleCheckoutClick = () => {
    closeSidebar();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop overlay (Engineered Gray) */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(23, 31, 23, 0.4)',
          zIndex: 999,
          backdropFilter: 'blur(8px)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={closeSidebar}
      />

      {/* Sidebar Panel (Whiteframe Framework) */}
      <div 
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: '100%',
          maxWidth: '500px',
          backgroundColor: 'var(--white)',
          zIndex: 1000,
          borderLeft: '1px solid var(--gray-200)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Editorial Header Block */}
        <div style={{ padding: '2.5rem 3rem', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '0.5rem' }}>
              05 / Inventory
            </span>
            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
              YOUR <span style={{ color: 'var(--primary)' }}>BOX.</span>
            </h2>
          </div>
          <button 
            onClick={closeSidebar} 
            style={{ background: 'none', border: '1px solid var(--gray-200)', cursor: 'pointer', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
          >
            <X size={20} color="var(--text)" />
          </button>
        </div>

        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Dynamic Content Area (Framed Items) */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem 3rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 0' }}>
              <div style={{ marginBottom: '2rem', display: 'inline-flex', padding: '2rem', background: 'var(--gray-50)', border: '1px solid var(--gray-200)' }}>
                <ShoppingBag size={48} color="var(--gray-300)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.8rem' }}>BOX IS VACANT.</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>Your pantry selection is waiting for organic additions.</p>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', borderRadius: '0', padding: '1.2rem' }}
                onClick={() => { closeSidebar(); navigate('/products'); }}
              >
                BROWSE CATALOG <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {cartItems.map((item) => (
                <div 
                  key={`${item.id}-${item.size}`} 
                  style={{ 
                    display: 'flex', 
                    gap: '1.5rem', 
                    padding: '1.5rem', 
                    border: '1px solid var(--gray-200)', 
                    margin: '-0.5px 0',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
                >
                  {/* Thumbnail (Mechanical) */}
                  <div style={{ width: '90px', height: '90px', border: '1px solid var(--gray-100)', background: 'var(--gray-50)', flexShrink: 0, padding: '0.4rem' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, letterSpacing: '-0.01em' }}>{item.name.toUpperCase()}</h4>
                      <button 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-300)', padding: '0.2rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-300)'}
                        onClick={() => removeFromCart(item.id, item.size)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase', marginBottom: '1.2rem', display: 'block' }}>
                      {item.size} / PORTION
                    </span>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div className="flex" style={{ gap: '0', border: '1px solid var(--gray-200)' }}>
                        <button 
                          style={{ padding: '0.5rem', background: 'none', border: 'none', borderRight: '1px solid var(--gray-200)', cursor: 'pointer' }}
                          onClick={() => updateQuantity(item.id, item.size, -1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ padding: '0 1rem', fontWeight: 900, minWidth: '40px', textAlign: 'center', fontSize: '0.9rem' }}>{item.quantity}</span>
                        <button 
                          style={{ padding: '0.5rem', background: 'none', border: 'none', borderLeft: '1px solid var(--gray-200)', cursor: 'pointer' }}
                          onClick={() => updateQuantity(item.id, item.size, 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span style={{ fontWeight: 900, fontSize: '1.1rem', color: 'var(--primary)' }}>₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Block (Framed) */}
        {cartItems.length > 0 && (
          <div style={{ padding: '3rem', borderTop: '1px solid var(--gray-200)', background: 'var(--white)' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase' }}>Subtotal Value</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)' }}>₹{cartTotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase' }}>Shipping</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)' }}>CALCULATED AT STEP 02</span>
              </div>
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1.5rem', fontSize: '1rem', borderRadius: '0', letterSpacing: '0.05em' }}
              onClick={handleCheckoutClick}
            >
              PROCEED TO SECURE CHECKOUT <ChevronRight size={18} />
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 800, color: 'var(--gray-400)', marginTop: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              End-to-End Encryption Enabled
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default WeeklyBoxSidebar;
