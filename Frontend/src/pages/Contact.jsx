import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState('idle');

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
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container wf-container" style={{ padding: 0 }}>
        
        {/* Header Block */}
        <section className="wf-section-header reveal" style={{ textAlign: 'left', padding: '6rem 4rem' }}>
          <div style={{ maxWidth: '800px' }}>
             <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>
               04 / Contact
             </span>
             <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.9, marginBottom: '2rem', fontWeight: 900 }}>
               Get In <span style={{ color: 'var(--primary)' }}>Touch</span> With The Nest.
             </h1>
             <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.6 }}>
               Whether you're looking for wholesale partnerships, subscription help, or just want to talk about snacks—our team is ready.
             </p>
          </div>
        </section>

        {/* 3-Column Structured Grid */}
        <div className="wf-grid-bordered md-grid-3 reveal">
          
          {/* Col 1: Direct Contact */}
          <div style={{ padding: '3rem' }}>
             <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '0.5rem' }}>Direct Line</h3>
             
             <div style={{ marginBottom: '3rem' }}>
               <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Support Email</span>
               <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>hello@nutrinest.com</p>
               <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>support@nutrinest.com</p>
             </div>

             <div style={{ marginBottom: '3rem' }}>
               <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Phone Support</span>
               <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>+1 (800) 123-NATURAL</p>
               <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>Mon - Fri, 9am - 6pm</p>
             </div>

             <div style={{ background: 'var(--primary)', color: 'white', padding: '2rem', borderRadius: '4px', marginTop: '2rem' }}>
                <h4 style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>Wholesale Nest</h4>
                <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '1.5rem' }}>Partner with us for bulk orders and retail stocking.</p>
                <button style={{ background: 'white', color: 'var(--primary)', border: 'none', padding: '0.6rem 1rem', fontWeight: 800, fontSize: '0.8rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  VIEW PARTNER PORTAL <ChevronRight size={16} />
                </button>
             </div>
          </div>

          {/* Col 2: The Form (Mechanical/Framed) */}
          <div style={{ padding: '3rem', background: 'var(--white)' }}>
             <h3 style={{ fontSize: '1.5rem', marginBottom: '2.5rem' }}>Send Message</h3>
             
             {formState === 'success' ? (
               <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                 <CheckCircle2 color="var(--primary)" size={60} style={{ marginBottom: '1.5rem' }} />
                 <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Success!</h4>
                 <p style={{ color: 'var(--text-muted)' }}>We've received your inquiry and will be in touch shortly.</p>
               </div>
             ) : (
               <form onSubmit={handleSubmit}>
                 <div className="input-group">
                   <label className="input-label">Full Name</label>
                   <input type="text" className="form-input wf-border" placeholder="Required" required style={{ borderRadius: '0' }} />
                 </div>
                 
                 <div className="input-group">
                   <label className="input-label">Email Address</label>
                   <input type="email" className="form-input wf-border" placeholder="name@email.com" required style={{ borderRadius: '0' }} />
                 </div>

                 <div className="input-group">
                   <label className="input-label">Subject</label>
                   <select className="form-input wf-border" style={{ borderRadius: '0', background: 'var(--white)' }}>
                      <option>General Inquiry</option>
                      <option>Order Assistance</option>
                      <option>Subscription Help</option>
                      <option>Media & Press</option>
                   </select>
                 </div>

                 <div className="input-group">
                   <label className="input-label">Message</label>
                   <textarea className="form-input wf-border" placeholder="..." style={{ borderRadius: '0', minHeight: '120px' }} required></textarea>
                 </div>

                 <button type="submit" className="btn btn-primary" style={{ width: '100%', borderRadius: '0', padding: '1.2rem' }}>
                   {formState === 'loading' ? 'PROCESSING...' : 'SEND INQUIRY'}
                 </button>
               </form>
             )}
          </div>

          {/* Col 3: Find Us / HQ */}
          <div style={{ padding: '3rem' }}>
             <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '0.5rem' }}>The Nest HQ</h3>
             
             <div style={{ marginBottom: '3rem' }}>
               <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Physical Address</span>
               <p style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.4 }}>
                 123 Nature Valley Road<br />
                 Greenville, Earth 45678<br />
                 United States
               </p>
             </div>

             <div style={{ marginBottom: '3rem', height: '200px', background: 'var(--gray-200)', position: 'relative', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600" alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '50%' }}>
                  <MapPin size={24} />
                </div>
             </div>

             <div>
               <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>Social Connections</span>
               <div className="flex" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                  {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
                    <a key={social} href="#" style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', borderBottom: '1px solid var(--primary)' }}>{social}</a>
                  ))}
               </div>
             </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div style={{ padding: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--gray-200)' }}>
           <div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Want to see where it starts?</h4>
              <p style={{ color: 'var(--text-muted)' }}>Learn more about our air-drying process and farm partnerships.</p>
           </div>
           <Link to="/process" className="btn btn-secondary" style={{ borderRadius: '0', border: '1px solid var(--primary)' }}>
             OUR PROCESS <ArrowRight size={18} />
           </Link>
        </div>

      </div>
    </div>
  );
};

export default Contact;
