import React, { useEffect } from 'react';
import { Leaf, Info, Globe, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
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

  return (
    <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container wf-container" style={{ padding: 0 }}>
        
        {/* Header Block */}
        <section className="wf-section-header reveal" style={{ textAlign: 'left', padding: '6rem 4rem' }}>
          <div style={{ maxWidth: '800px' }}>
             <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>
               01 / Our Story
             </span>
             <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.9, marginBottom: '2rem', fontWeight: 900 }}>
               Nurturing <span style={{ color: 'var(--primary)' }}>Nature's</span> Purest Gift.
             </h1>
             <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.6 }}>
               NutriNest was founded on a singular obsession: to bring unadulterated, farm-fresh snacks from the orchard to your palm.
             </p>
          </div>
        </section>

        {/* 2-Column Structured Narrative */}
        <div className="wf-grid-bordered md-grid-2 reveal">
          
          {/* Narrative Frame 1 */}
          <div style={{ padding: '4rem', background: 'var(--white)' }}>
             <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontWeight: 900 }}>The Origin.</h3>
             <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
               We noticed a recurring theme in the 'healthy' snack aisle: artificial preservatives and hidden sugars masked behind green packaging. NutriNest was built as the antidote.
             </p>
             <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
               Starting in a small home pantry, we partnered with local farmers to see if air-drying could preserve the soul of a fruit without adding a single gram of sugar. The result was not just a snack, but a tribute to the earth.
             </p>
          </div>

          {/* Imaging/Visual Frame */}
          <div style={{ padding: '4rem', position: 'relative', overflow: 'hidden', background: 'var(--gray-50)' }}>
             <div className="wf-border" style={{ height: '400px', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1542601098-8fc114e148e2?auto=format&fit=crop&w=800" 
                  alt="Organic Fruits" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)' }} 
                />
             </div>
             <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', background: 'var(--primary)', color: 'white', padding: '1rem 1.5rem', fontWeight: 800, fontSize: '0.9rem' }}>
                SINCE 2024 / VERIFIED
             </div>
          </div>
        </div>

        {/* Philosophy Grid (Framed blocks) */}
        <div className="wf-grid-bordered md-grid-4 reveal" style={{ background: 'var(--white)' }}>
           {[
             { icon: <Leaf />, title: '100% ORGANIC', text: 'No synthetic pesticides ever.' },
             { icon: <Globe />, title: 'REASON SOURCE', text: 'Directly from heritage farms.' },
             { icon: <ShieldCheck />, title: 'LAB VERIFIED', text: 'Zero refined oils or sugars.' },
             { icon: <Heart />, title: 'GENTLE PROCESS', text: 'Sun-dried for vital nutrients.' }
           ].map((item, i) => (
             <div key={i} style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.1em', marginBottom: '1rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.text}</p>
             </div>
           ))}
        </div>

        {/* Bottom CTA Banner */}
        <div style={{ padding: '5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--gray-200)', background: 'var(--gray-50)' }}>
           <div style={{ maxWidth: '600px' }}>
              <h4 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>Transparency you can taste.</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Interested in how we select our farmers? Explore our production standards.</p>
           </div>
           <Link to="/process" className="btn btn-primary" style={{ borderRadius: '0', padding: '1.2rem 2rem' }}>
             VIEW OUR PROCESS <ArrowRight size={18} />
           </Link>
        </div>

      </div>
    </div>
  );
};

export default About;
