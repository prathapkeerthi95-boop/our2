import React from 'react';
import { motion } from 'framer-motion';

const paths = {
  heroAbstract: "M10 50 C 40 10, 60 90, 90 50 S 140 10, 190 50", // A smooth wave
  globe: "M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10 M 10 50 L 90 50 M 50 10 C 20 10, 20 90, 50 90 C 80 90, 80 10, 50 10",
  code: "M 30 30 L 10 50 L 30 70 M 70 30 L 90 50 L 70 70 M 60 20 L 40 80",
  sparkle: "M 50 10 Q 50 40 20 50 Q 50 60 50 90 Q 50 60 80 50 Q 50 40 50 10",
  eye: "M 10 50 Q 50 10 90 50 Q 50 90 10 50 M 50 30 A 20 20 0 1 0 50 70 A 20 20 0 1 0 50 30"
};

const AnimatedIcon = ({ type = 'heroAbstract', width = "100", height = "100", strokeWidth = 2, color = "var(--text-black)" }) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 2.5, 
        ease: "easeInOut",
        delay: 0.2
      } 
    }
  };

  return (
    <div style={{ width: `${width}px`, height: `${height}px`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.svg 
        width="100%" 
        height="100%" 
        viewBox={type === 'heroAbstract' ? "0 0 200 100" : "0 0 100 100"} 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.path
          d={paths[type]}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />
      </motion.svg>
    </div>
  );
};

export default AnimatedIcon;
