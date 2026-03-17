import React from 'react';

const PolicyPage = ({ title, content }) => {
  return (
    <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container wf-container" style={{ padding: 0 }}>
        <section className="wf-section-header" style={{ textAlign: 'left', padding: '6rem 4rem' }}>
          <div style={{ maxWidth: '800px' }}>
             <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>
               Protocols / Regulatory
             </span>
             <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.9, marginBottom: '2rem', fontWeight: 900 }}>
               {title.toUpperCase()}
             </h1>
          </div>
        </section>

        <div style={{ padding: '4rem', background: 'var(--white)', borderBottom: '1px solid var(--gray-200)' }}>
           <div style={{ maxWidth: '800px', margin: '0', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
