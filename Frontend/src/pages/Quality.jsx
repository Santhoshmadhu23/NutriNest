import React, { useEffect } from 'react';
import { ShieldCheck, CheckCircle2, FlaskConical, Scale, Thermometer, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Quality = () => {
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

  const metrics = [
    { icon: <FlaskConical size={32} />, label: 'PURITY_INDEX', value: '100%', detail: 'Zero artificial additives detected in final batch testing.' },
    { icon: <Scale size={32} />, label: 'MOISTURE_LEVEL', value: '< 5%', detail: 'Optimized for shelf-stability without chemical preservatives.' },
    { icon: <Thermometer size={32} />, label: 'DRYING_TEMP', value: '42°C', detail: 'Maintaining vital enzymes and heat-sensitive nutrition.' },
    { icon: <ShieldCheck size={32} />, label: 'LAB_CERTIFIED', value: 'ISO_9001', detail: 'Sourced and packed in international standard facilities.' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container wf-container" style={{ padding: 0 }}>
        
        {/* Header Block */}
        <section className="wf-section-header reveal" style={{ textAlign: 'left', padding: '6rem 4rem' }}>
          <div style={{ maxWidth: '800px' }}>
             <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>
               05 / Standards
             </span>
             <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.9, marginBottom: '2rem', fontWeight: 900 }}>
                High-Contrast <span style={{ color: 'var(--primary)' }}>Purity.</span>
             </h1>
             <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.6 }}>
               Our commitment to quality is verifiable. We rely on strict atmospheric controls and precision lab testing to ensure every pack is perfect.
             </p>
          </div>
        </section>

        {/* Data Metric Grid */}
        <div className="wf-grid-bordered md-grid-2 reveal" style={{ background: 'var(--white)' }}>
           {metrics.map((metric, idx) => (
             <div key={idx} style={{ padding: '4rem', display: 'flex', flexDirection: 'column', borderRight: idx % 2 === 0 ? '1px solid var(--gray-200)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                   <div style={{ color: 'var(--primary)' }}>{metric.icon}</div>
                   <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--gray-300)', letterSpacing: '0.15em' }}>MTRC_{idx+1}</span>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                   <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{metric.label}</span>
                   <div style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em', margin: '0.5rem 0' }}>{metric.value}</div>
                </div>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{metric.detail}</p>
             </div>
           ))}
        </div>

        {/* Compliance Section */}
        <div className="wf-grid-bordered reveal" style={{ background: 'var(--white)', margin: '-0.5px' }}>
           <div style={{ padding: '4rem', borderBottom: '1px solid var(--gray-200)' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem' }}>COMPLIANCE_TESTS</h3>
              <div className="grid md-grid-2" style={{ gap: '2rem' }}>
                 {[
                   'Aflatoxin Level Checked',
                   'Pesticide Residue: ND (Non-Detected)',
                   'Total Viable Count: Within Limits',
                   'Nutritional Integrity Verified',
                   'Shelf-Life Accelerated Testing',
                   'Packaging Seal Integrity Check'
                 ].map((test, i) => (
                   <div key={i} className="flex" style={{ alignItems: 'center', gap: '1rem', padding: '1.5rem', border: '1px solid var(--gray-100)', background: 'var(--gray-50)' }}>
                      <CheckCircle2 color="var(--primary)" size={20} />
                      <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{test.toUpperCase()}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Closing CTA */}
        <div style={{ padding: '5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--white)', borderTop: '1px solid var(--gray-200)' }}>
           <div>
              <h4 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Ready to taste the standard?</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Browse our lab-verified snack catalog.</p>
           </div>
           <Link to="/products" className="btn btn-primary" style={{ borderRadius: '0', padding: '1.2rem 2.5rem' }}>
             SHOP INVENTORY <ArrowRight size={18} />
           </Link>
        </div>

      </div>
    </div>
  );
};

export default Quality;
