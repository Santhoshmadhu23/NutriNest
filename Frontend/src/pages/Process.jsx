import React, { useEffect } from 'react';
import { Droplets, Sun, Leaf, Truck, ShieldCheck, ArrowRight, ChevronRight } from 'lucide-react';
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
    <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container wf-container" style={{ padding: 0 }}>
        
        {/* Header Block */}
        <section className="wf-section-header reveal" style={{ textAlign: 'left', padding: '6rem 4rem' }}>
          <div style={{ maxWidth: '800px' }}>
             <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>
               03 / The Process
             </span>
             <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.9, marginBottom: '2rem', fontWeight: 900 }}>
               From <span style={{ color: 'var(--primary)' }}>Earth</span> To Plate.
             </h1>
             <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.6 }}>
               A mechanical, transparent approach to natural preservation. No shortcuts, no additives, just physics and patience.
             </p>
          </div>
        </section>

        {/* Serial Process Steps */}
        <div className="wf-grid-bordered">
           {steps.map((step, idx) => (
             <div key={idx} className="md-grid-2 reveal" style={{ background: 'var(--white)', margin: '-0.5px' }}>
                <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid var(--gray-200)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--gray-100)', lineHeight: 1 }}>{step.id}</span>
                      <div style={{ background: 'var(--primary)', color: 'white', padding: '0.6rem', borderRadius: '4px' }}>{step.icon}</div>
                   </div>
                   <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{step.title}</h3>
                   <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{step.text}</p>
                </div>
                <div style={{ padding: '0', position: 'relative', height: '400px', overflow: 'hidden' }}>
                   <img 
                     src={step.img} 
                     alt={step.title} 
                     style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.9) contrast(1.1)' }} 
                   />
                   <div style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--white)', padding: '1rem 2rem', fontSize: '0.7rem', fontWeight: 900, borderLeft: '1px solid var(--gray-200)', borderTop: '1px solid var(--gray-200)' }}>
                     PHASE_{step.id} // VALIDATED
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Final Information Block */}
        <div style={{ padding: '5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--gray-100)', borderTop: '1px solid var(--gray-200)' }}>
           <div>
              <h4 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Quality Architecture.</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>See how we measure purity levels in our final packaging phase.</p>
           </div>
           <Link to="/quality" className="btn" style={{ borderRadius: '0', background: 'var(--white)', border: '1px solid var(--gray-200)', fontWeight: 900 }}>
             OUR QUALITY STANDARDS <ChevronRight size={18} />
           </Link>
        </div>

      </div>
    </div>
  );
};

export default Process;
