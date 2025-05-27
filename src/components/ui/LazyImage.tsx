import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
  threshold?: number;
  rootMargin?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  fallback,
  onLoad,
  onError,
  threshold = 0.1,
  rootMargin = '50px',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Load image when in view
  useEffect(() => {
    if (isInView && !isLoaded && !hasError && !isLoading) {
      setIsLoading(true);
      
      const img = new Image();
      img.onload = () => {
        setIsLoaded(true);
        setIsLoading(false);
        onLoad?.();
      };
      img.onerror = () => {
        setHasError(true);
        setIsLoading(false);
        onError?.();
      };
      img.src = src;
    }
  }, [isInView, isLoaded, hasError, isLoading, src, onLoad, onError]);

  const renderPlaceholder = () => (
    <motion.div
      className={`bg-gray-200 flex items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {placeholder ? (
        <img
          src={placeholder}
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
      ) : (
        <ImageIcon className="h-8 w-8 text-gray-400" />
      )}
    </motion.div>
  );

  const renderError = () => (
    <motion.div
      className={`bg-gray-100 flex items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {fallback || (
        <div className="text-center p-4">
          <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Image not available</p>
        </div>
      )}
    </motion.div>
  );

  const renderLoading = () => (
    <motion.div
      className={`bg-gray-200 flex items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-8 h-8 border-2 border-gray-300 border-t-orange rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {hasError ? (
        renderError()
      ) : isLoaded ? (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${className}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          loading="lazy"
        />
      ) : isLoading ? (
        renderLoading()
      ) : (
        renderPlaceholder()
      )}
    </div>
  );
};

// Optimized image component with blur-up effect
export const BlurImage: React.FC<LazyImageProps & { blurDataURL?: string }> = ({
  blurDataURL,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${props.className}`}>
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <motion.img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Main image */}
      <LazyImage
        {...props}
        onLoad={() => {
          setIsLoaded(true);
          props.onLoad?.();
        }}
      />
    </div>
  );
};

// Progressive image component
export const ProgressiveImage: React.FC<{
  src: string;
  lowQualitySrc?: string;
  alt: string;
  className?: string;
}> = ({ src, lowQualitySrc, alt, className = '' }) => {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || src);
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

  useEffect(() => {
    if (lowQualitySrc && lowQualitySrc !== src) {
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(src);
        setIsHighQualityLoaded(true);
      };
      img.src = src;
    }
  }, [src, lowQualitySrc]);

  return (
    <motion.img
      src={currentSrc}
      alt={alt}
      className={`transition-all duration-500 ${
        !isHighQualityLoaded && lowQualitySrc ? 'filter blur-sm' : ''
      } ${className}`}
      animate={{
        filter: isHighQualityLoaded ? 'blur(0px)' : 'blur(4px)',
      }}
      transition={{ duration: 0.5 }}
    />
  );
};

// Avatar component with fallback
export const AvatarImage: React.FC<{
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallbackText?: string;
  className?: string;
}> = ({ src, alt, size = 'md', fallbackText, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-lg',
  };

  const fallbackContent = fallbackText || alt.charAt(0).toUpperCase();

  if (!src || hasError) {
    return (
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-orange to-orange-red text-white rounded-full flex items-center justify-center font-semibold ${className}`}
      >
        {fallbackContent}
      </div>
    );
  }

  return (
    <LazyImage
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} rounded-full ${className}`}
      onError={() => setHasError(true)}
      fallback={
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-orange to-orange-red text-white rounded-full flex items-center justify-center font-semibold`}>
          {fallbackContent}
        </div>
      }
    />
  );
};

export default LazyImage;
