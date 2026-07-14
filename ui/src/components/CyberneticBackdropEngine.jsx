import React from 'react';

const CyberneticBackdropEngine = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        minHeight: '580px',
        overflow: 'hidden',
        background: 'url(/portfolio_bg.png) no-repeat left center',
        backgroundSize: 'cover',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default CyberneticBackdropEngine;
