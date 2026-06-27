import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Settings2, ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="hero-section" id="home">
      <motion.div 
        className="hero-background"
        style={{ y }}
      >
        <div className="hero-overlay-blur"></div>
        <img src="/hero_bg.png" alt="Sleek Auto AC Vent" className="hero-image" />
      </motion.div>

      <div className="container hero-content-container">
        <motion.div 
          className="hero-text-wrapper"
          style={{ y: textY, opacity }}
        >
          <motion.div 
            className="badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Settings2 size={16} className="badge-icon" />
            <span>Premium Auto AC Specialists</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Stay Cool.<br />
            <span className="text-gradient">Drive Comfortable.</span>
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience state-of-the-art climate control repair and maintenance for modern and luxury vehicles. We bring the freeze back to your drive.
          </motion.p>

          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="btn btn-primary">
              Book Diagnostics <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline" onClick={scrollToServices}>
              Our Services
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{ opacity: indicatorOpacity, cursor: 'pointer' }}
        onClick={scrollToServices}
      >
        <span className="scroll-text">Scroll To Explore</span>
        <motion.div
          animate={{ y: [0, 25, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <ChevronDown size={24} className="scroll-arrow" style={{ margin: '0 auto' }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
