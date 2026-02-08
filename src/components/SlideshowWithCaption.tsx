"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaEye, FaEyeSlash } from 'react-icons/fa6';

interface Slide {
  src: string;
  caption: string;
}

type CaptionPosition = 'bottom' | 'top' | 'left' | 'right' | 'overlay';

interface SlideshowProps {
  slides: Slide[];
  captionPosition?: CaptionPosition;
  autoHideCaption?: boolean;
  showThumbnails?: boolean;
}

const SlideshowWithCaption: React.FC<SlideshowProps> = ({ 
  slides, 
  captionPosition = 'bottom',
  autoHideCaption = false ,
  showThumbnails = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCaption, setShowCaption] = useState(!autoHideCaption);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const toggleCaption = () => {
    setShowCaption((prev) => !prev);
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No slides available</p>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  const getLayoutClasses = () => {
    switch (captionPosition) {
      case 'top':
        return 'flex-col-reverse';
      case 'bottom':
        return 'flex-col';
      case 'left':
        return 'flex-row-reverse';
      case 'right':
        return 'flex-row';
      case 'overlay':
        return 'relative';
      default:
        return 'flex-col';
    }
  };

  const getImageContainerClasses = () => {
    if (captionPosition === 'left' || captionPosition === 'right') {
      return 'w-2/3';
    }
    return 'w-full';
  };

  const getCaptionContainerClasses = () => {
    if (captionPosition === 'overlay') {
      return 'absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4';
    }
    if (captionPosition === 'left' || captionPosition === 'right') {
      return 'w-1/3 flex items-center justify-center p-6 bg-gray-50';
    }
    return 'w-full p-4 bg-gray-50';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${
        captionPosition === 'overlay' ? '' : 'flex ' + getLayoutClasses()
      }`}>
        {/* Image Container */}
        <div className={`${getImageContainerClasses()} ${captionPosition === 'overlay' ? 'relative' : ''}`}>
          <div className="relative aspect-video bg-gray-200 p-8">
            <Image
              width={500}
              height={500}
              src={currentSlide.src}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
            
            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
              aria-label="Next slide"
            >
              <FaChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            {/* Caption Toggle Button */}
            <button
              onClick={toggleCaption}
              className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
              aria-label={showCaption ? "Hide caption" : "Show caption"}
            >
              {showCaption ? (
                <FaEyeSlash className="w-5 h-5 text-gray-800" />
              ) : (
                <FaEye className="w-5 h-5 text-gray-800" />
              )}
            </button>

            {/* Slide Counter */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {slides.length}
            </div>
          </div>

          {/* Overlay Caption */}
          {captionPosition === 'overlay' && showCaption && (
            <div className={getCaptionContainerClasses()}>
              <div dangerouslySetInnerHTML={{ __html: currentSlide.caption }} />
            </div>
          )}
        </div>

        {/* Non-Overlay Caption */}
        {captionPosition !== 'overlay' && showCaption && (
          <div className={getCaptionContainerClasses()}>
            <div 
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: currentSlide.caption }} 
            />
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {showThumbnails && <div className="flex justify-center gap-2 mt-4 flex-wrap">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-16 h-16 rounded overflow-hidden border-2 transition-all ${
              index === currentIndex
                ? 'border-blue-500 scale-110'
                : 'border-gray-300 opacity-60 hover:opacity-100'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <img
              src={slide.src}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>}
    </div>
  );
};


export default SlideshowWithCaption;