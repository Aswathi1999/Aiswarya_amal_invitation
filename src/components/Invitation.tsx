"use client";
import { Children, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, MotionConfig, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { wedding } from '@/config/wedding';
import { gallery } from '@/config/gallery';


function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <div className={`scroll-reveal ${className}`}>
    {Children.map(children, (child, index) => <motion.div
      className="reveal-part"
      initial={reduced ? false : { opacity: 0, y: 48, scale: .97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: .12, margin: '0px 0px -48px 0px' }}
      transition={{ duration: reduced ? 0 : 1.05, delay: reduced ? 0 : delay + Math.min(index, 3) * .08, ease: [.16, 1, .3, 1] }}
    >{child}</motion.div>)}
  </div>;
}
function MovingBotanicals() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  return <div ref={ref} className={`moving-botanicals ${visible ? 'is-visible' : ''}`} aria-hidden="true"><Botanical className="floating-branch branch-left" /><Botanical className="floating-branch branch-right" /></div>;
}
function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, Date.parse(wedding.start) - Date.now()));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);
  if (remaining === 0) return <p className="celebratory" role="status">Our beautiful beginning is here.<br /><em>Thank you for your love and blessings.</em></p>;
  const values = remaining === null ? [null, null, null, null] : [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60];
  return <div className="countdown" role="timer" aria-label="Time until the wedding ceremony">{values.map((value, index) => <div key={index}><span>{value === null ? '—' : String(value).padStart(2, '0')}</span><small>{['Days', 'Hours', 'Minutes', 'Seconds'][index]}</small></div>)}</div>;
}
function Botanical({ className = '' }: { className?: string }) {
  return <svg className={`botanical ${className}`} viewBox="0 0 160 260" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1"><path d="M70 255C45 190 116 100 76 12M68 220C18 207 17 170 27 150C55 162 69 190 68 220ZM71 186C111 184 139 151 129 129C101 136 82 156 71 186ZM85 143C44 129 39 100 49 82C73 91 85 116 85 143ZM88 109C119 93 131 67 116 48C95 61 87 82 88 109ZM86 73C62 63 54 38 63 23C78 32 87 50 86 73ZM77 27C85 17 87 7 81 2"/><path d="M68 220 27 150M71 186 129 129M85 143 49 82M88 109 116 48M86 73 63 23" opacity=".5"/></g></svg>;
}
function Lamp() {
  return <svg className="lamp" viewBox="0 0 140 190" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.2"><path d="M70 9Q52 31 70 40Q88 31 70 9ZM34 46Q70 75 106 46ZM70 62V148M63 68V143M77 68V143M58 149H82L99 166H41L58 149ZM36 174H104M30 180H110M70 40V46M25 46H115M59 93H81M59 100H81"/></g></svg>;
}

export function Invitation() {

  return <MotionConfig reducedMotion="user"><a href="#celebration" className="skip-link">Skip to wedding details</a><main>
    <section className="hero photo-hero" aria-labelledby="couple-names">
      <div className="hero-portrait"><Image src={wedding.heroPhoto} alt="Aiswarya and Amal Raj together in the garden" fill preload sizes="100vw" /></div>
      <div className="hero-copy">
        <h1 id="couple-names">
          <motion.span className="name-line" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .15 }}>{wedding.bride}</motion.span>
          <motion.span className="ampersand name-line" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .4 }}>&</motion.span>
          <motion.span className="name-line" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .65 }}>{wedding.groom}</motion.span>
        </h1>
      </div>
    </section>
    <section id="celebration" className="celebration section animated-section"><MovingBotanicals /><Reveal><h2>The Wedding<br/><em>Celebration</em></h2><p className="section-intro">Join us in the warmth of family, tradition, and love.</p><div className="events">
      <article><p className="eyebrow">The sacred beginning</p><h3>Wedding Ceremony</h3><p className="event-date">{wedding.ceremony.date}</p><div className="event-rule"/><dl><div><dt>Muhurtham</dt><dd>{wedding.ceremony.time}</dd></div><div><dt>Venue</dt><dd>{wedding.ceremony.venue}</dd></div></dl>{wedding.ceremony.mapsUrl && <a className="text-link" href={wedding.ceremony.mapsUrl} target="_blank" rel="noopener noreferrer">Get Directions ↗</a>}</article>
      <article className="reception-card"><p className="eyebrow">An evening of togetherness</p><h3>Wedding-eve Reception</h3><p className="event-date">{wedding.reception.date}</p><div className="event-rule"/><dl><div><dt>Reception & wedding feast</dt><dd>{wedding.reception.time}</dd></div><div><dt>Venue</dt><dd>{wedding.reception.venue}</dd></div></dl>{wedding.reception.mapsUrl && <a className="text-link" href={wedding.reception.mapsUrl} target="_blank" rel="noopener noreferrer">Get Directions ↗</a>}</article>
    </div></Reveal></section>
    <section id="invitation" className="invitation section animated-section"><MovingBotanicals /><Reveal><Botanical/><p className="eyebrow">Our invitation</p><h2>Your presence.<br/><em>Our greatest joy.</em></h2><p className="body-copy">{wedding.invitation}</p><p className="signature">With love, our families</p></Reveal></section>
    <section id="gallery" className="gallery-section section" aria-labelledby="gallery-heading">
      <Reveal><h2 id="gallery-heading">Our <em>Gallery</em></h2></Reveal>
      <div className="photo-gallery">{gallery.map((photo, index) => <Reveal key={photo.src} className="gallery-item" delay={(index % 3) * .09}><a href={photo.original} target="_blank" rel="noopener noreferrer" aria-label={`View full photo: ${photo.alt} (opens in a new tab)`}><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 700px) 45vw, 28vw" loading="lazy" /></a></Reveal>)}</div>
    </section>
    <section id="countdown" className="countdown-section countdown-cards section animated-section" aria-labelledby="countdown-heading"><MovingBotanicals /><Reveal><h2 id="countdown-heading">Counting down <em>to forever.</em></h2><div className="countdown-ornament" aria-hidden="true"><span />✧<span /></div><Countdown /><p className="countdown-date-label">{wedding.dateLabel}<span>11:30 AM IST</span></p></Reveal></section>
    <footer className="closing compact-footer"><p className="closing-names">{wedding.names}</p><p className="closing-message">With love, we look forward to celebrating with you.</p></footer>
  </main></MotionConfig>;
}
