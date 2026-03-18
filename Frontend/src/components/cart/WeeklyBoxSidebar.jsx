import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronRight, Leaf, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WeeklyBoxSidebar = () => {
  const { isSidebarOpen, closeSidebar, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isSidebarOpen) return null;

  const handleCheckoutClick = () => {
    closeSidebar();
    navigate('/checkout');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <style>{`
        @keyframes cartSlide {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes cartFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .cart-item-hover { transition: all 0.25s ease; }
        .cart-item-hover:hover { background: var(--gray-50) !important; }
        .qty-btn { transition: all 0.2s; }
        .qty-btn:hover { background: var(--primary) !important; color: white !important; }
        .cart-scroll::-webkit-scrollbar { width: 3px; }
        .cart-scroll::-webkit-scrollbar-track { background: transparent; }
        .cart-scroll::-webkit-scrollbar-thumb { background: var(--gray-200); border-radius: 3px; }
        .remove-btn { transition: all 0.2s; }
        .remove-btn:hover { color: #e53935 !important; transform: scale(1.1); }
      `}</style>

      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 999, backdropFilter: 'blur(6px)',
          animation: 'cartFade 0.3s ease'
        }}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <div 
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '100%', maxWidth: '440px',
          backgroundColor: 'var(--white)',
          zIndex: 1000,
          display: 'flex', flexDirection: 'column',
          boxShadow: '-8px 0 30px rgba(0,0,0,0.08)',
          animation: 'cartSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div style={{ 
          padding: '1.5rem 2rem', 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid var(--gray-200)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <ShoppingBag size={22} color="var(--primary)" />
            <div>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)' }}>Shopping Box</h2>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
          <button 
            onClick={closeSidebar} 
            style={{ 
              background: 'none', border: '1px solid var(--gray-200)', 
              cursor: 'pointer', padding: '0.5rem', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; }}
          >
            <X size={18} color="var(--text)" />
          </button>
        </div>

        {/* Free Shipping Banner */}
        {cartItems.length > 0 && (
          <div style={{
            margin: '1rem 2rem 0 2rem', padding: '0.6rem 1rem',
            background: 'rgba(46,125,50,0.06)', borderRadius: '8px',
            border: '1px solid rgba(46,125,50,0.12)',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            <Leaf size={14} color="var(--primary)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>
              Free shipping on all orders!
            </span>
          </div>
        )}

        {/* Items */}
        <div className="cart-scroll" style={{ flex: 1, overflowY: 'auto', padding: '1rem 2rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
              <div style={{ 
                width: '80px', height: '80px', margin: '0 auto 1.5rem',
                background: 'var(--gray-50)', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <ShoppingBag size={32} color="var(--gray-300)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text)' }}>Your box is empty</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                Start adding some organic goodness!
              </p>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 700 }}
                onClick={() => { closeSidebar(); navigate('/products'); }}
              >
                Browse Products <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.5rem' }}>
              {cartItems.map((item) => (
                <div 
                  key={`${item.id}-${item.size}`}
                  className="cart-item-hover"
                  style={{ 
                    display: 'flex', gap: '1rem', 
                    padding: '1rem', borderRadius: '10px'
                  }}
                >
                  {/* Image */}
                  <div style={{ 
                    width: '72px', height: '72px', borderRadius: '10px', 
                    background: 'var(--gray-50)', flexShrink: 0, padding: '0.4rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.2rem' }}>
                      <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </h4>
                      <button 
                        className="remove-btn"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-300)', padding: '0.15rem', flexShrink: 0 }}
                        onClick={() => removeFromCart(item.id, item.size)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                      {item.size}
                    </span>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--gray-200)', borderRadius: '8px', overflow: 'hidden' }}>
                        <button 
                          className="qty-btn"
                          style={{ padding: '0.3rem 0.5rem', background: 'none', border: 'none', borderRight: '1px solid var(--gray-200)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          onClick={() => updateQuantity(item.id, item.size, -1)}
                        >
                          <Minus size={13} color="var(--text)" />
                        </button>
                        <span style={{ padding: '0 0.7rem', fontWeight: 800, fontSize: '0.85rem', color: 'var(--text)', minWidth: '32px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button 
                          className="qty-btn"
                          style={{ padding: '0.3rem 0.5rem', background: 'none', border: 'none', borderLeft: '1px solid var(--gray-200)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          onClick={() => updateQuantity(item.id, item.size, 1)}
                        >
                          <Plus size={13} color="var(--text)" />
                        </button>
                      </div>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary)' }}>₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ 
            padding: '1.5rem 2rem', 
            borderTop: '1px solid var(--gray-200)', 
            background: 'var(--white)'
          }}>
            {/* Summary */}
            <div style={{ marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Subtotal</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>₹{cartTotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Shipping</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>FREE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.8rem', borderTop: '1px dashed var(--gray-200)' }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text)' }}>Total</span>
                <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary)' }}>₹{cartTotal}</span>
              </div>
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ 
                width: '100%', padding: '1.1rem', fontSize: '0.95rem', 
                borderRadius: '10px', letterSpacing: '0.03em',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                fontWeight: 700
              }}
              onClick={handleCheckoutClick}
            >
              Proceed to Checkout <ChevronRight size={18} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.8rem' }}>
              <ShieldCheck size={13} color="var(--gray-400)" />
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--gray-400)' }}>
                Secure & encrypted checkout
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeeklyBoxSidebar;
