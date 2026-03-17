import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Twitter, Facebook, Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
      {/* Wave Divider (Seamless connection) */}
      <div style={{ transform: 'rotate(180deg) translateY(2px)', lineHeight: 0 }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ fill: 'var(--background)', width: '100%', height: '60px' }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,137.65,130.6,215,117.8,252.17,111.45,287.65,92.1,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div className="grid md-grid-3 lg-grid-4" style={{ gap: '4rem', marginBottom: '4rem' }}>
          
          {/* Brand & Mission section */}
          <div className="lg-span-2">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--secondary)', textDecoration: 'none', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--white)', padding: '0.5rem', borderRadius: '10px' }}>
                 <Leaf size={24} color="var(--primary)" />
              </div>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em' }}>NutriNest</span>
            </Link>
            <p style={{ opacity: 0.85, fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '400px' }}>
              We're on a mission to bring the purest, farm-fresh snacks to your doorstep. No chemicals, no compromises—just nature's honest sweetness.
            </p>
            <div className="flex" style={{ gap: '1rem' }}>
              {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                <a key={idx} href="#" style={{ 
                  width: '40px', height: '40px', borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.1)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.3s ease'
                }} onMouseEnter={e => e.currentTarget.style.background = 'var(--secondary)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ minWidth: '150px' }}>
            <h4 style={{ color: 'var(--secondary)', fontSize: '1.2rem', marginBottom: '2rem', fontWeight: 800 }}>Explore</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {['About Us', 'Shop Products', 'Our Process', 'Wholesale'].map(item => (
                 <li key={item}><Link to={`/${item.toLowerCase().replace(' ', '-')}`} style={{ opacity: 0.8, transition: 'opacity 0.3s' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}>{item}</Link></li>
               ))}
            </ul>
          </div>

          {/* Support Links */}
          <div style={{ minWidth: '150px' }}>
            <h4 style={{ color: 'var(--secondary)', fontSize: '1.2rem', marginBottom: '2rem', fontWeight: 800 }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {['Contact Us', 'Shipping Policy', 'Refund Policy', 'Privacy Policy'].map(item => (
                 <li key={item}><Link to={`/${item.toLowerCase().replace(' ', '-')}`} style={{ opacity: 0.8, transition: 'opacity 0.3s' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}>{item}</Link></li>
               ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div style={{ flexGrow: 1, minWidth: '280px' }}>
            <h4 style={{ color: 'var(--secondary)', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 800 }}>Join the Nest</h4>
            <p style={{ opacity: 0.8, fontSize: '0.95rem', marginBottom: '1.5rem' }}>Get weekly health tips and exclusive first access to new seasonal snacks.</p>
            <div style={{ position: 'relative' }}>
              <input 
                type="email" 
                placeholder="email@nest.com" 
                style={{ 
                  width: '100%', padding: '1.1rem 1.4rem', borderRadius: '12px', border: 'none', 
                  background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '1rem'
                }} 
              />
              <button style={{ 
                position: 'absolute', right: '8px', top: '8px', bottom: '8px', 
                background: 'var(--secondary)', color: 'var(--primary)', border: 'none', 
                borderRadius: '8px', padding: '0 1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', display: 'flex', flexDirection: 'column', mdDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
          <div className="flex" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
             <p style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', opacity: 0.7 }}>
               <MapPin size={16} /> 123 Nature Valley Road, GV
             </p>
             <p style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', opacity: 0.7 }}>
               <Phone size={16} /> +1 (800) 123-NATURAL
             </p>
          </div>
          <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>&copy; {currentYear} NutriNest. Handcrafted with Nature.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
