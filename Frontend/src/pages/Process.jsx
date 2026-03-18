import React, { useEffect } from 'react';
import { Droplets, Sun, Leaf, Truck, ShieldCheck, ArrowRight, ChevronRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Process = () => {
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

  const steps = [
    {
      id: '01',
      title: 'ETHICAL HARVESTING',
      icon: <Leaf />,
      text: 'We only partner with farmers who follow pesticide-free, sustainable practices. Fruits are harvested at Peak Riparity to capture natural sugars and peak nutritional density.',
      img: 'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=600'
    },
    {
      id: '02',
      title: 'MINIMAL INTERVENTION',
      icon: <Droplets />,
      text: 'Produce is cleaned in chilled fresh water. We strictly bypass blanching in sugar syrups or chemical color preservation. What you see is the true color of nature.',
      img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600'
    },
    {
      id: '03',
      title: 'ATMOSPHERIC DRYING',
      icon: <Sun />,
      text: 'Using low-temperature air-drying technology, we extract moisture while locking in vital enzymes and fiber. This preserves the "crunch" without compromising the cellular integrity.',
      img: 'https://images.unsplash.com/photo-1542601098-8fc114e148e2?auto=format&fit=crop&w=600'
    },
    {
      id: '04',
      title: 'ASSURED PACKAGING',
      icon: <ShieldCheck />,
      text: 'Every batch is verified for moisture levels before sealed into food-grade, multi-layer environment-stable pouches. No preservatives required, freshness guaranteed.',
      img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600'
    }
  ];

  return (
    <div className="process-page" style={{ paddingTop: '80px', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ 
        minHeight: '60vh', 
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
               03 / The Process
             </span>
             <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1, marginBottom: '2rem', letterSpacing: '-0.04em', marginInline: 'auto', maxWidth: '800px' }}>
               From <span style={{ color: 'var(--primary)', position: 'relative' }}>
                 Earth
                 <svg style={{ position: 'absolute', bottom: '-10px', left: 0, width: '100%', height: '12px' }} viewBox="0 0 100 12" preserveAspectRatio="none">
                   <path d="M0,10 Q50,0 100,10" fill="none" stroke="var(--secondary)" strokeWidth="6" opacity="0.4" />
                 </svg>
               </span> To Plate.
             </h1>
             <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', margin: '0 auto 3rem auto', maxWidth: '600px' }}>
               A transparent, methodical approach to natural preservation. No shortcuts, no additives, just physics and patience.
             </p>
          </div>
        </div>
      </section>

      {/* 2. PROCESS STEPS */}
      <section className="section container" style={{ position: 'relative' }}>
        {/* Connecting Line (Desktop) */}
        <div className="desktop-only" style={{ position: 'absolute', left: '50%', top: '5%', bottom: '5%', width: '4px', background: 'var(--gray-200)', borderRadius: '2px', transform: 'translateX(-50%)', zIndex: 0 }}></div>

        <div className="grid" style={{ gap: '6rem', position: 'relative', zIndex: 1 }}>
           {steps.map((step, idx) => {
             const isEven = idx % 2 === 0;
             return (
               <div key={idx} className={`grid md-grid-2 reveal delay-${(idx + 1) * 100}`} style={{ alignItems: 'center', gap: '3rem' }}>
                 
                 {/* Text Content */}
                 <div style={{ order: isEven ? 1 : 2, padding: '2rem' }} className={!isEven ? 'text-right' : ''}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: !isEven ? 'flex-end' : 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                       <span style={{ fontSize: '4rem', fontWeight: 900, color: 'rgba(46, 125, 50, 0.1)', lineHeight: 1 }}>{step.id}</span>
                       <div style={{ background: 'var(--primary)', color: 'white', padding: '0.8rem', borderRadius: '12px', boxShadow: 'var(--shadow-primary)' }}>
                          {step.icon}
                       </div>
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{step.title}</h3>
                    <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{step.text}</p>
                 </div>

                 {/* Image Content */}
                 <div style={{ order: isEven ? 2 : 1, position: 'relative' }} className="glass-panel">
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '32px', height: '400px' }}>
                       <img 
                         src={step.img} 
                         alt={step.title} 
                         style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                         onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                         onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                       />
                       <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                         <Activity size={14} /> PHASE {step.id} ACTIVE
                       </div>
                    </div>
                 </div>

               </div>
             );
           })}
        </div>
      </section>

      {/* 3. BOTTOM CTA */}
      <section className="section container">
         <div className="reveal glass-panel" style={{ 
           padding: '5rem 4rem', 
           display: 'flex', 
           flexDirection: 'row',
           justifyContent: 'space-between', 
           alignItems: 'center', 
           borderRadius: '48px',
           background: 'linear-gradient(135deg, rgba(255,193,7,0.1) 0%, rgba(46,125,50,0.1) 100%)',
           flexWrap: 'wrap',
           gap: '2rem'
         }}>
            <div style={{ maxWidth: '600px' }}>
               <h4 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Quality <span style={{ color: 'var(--primary)'}}>Architecture.</span></h4>
               <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>See how we measure purity levels in our final packaging phase.</p>
            </div>
            <Link to="/products" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
              Explore Products <ArrowRight size={20} />
            </Link>
         </div>
      </section>

    </div>
  );
};

export default Process;
