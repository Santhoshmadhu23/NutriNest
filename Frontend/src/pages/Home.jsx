import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, ShoppingBag, MapPin, Star, ArrowRight, Truck, Clock, Droplets } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [pausedProducts, setPausedProducts] = useState({});
  const { addToCart } = useCart();
  const observerRef = useRef(null);

  useEffect(() => {
    // Scroll Reveal Logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    const observerInstance = observer;
    const observeElements = () => {
      const sections = document.querySelectorAll('.reveal');
      sections.forEach(sec => observerInstance.observe(sec));
    };

    observeElements();

    // Fetch products
    fetch('http://localhost/NutriNest/Backend/api/products.php')
      .then(res => res.json())
      .then(data => {
        const featured = data.slice(0, 4).map((dbProd) => ({
          id: dbProd.product_id,
          name: dbProd.name,
          image: dbProd.image_url,
          price: parseFloat(dbProd.base_price)
        }));
        setFeaturedProducts(featured);
      })
      .catch(err => console.error("Error fetching featured products:", err));

    return () => {
       observerInstance.disconnect();
    };
  }, []);

  // Re-observe when featuredProducts loads
  useEffect(() => {
    if (featuredProducts.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      const sections = document.querySelectorAll('.reveal');
      sections.forEach(sec => observer.observe(sec));
      
      return () => observer.disconnect();
    }
  }, [featuredProducts]);

  return (
    <div className="home-page" style={{ paddingTop: '80px' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ 
        minHeight: '85vh', 
        display: 'flex', 
        alignItems: 'center', 
        background: 'linear-gradient(180deg, rgba(255, 248, 225, 0) 0%, var(--background) 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '4rem 0'
      }}>
        {/* Decorative Blur Elements */}
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255, 193, 7, 0.15)', filter: 'blur(80px)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(46, 125, 50, 0.1)', filter: 'blur(60px)', zIndex: 0 }}></div>

        <div className="container grid md-grid-2" style={{ alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div className="reveal">
            <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem', display: 'block', marginBottom: '1rem' }}>
              100% Organic & Farm Fresh
            </span>
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1, marginBottom: '2rem', letterSpacing: '-0.04em' }}>
              Purity in Every <span style={{ color: 'var(--primary)', position: 'relative' }}>
                Bite.
                <svg style={{ position: 'absolute', bottom: '-10px', left: 0, width: '100%', height: '12px' }} viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,10 Q50,0 100,10" fill="none" stroke="var(--secondary)" strokeWidth="6" opacity="0.4" />
                </svg>
              </span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '540px' }}>
              Experience the true taste of nature with our air-dried, preservative-free snacks. Sourced directly from local farmers to your table.
            </p>
            <div className="flex" style={{ gap: '1.5rem' }}>
              <Link to="/products" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem' }}>
                Shop Collection <ArrowRight size={20} />
              </Link>
            </div>
            
            <div className="flex" style={{ marginTop: '3.5rem', gap: '2.5rem' }}>
               <div>
                 <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)' }}>25+</span>
                 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>Natural Snacks</span>
               </div>
               <div style={{ width: '1px', height: '40px', background: 'var(--gray-200)' }}></div>
               <div>
                 <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)' }}>15k+</span>
                 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>Happy Nests</span>
               </div>
            </div>
          </div>

          <div className="reveal delay-200" style={{ position: 'relative' }}>
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              aspectRatio: '1', 
              background: 'white', 
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', 
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              animation: 'morphing 15s ease-in-out infinite both alternate'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80" 
                alt="Organic Snacks" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            
            {/* Floating Glass Cards */}
            <div className="glass-panel animate-float" style={{ position: 'absolute', top: '10%', left: '-5%', padding: '1rem', borderRadius: '16px', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
               <div style={{ background: 'var(--secondary)', padding: '0.5rem', borderRadius: '10px', color: 'var(--primary)' }}><Star fill="currentColor" size={20} /></div>
               <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Top Rated 2024</span>
            </div>

            <style>{`
              @keyframes morphing {
                0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
                25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
                50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
                75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
                100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section style={{ padding: '3rem 0', background: 'var(--white)', borderTop: '1px solid var(--gray-100)', borderBottom: '1px solid var(--gray-100)' }}>
        <div className="container">
          <div className="grid md-grid-4" style={{ gap: '2rem' }}>
            <div className="flex" style={{ justifyContent: 'center' }}>
               <Truck color="var(--primary)" size={32} />
               <div>
                 <p style={{ fontWeight: 800, margin: 0, fontSize: '0.95rem' }}>Free Shipping</p>
                 <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>On orders above ₹999</p>
               </div>
            </div>
            <div className="flex" style={{ justifyContent: 'center' }}>
               <ShieldCheck color="var(--primary)" size={32} />
               <div>
                 <p style={{ fontWeight: 800, margin: 0, fontSize: '0.95rem' }}>Lab Tested</p>
                 <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>100% Purity Check</p>
               </div>
            </div>
            <div className="flex" style={{ justifyContent: 'center' }}>
               <Clock color="var(--primary)" size={32} />
               <div>
                 <p style={{ fontWeight: 800, margin: 0, fontSize: '0.95rem' }}>Always Fresh</p>
                 <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>Packed on order</p>
               </div>
            </div>
            <div className="flex" style={{ justifyContent: 'center' }}>
               <Droplets color="var(--primary)" size={32} />
               <div>
                 <p style={{ fontWeight: 800, margin: 0, fontSize: '0.95rem' }}>Cold Pressed</p>
                 <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>Maximum Nutrition</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (Our Top Picks) */}
      <section className="section container">
        <div className="reveal text-center" style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.8rem' }}>Our Top <span style={{ color: 'var(--primary)' }}>Picks</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Farm-fresh goodness, handpicked for you.
          </p>
        </div>

        <div className="product-showcase-grid reveal">
          {featuredProducts.length > 0 ? featuredProducts.map((prod, idx) => {
            const cardColors = ['#2E7D32', '#4E342E', '#E65100', '#4A148C']; // Professional deep shades
            return (
              <div key={prod.id} className={`product-overlap-card reveal delay-${(idx + 1) * 100}`}>
                <Link to={`/products/${prod.id}`} style={{ display: 'block', textDecoration: 'none' }}>
                  <div className="card-base" style={{ backgroundColor: cardColors[idx % cardColors.length], overflow: 'visible' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, background: 'url(https://www.transparenttextures.com/patterns/carbon-fibre.png)' }}></div>
                    <div className="img-wrapper" onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setPausedProducts(prev => ({ ...prev, [prod.id]: !prev[prod.id] }));
                    }}>
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        style={{ border: '4px solid white', animationPlayState: pausedProducts[prod.id] ? 'paused' : 'running' }}
                      />
                    </div>
                    <div style={{ position: 'relative', zIndex: 1, padding: '1rem', textAlign: 'center' }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 600 }}>Pure Organic</span>
                        <h3 style={{ color: 'white', margin: '0.2rem 0 1rem 0' }}>{prod.name}</h3>
                        <div style={{ display: 'inline-block', padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-full)', background: 'var(--secondary)', color: 'var(--primary)', fontWeight: 900 }}>
                          ₹{prod.price}
                        </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          }) : <div style={{ textAlign: 'center', width: '100%' }}>Nesting freshness...</div>}
        </div>
      </section>

      {/* 4. SUBSCRIPTION (NutriNest Weekly Subscription) */}
      <section className="section" style={{ background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10rem', left: '-10rem', width: '30rem', height: '30rem', borderRadius: '50%', background: 'rgba(255,193,7,0.05)', filter: 'blur(100px)' }}></div>
        
        <div className="container">
          <div className="reveal text-center" style={{ marginBottom: '5rem' }}>
            <h2 style={{ color: 'var(--secondary)', fontSize: '3.5rem', marginBottom: '1rem' }}>NutriNest Weekly Subscription</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto' }}>
              Get fresh healthy snacks delivered every week. Perfect for Banana Softies, Energy Balls, Dry Fruit Mix, and Millet Laddu lovers.
            </p>
          </div>

          <div className="grid md-grid-3" style={{ gap: '2.5rem', maxWidth: '1100px', margin: '0 auto' }}>
            {[
              { title: 'Weekly Plan', price: '599', period: 'week', items: '4 snack packs', color: 'rgba(255,255,255,0.1)' },
              { title: 'Monthly Plan', price: '1999', period: 'month', items: '16 snack packs', color: 'var(--secondary)', featured: true },
              { title: '3 Month Plan', price: '5499', period: 'quarter', items: '48 snack packs', color: 'rgba(255,255,255,0.1)' }
            ].map((plan, i) => (
              <div key={i} className={`reveal glass-panel delay-${(i + 1) * 100}`} style={{ 
                padding: '4rem 2.5rem', 
                borderRadius: '32px', 
                textAlign: 'center', 
                color: plan.featured ? 'var(--primary)' : 'white',
                background: plan.featured ? 'var(--secondary)' : 'rgba(255,255,255,0.08)',
                border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.15)',
                transform: plan.featured ? 'scale(1.05)' : 'none',
                zIndex: plan.featured ? 2 : 1,
                boxShadow: plan.featured ? '0 30px 60px rgba(0,0,0,0.3)' : 'var(--shadow-lg)'
              }}>
                 {plan.featured && <span style={{ background: 'var(--primary)', color: 'white', padding: '0.4rem 1.2rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)' }}>Most Popular</span>}
                 <h4 style={{ marginBottom: '0.5rem', opacity: 0.8 }}>{plan.title}</h4>
                 <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>₹{plan.price}<span style={{ fontSize: '1rem', opacity: 0.7 }}> /{plan.period}</span></div>
                 
                 <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: '3rem', padding: 0 }}>
                    <li style={{ display: 'flex', gap: '0.8rem', padding: '0.5rem 0' }}><Leaf size={18} opacity={0.6}/> {plan.items} per {plan.period}</li>
                    <li style={{ display: 'flex', gap: '0.8rem', padding: '0.5rem 0' }}><Leaf size={18} opacity={0.6}/> Fully Customizable Mix</li>
                    <li style={{ display: 'flex', gap: '0.8rem', padding: '0.5rem 0' }}><Leaf size={18} opacity={0.6}/> Free Express Delivery</li>
                    <li style={{ display: 'flex', gap: '0.8rem', padding: '0.5rem 0' }}><Leaf size={18} opacity={0.6}/> Swap or Pause Anytime</li>
                 </ul>

                 <button className="btn" style={{ 
                   width: '100%', 
                   background: plan.featured ? 'var(--primary)' : 'var(--white)', 
                   color: plan.featured ? 'white' : 'var(--primary)',
                   fontSize: '1.1rem',
                   padding: '1.2rem'
                 }}>Start Subscription</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BRAND STORY */}
      <section className="section container">
        <div className="grid md-grid-2" style={{ gap: '6rem', alignItems: 'center' }}>
          <div className="reveal">
            <h2 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '2.5rem' }}>Where <span style={{ color: 'var(--primary)' }}>Nature</span> Meets Your Plate</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '2rem' }}>
              NutriNest was born out of a craving for real food that feels like a treat without the guilt. We believe that snacking shouldn't be a trade-off between taste and health.
            </p>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '3rem' }}>
              By sourcing directly from indigenous farms and using gentle air-drying technology, we preserve 100% of the vitamins and minerals nature intended. No sugar. No oil. No compromise.
            </p>
            <Link to="/about" className="btn btn-primary">Discover Our Journey <ArrowRight size={18}/></Link>
          </div>
          
          <div className="reveal delay-200" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
             <div className="glass-panel" style={{ padding: '0.5rem', borderRadius: '32px', transform: 'translateY(3rem)' }}>
                <img src="https://images.unsplash.com/photo-1600850056064-a8b380df8395?auto=format&fit=crop&w=600" alt="Farm life" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '28px' }} />
             </div>
             <div className="glass-panel" style={{ padding: '0.5rem', borderRadius: '32px' }}>
                <img src="https://images.unsplash.com/photo-1542601098-8fc114e148e2?auto=format&fit=crop&w=600" alt="Sun dried fruits" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '28px' }} />
             </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="section" style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-200)' }}>
        <div className="container">
          <div className="reveal text-center" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem' }}>Loved by <span style={{ color: 'var(--primary)' }}>Nature Lovers</span></h2>
          </div>
          
          <div className="grid md-grid-3" style={{ gap: '2rem' }}>
            {[
              { name: 'Aditi Verma', role: 'Health Coach', text: 'NutriNest has changed how I snack between clients. The Energy Balls are my absolute savior—pure energy without the sugar crash.' },
              { name: 'Karan Mehra', role: 'Adventure Photog', text: 'I take these during my treks. They are lightweight, nutrient-dense, and honestly, the Banana Softies taste better than actual candy.' },
              { name: 'Saira Khan', role: 'Home Maker', text: 'My kids finally look forward to healthy snacks! Knowing they are getting 100% fruit without any added preservatives is a huge relief.' }
            ].map((t, i) => (
              <div key={i} className="reveal glass-panel delay-100" style={{ padding: '3rem', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                 <div style={{ color: 'var(--secondary)', display: 'flex', gap: '4px', marginBottom: '1.5rem' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                 </div>
                 <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '2rem', flexGrow: 1, color: 'var(--text-muted)' }}>"{t.text}"</p>
                 <div className="flex">
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'var(--primary)' }}>{t.name[0]}</div>
                    <div>
                      <h5 style={{ margin: 0 }}>{t.name}</h5>
                      <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{t.role}</span>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA / NEWSLETTER */}
      <section className="section container">
         <div className="reveal" style={{ 
           background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
           padding: '6rem 4rem',
           borderRadius: '48px',
           textAlign: 'center',
           color: 'white',
           position: 'relative',
           overflow: 'hidden',
           boxShadow: 'var(--shadow-lg)'
         }}>
           <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
           
           <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ color: 'var(--secondary)', fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to taste the <br/>difference?</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9 }}>Join our newsletter for farm updates, nutrition tips, and 15% off your first organic order.</p>
              
              <form className="flex" style={{ gap: '0', background: 'white', padding: '0.6rem', borderRadius: 'var(--radius-full)', maxWidth: '500px', margin: '0 auto' }}>
                <input 
                  type="email" 
                  placeholder="name@gmail.com" 
                  style={{ flexGrow: 1, border: 'none', padding: '0.5rem 1.5rem', outline: 'none', background: 'transparent' }} 
                />
                <button className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Subscribe</button>
              </form>
           </div>
         </div>
      </section>

    </div>
  );
};

export default Home;
