import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fan, Wind, Thermometer, Settings2, ChevronLeft, ChevronRight } from 'lucide-react';
import PhotoGallery from './PhotoGallery';
import './Services.css';

const services = [
  {
    title: 'AC Diagnostics',
    description: 'Advanced computer diagnostics to pinpoint leaks, compressor issues, and electronic failures quickly and accurately.',
    icon: <Thermometer size={48} />,
    delay: 0.1
  },
  {
    title: 'Re-gassing & Recharge',
    description: 'Professional refrigerant recharge using eco-friendly R134a and R1234yf gases to restore factory cooling performance.',
    icon: <Wind size={48} />,
    delay: 0.2
  },
  {
    title: 'Compressor Repair',
    description: 'Expert repair and replacement of AC compressors, clutches, and belts to ensure maximum efficiency.',
    icon: <Settings2 size={48} />,
    delay: 0.3
  },
  {
    title: 'System Cleaning',
    description: 'Thorough evaporator and condenser cleaning to eliminate odors, mold, and improve airflow.',
    icon: <Fan size={48} />,
    delay: 0.4
  }
];


const Services = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const getOffset = (index) => {
    const diff = index - activeIndex;
    const len = services.length;
    if (diff > Math.floor(len / 2)) return diff - len;
    if (diff < -Math.floor(len / 2)) return diff + len;
    return diff;
  };

  return (
    <section className="section-padding" id="services">
      <div className="container relative services-slider-container">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center mb-12"
        >
          <h2 className="section-title">Our <span className="text-gradient">Services</span></h2>
          <p className="section-subtitle">
            Comprehensive auto air conditioning solutions to keep you cool on the hottest days.
          </p>
        </motion.div>

        <div className="services-3d-wrapper">
          <AnimatePresence mode="popLayout">
            {services.map((service, index) => {
              const offset = getOffset(index);
              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;

              const scale = isCenter ? 1 : 0.7 - (absOffset * 0.1);
              const xOffset = offset * 60; 
              const yOffset = isCenter ? 0 : 30; 
              const zIndex = services.length - absOffset;
              const opacity = 1; // Removed transparency
              
              const rotateY = offset * -25; 
              const rotateZ = isCenter ? 0 : offset * 2; 

              return (
                <motion.div
                  key={service.title}
                  className={`service-card glass-panel service-card-3d ${isCenter ? 'active' : ''}`}
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
                  <div className="service-icon-wrapper large-icon">
                    {service.icon}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.description}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="services-controls">
          <button className="btn btn-outline control-btn" onClick={handlePrev}>
            <ChevronLeft size={24} />
          </button>
          <div className="carousel-indicators">
            {services.map((_, i) => (
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

        <PhotoGallery />
      </div>
    </section>
  );
};

export default Services;
