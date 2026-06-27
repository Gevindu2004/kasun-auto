import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './PhotoGallery.css';

const images = [
  '/services_bg.png',
  '/mechanic_working_1.png',
  '/mechanic_working_2.png',
  '/mechanic_working_3.png'
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const PhotoGallery = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="photo-gallery-container mt-24">
      <h3 className="section-title text-center mb-8">
        Our <span className="text-gradient">Gallery</span>
      </h3>
      
      <div className="gallery-slider">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000) {
                paginate(1);
              } else if (swipe > 10000) {
                paginate(-1);
              }
            }}
            className="gallery-slide"
          >
            {/* Parallax Image Effect */}
            <motion.img 
              src={images[imageIndex]} 
              alt={`Gallery image ${imageIndex + 1}`} 
              className="gallery-image"
              initial={{ scale: 1.2, x: direction > 0 ? 100 : -100 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              draggable="false"
            />
          </motion.div>
        </AnimatePresence>

        <button className="gallery-nav-btn prev btn-outline" onClick={() => paginate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <button className="gallery-nav-btn next btn-outline" onClick={() => paginate(1)}>
          <ChevronRight size={24} />
        </button>
        
        <div className="gallery-indicators">
          {images.map((_, idx) => (
            <div 
              key={idx}
              className={`gallery-dot ${idx === imageIndex ? 'active' : ''}`}
              onClick={() => {
                const newDirection = idx > imageIndex ? 1 : -1;
                setPage([page + (idx - imageIndex), newDirection]);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
