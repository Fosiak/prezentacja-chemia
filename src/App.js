import React, { useState, useEffect } from 'react';
import './App.css'; // Dodaj stylizację

function App() {
  const images = [
    '/images/1.jpg', // Upewnij się, że zdjęcia są w folderze public/images
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',
    '/images/8.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isHovered, setIsHovered] = useState(false); // Nowy stan dla śledzenia najechania myszką

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      (prevSlide - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="slideshow-container" style={{ height: windowHeight }}>
      <div className="slide">
        <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
      </div>

      {/* Kontener przycisków oraz licznika slajdów */}
      <div
        className="controls-container"
        onMouseEnter={() => setIsHovered(true)}  // Włącz widoczność paska na najechanie
        onMouseLeave={() => setIsHovered(false)} // Wyłącz widoczność paska po zjechaniu myszką
        style={{ opacity: isHovered ? 1 : 0 }}  // Zmienna widoczność paska
      >
        <button onClick={handlePrevSlide} className="prev-button">❮</button>
        <div className="slide-counter">
          {currentSlide + 1}/{images.length}
        </div>
        <button onClick={handleNextSlide} className="next-button">❯</button>
      </div>
    </div>
  );
}

export default App;
