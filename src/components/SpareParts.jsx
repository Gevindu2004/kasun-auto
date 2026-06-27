import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import './SpareParts.css';

const spareParts = [
  {
    id: 1,
    name: "COMPRESSOR",
    title: "AC Compressor",
    image: "/part_compressor.png",
    description: "High-efficiency compressor for maximum cooling power."
  },
  {
    id: 2,
    name: "CONDENSER",
    title: "Condenser Unit",
    image: "/part_condenser.png",
    description: "Premium heat dissipation with corrosion resistance."
  },
  {
    id: 3,
    name: "EVAPORATOR",
    title: "Evaporator Core",
    image: "/part_evaporator.png",
    description: "Optimized airflow and rapid cabin temperature drop."
  },
  {
    id: 4,
    name: "VALVE",
    title: "Expansion Valve",
    image: "/part_expansion_valve.png",
    description: "Precision refrigerant metering for balanced performance."
  },
  {
    id: 5,
    name: "BLOWER",
    title: "Blower Motor",
    image: "/part_blower.png",
    description: "Quiet and powerful multi-speed fan mechanism."
  }
];

const SpareParts = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % spareParts.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + spareParts.length) % spareParts.length);
  };

  const getOffset = (index) => {
    const diff = index - activeIndex;
    const len = spareParts.length;
    if (diff > Math.floor(len / 2)) return diff - len;
    if (diff < -Math.floor(len / 2)) return diff + len;
    return diff;
  };

  return (
    <section className="section-padding advanced-slider-section" id="parts">
      <div className="container relative slider-container">
        
        {/* Background Huge Text (Dynamic) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="slider-bg-text"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 0.05, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            {spareParts[activeIndex].name}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="parts-header relative z-10"
        >
          <h2 className="section-title">Genuine <span className="text-gradient">Spare Parts</span></h2>
          <p className="section-subtitle">
            Experience the next level of automotive cooling components.
          </p>
        </motion.div>

        <div className="advanced-carousel-wrapper">
          <AnimatePresence mode="popLayout">
            {spareParts.map((part, index) => {
              const offset = getOffset(index);
              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;

              // Advanced 3D Math properties
              // Center item is large, side items are small and angled heavily
              const scale = isCenter ? 1 : 0.55 - (absOffset * 0.1);
              const xOffset = offset * 45; 
              const yOffset = isCenter ? 0 : 40; 
              const zIndex = spareParts.length - absOffset;
              const opacity = 1; // Removed transparency
              
              // Rotate side items aggressively towards the center
              const rotateY = offset * -35; 
              // Add a slight tilt on the Z axis for style
              const rotateZ = isCenter ? 0 : offset * 5; 

              return (
                <motion.div
                  key={part.id}
                  className={`advanced-carousel-card ${isCenter ? 'active-card' : ''}`}
                  animate={{
                    scale: scale,
                    x: `${xOffset}%`,
                    y: yOffset,
                    zIndex: zIndex,
                    opacity: opacity,
                    rotateY: rotateY,
                    rotateZ: rotateZ
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 1.2
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="adv-image-wrapper">
                    <img src={part.image} alt={part.title} className="floating-img" />
                  </div>
                  
                  {isCenter && (
                    <motion.div 
                      className="adv-card-content glass-panel"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <div className="adv-card-header">
                        <Settings size={20} className="adv-icon" />
                        <h3>{part.title}</h3>
                      </div>
                      <p>{part.description}</p>
                      <button className="btn btn-outline btn-sm mt-4 w-full">View Details</button>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="adv-carousel-controls">
          <button className="btn btn-outline control-btn" onClick={handlePrev}>
            <ChevronLeft size={24} />
          </button>
          <div className="carousel-indicators">
            {spareParts.map((_, i) => (
              <div 
                key={i} 
                className={`indicator-dot ${i === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
          <button className="btn btn-outline control-btn" onClick={handleNext}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpareParts;
