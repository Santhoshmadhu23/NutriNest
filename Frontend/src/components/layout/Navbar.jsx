import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleSidebar, cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/process', label: 'Our Process' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
      boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.03)' : 'none',
      transition: 'all 0.4s cubic-bezier(.16, 1, 0.3, 1)',
      borderBottom: scrolled ? '1px solid var(--gray-200)' : '1px solid transparent',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: scrolled ? '0.8rem 1rem' : '1.2rem 1rem', transition: 'padding 0.4s ease' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{
            width: '42px', height: '42px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 'bold', fontSize: '0.9rem',
            boxShadow: '0 4px 12px rgba(46,125,50,0.2)',
            transition: 'transform 0.3s ease'
          }}>
            <Leaf size={22} />
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>NutriNest</span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }} className="desktop-nav">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontWeight: 600,
                fontSize: '0.95rem',
                color: isActive(link.path) ? 'var(--primary)' : 'var(--text)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isActive(link.path) ? 'rgba(46,125,50,0.08)' : 'transparent',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                position: 'relative',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button
            style={{
              background: 'none', border: 'none', cursor: 'pointer', position: 'relative',
              padding: '0.5rem',
              borderRadius: '50%',
              transition: 'background 0.3s ease',
            }}
            onClick={toggleSidebar}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(46,125,50,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <ShoppingBag color="var(--primary)" size={22} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '0', right: '0',
                background: 'linear-gradient(135deg, var(--secondary) 0%, #FFD54F 100%)',
                color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 800,
                borderRadius: '50%', width: '20px', height: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(255,193,7,0.4)',
                animation: cartCount > 0 ? 'pulse 2s infinite' : 'none',
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="mobile-only"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              transition: 'background 0.3s ease',
            }}
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(46,125,50,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            {isOpen ? <X color="var(--primary)" size={22}/> : <Menu color="var(--primary)" size={22}/>}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div style={{
        maxHeight: isOpen ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(.25,.8,.25,1)',
        background: 'rgba(255,248,225,0.98)',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ padding: '0.5rem 1rem 1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                fontWeight: 600, color: isActive(link.path) ? 'var(--primary)' : 'var(--text)',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isActive(link.path) ? 'rgba(46,125,50,0.08)' : 'transparent',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
                fontSize: '1.05rem',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
