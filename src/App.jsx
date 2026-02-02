import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Instagram, Clock, Menu, X, Mail, Phone, Facebook, Twitter, ChevronRight } from 'lucide-react';
import AOS from 'aos';

import 'aos/dist/aos.css';
import './App.css';

const MENU_DATABASE = [
  { id: 1, cat: 'COFFEE', name: 'Aren Sugar Coffee', price: '25', img: 'https://i.pinimg.com/1200x/e3/6c/e7/e36ce75281442cfe6c69d60dc3747f58.jpg', note: 'Aren Sugar, Milk, Sweet' },
  { id: 2, cat: 'SIGNATURE', name: 'Midnight Berry Brew', price: '45', img: 'https://i.pinimg.com/736x/43/6c/53/436c533f2c783599cf67a53aef1d29ed.jpg', note: 'Cold Brew, Mixed Berry, Mint' },
  { id: 3, cat: 'COFFEE', name: 'Mocca Latte', price: '28', img: 'https://i.pinimg.com/1200x/c8/ad/10/c8ad107ac4da5b217944daaa25f78bea.jpg', note: 'Creamy, Cocoa, Sweet' },
  { id: 4, cat: 'COFFEE', name: 'Flat White', price: '35', img: 'https://i.pinimg.com/736x/69/27/8d/69278df692b908574ad168c1f0410ab2.jpg', note: 'Ristretto, Silky Microfoam' },
  { id: 5, cat: 'PASTRY', name: 'Pistachio Croissant', price: '20', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800', note: 'Hand-rolled, Twice Baked' },
  { id: 6, cat: 'PASTRY', name: 'Almond Kouign-Amann', price: '25', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800', note: 'Caramelized Flaky Layers' },
  { id: 7, cat: 'MEAL', name: 'Truffle Scrambled Egg', price: '45', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800', note: 'Sourdough, Truffle Oil, Chives' },
  { id: 8, cat: 'MEAL', name: 'Beef Brisket Rice', price: '50', img: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800', note: '12h Slow Cooked, Garlic Rice' }
];

function App() {
  const [activeCat, setActiveCat] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.onscroll = () => setIsScrolled(window.scrollY > 50);
  }, []);

  const filteredItems = useMemo(() => {
    return MENU_DATABASE.filter(p => 
      (activeCat === 'ALL' || p.cat === activeCat) && 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [activeCat, search]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="society-v-final">
      {/* SIDEBAR NAVIGATION */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="sidebar-nav"
            >
              <div className="sidebar-header">
                <h3>NAVIGATION</h3>
                <X className="close-icon" onClick={() => setIsSidebarOpen(false)} />
              </div>
              <div className="sidebar-links">
                <button onClick={() => scrollTo('home')}><span>01</span> HOME <ChevronRight size={18}/></button>
                <button onClick={() => scrollTo('about')}><span>02</span> ABOUT US <ChevronRight size={18}/></button>
                <button onClick={() => scrollTo('menu')}><span>03</span> OUR MENU <ChevronRight size={18}/></button>
                <button onClick={() => scrollTo('contact')}><span>04</span> CONTACT <ChevronRight size={18}/></button>
              </div>
              <div className="sidebar-footer-minimal">
                <p>KOMOREBI ROASTERY — BOGOR</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand" onClick={() => scrollTo('home')}>KOMOREBI<span>.</span></div>
          <div className="nav-menu">
            {['ALL', 'SIGNATURE', 'COFFEE', 'PASTRY', 'MEAL'].map(c => (
              <button key={c} className={activeCat === c ? 'active' : ''} onClick={() => setActiveCat(c)}>{c}</button>
            ))}
          </div>
          <div className="nav-right">
            <div className="search-wrap">
              <Search size={16} />
              <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Menu className="menu-trigger" onClick={() => setIsSidebarOpen(true)} />
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero" id="home">
        <div className="hero-bg">
          <video autoPlay loop muted playsInline><source src="/landing_page.mp4" type="video/mp4" /></video>
        </div>
        <div className="hero-txt">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <p className="subtitle">ESTABLISHED MMXXVI</p>
            <h1>The Art of <br/> <span>Pure Flavor</span></h1>
            <div className="divider"></div>
          </motion.div>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-img" data-aos="fade-right">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000" alt="About" />
            <div className="img-overlay-text">SINCE 2026</div>
          </div>
          <div className="about-content" data-aos="fade-left">
            <span className="section-tag">OUR STORY</span>
            <h2>Beyond Just a <br/> Coffee House.</h2>
            <p>Setiap cangkir Komorebi adalah narasi tentang dedikasi. Kami mengkurasi biji kopi terbaik dari hutan tropis Indonesia, menyangrai dengan presisi, dan menyajikannya untuk masyarakat yang menghargai kualitas tinggi.</p>
            <div className="about-stats">
              <div className="stat"><h3>12+</h3><p>Bean Origins</p></div>
              <div className="stat"><h3>05</h3><p>Master Baristas</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG SECTION */}
      <section className="catalog" id="menu">
        <div className="catalog-head" data-aos="fade-up">
          <span className="section-tag">THE MENU</span>
          <h2>{activeCat} SELECTION</h2>
        </div>
        <div className="product-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card" key={item.id}>
                <div className="card-img">
                  <img src={item.img} alt={item.name} />
                  <div className="tag">{item.cat}</div>
                </div>
                <div className="card-info">
                  <div className="title-row">
                    <h3>{item.name}</h3>
                    <span>{item.price}K</span>
                  </div>
                  <p>{item.note}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* PREMIUM FOOTER */}
      <footer className="premium-footer" id="contact">
        <div className="footer-top">
          <div className="footer-brand-box">
            <h2 className="footer-logo">KOMOREBI<span>.</span></h2>
            <p>Crafting perfection in every cup, creating a community for the refined society.</p>
            <div className="social-pills">
              <a href="https://www.instagram.com/rajafidhiazka?igsh=M2l0YTYwZGwzYmM2"><Instagram size={18} /></a>
              <a href="#"><Facebook size={18} /></a>
              <a href="#"><Twitter size={18} /></a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Location</h4>
            <div className="contact-item"><MapPin size={16}/> <span>Jl.Daun Pandan I 20, Kalisuren, Kec. Tajurhalang, Kab. Bogor, Jawa Barat</span></div>
            <div className="contact-item"><Phone size={16}/> <span>+62 818 0840 5954</span></div>
            <div className="contact-item"><Mail size={16}/> <span>rajafidhiazka@gmail.com</span></div>
          </div>
          <div className="footer-hours">
            <h4>Opening Hours</h4>
            <div className="hour-row"><span>Mon - Fri</span> <span>07:00 - 22:00</span></div>
            <div className="hour-row"><span>Sat - Sun</span> <span>08:00 - 23:00</span></div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 KOMOREBI ROASTERY. FINDING BEAUTY IN THE FLEETING MOMENTS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;