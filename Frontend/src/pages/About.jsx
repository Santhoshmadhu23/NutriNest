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
    <div className="about-page" style={{ paddingTop: '80px', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ 
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        background: 'linear-gradient(180deg, rgba(255, 248, 225, 0) 0%, var(--background) 100%)',
        position: 'relative',
        padding: '4rem 0'
      }}>
        {/* Decorative Blur Elements */}
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255, 193, 7, 0.15)', filter: 'blur(80px)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(46, 125, 50, 0.1)', filter: 'blur(60px)', zIndex: 0 }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="reveal">
             <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem', display: 'block', marginBottom: '1rem' }}>
               01 / Our Story
             </span>
             <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1, marginBottom: '2rem', letterSpacing: '-0.04em', marginInline: 'auto', maxWidth: '800px' }}>
               Nurturing <span style={{ color: 'var(--primary)', position: 'relative' }}>
                 Nature's
                 <svg style={{ position: 'absolute', bottom: '-10px', left: 0, width: '100%', height: '12px' }} viewBox="0 0 100 12" preserveAspectRatio="none">
                   <path d="M0,10 Q50,0 100,10" fill="none" stroke="var(--secondary)" strokeWidth="6" opacity="0.4" />
                 </svg>
               </span> Purest Gift.
             </h1>
             <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', margin: '0 auto 3rem auto', maxWidth: '600px' }}>
               NutriNest was founded on a singular obsession: to bring unadulterated, farm-fresh snacks directly from the orchard to your palm.
             </p>
          </div>
        </div>
      </section>

      {/* 2. NARRATIVE SECTION */}
      <section className="section container">
        <div className="grid md-grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
          
          <div className="reveal glass-panel" style={{ padding: '4rem', borderRadius: '32px' }}>
             <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 900 }}>The Origin.</h3>
             <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
               We noticed a recurring theme in the 'healthy' snack aisle: artificial preservatives and hidden sugars masked behind green packaging. NutriNest was built as the antidote.
             </p>
             <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
               Starting in a small home pantry, we partnered with local farmers to see if air-drying could preserve the soul of a fruit without adding a single gram of sugar. The result was not just a snack, but a tribute to the earth.
             </p>
          </div>

          <div className="reveal delay-200" style={{ position: 'relative', height: '100%', minHeight: '400px' }}>
             <div style={{ 
               width: '100%', 
               height: '100%', 
               borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', 
               overflow: 'hidden',
               boxShadow: 'var(--shadow-lg)',
               position: 'absolute',
               top: 0,
               left: 0
             }}>
                <img 
                  src="https://images.unsplash.com/photo-1542601098-8fc114e148e2?auto=format&fit=crop&w=800" 
                  alt="Organic Fruits" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
             </div>
             
             {/* Floating Badge */}
             <div className="glass-panel animate-float" style={{ position: 'absolute', bottom: '10%', right: '-5%', padding: '1rem 1.5rem', borderRadius: '16px', display: 'flex', gap: '0.8rem', alignItems: 'center', background: 'var(--primary)', color: 'white', border: 'none' }}>
                <ShieldCheck size={24} />
                <span style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.05em' }}>SINCE 2024 / VERIFIED</span>
             </div>
          </div>

        </div>
      </section>

      {/* 3. PHILOSOPHY GRID */}
      <section className="section" style={{ background: 'var(--gray-50)', position: 'relative' }}>
         <div style={{ position: 'absolute', top: '-10%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255, 193, 7, 0.08)', filter: 'blur(80px)', zIndex: 0 }}></div>
         
         <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="reveal text-center" style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '3rem' }}>Our <span style={{ color: 'var(--primary)' }}>Philosophy</span></h2>
            </div>
            
            <div className="trust-row reveal delay-100" style={{ paddingBottom: '2rem' }}>
               {[
                 { icon: <Leaf size={32} />, title: '100% ORGANIC', text: 'No synthetic pesticides ever.' },
                 { icon: <Globe size={32} />, title: 'REASON SOURCE', text: 'Directly from heritage farms.' },
                 { icon: <ShieldCheck size={32} />, title: 'LAB VERIFIED', text: 'Zero refined oils or sugars.' },
                 { icon: <Heart size={32} />, title: 'GENTLE PROCESS', text: 'Sun-dried for vital nutrients.' }
               ].map((item, i) => (
                 <div key={i} className="trust-card glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', borderRadius: '24px', transition: 'var(--transition-base)', minWidth: '250px' }}>
                    <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', transform: 'scale(1)', transition: 'transform 0.3s ease' }} 
                         onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'}
                         onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                      {item.icon}
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 900, letterSpacing: '0.1em', marginBottom: '1rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.text}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. BOTTOM CTA */}
      <section className="section container">
         <div className="reveal glass-panel" style={{ 
           padding: '5rem 4rem', 
           display: 'flex', 
           flexDirection: 'row',
           justifyContent: 'space-between', 
           alignItems: 'center', 
           borderRadius: '48px',
           background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)',
           flexWrap: 'wrap',
           gap: '2rem'
         }}>
            <div style={{ maxWidth: '600px' }}>
               <h4 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Transparency you can <span style={{ color: 'var(--primary)'}}>taste.</span></h4>
               <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Interested in how we select our farmers? Explore our meticulous production standards.</p>
            </div>
            <Link to="/process" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
              View Our Process <ArrowRight size={20} />
            </Link>
         </div>
      </section>

    </div>
  );
};

export default About;
