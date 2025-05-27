import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'heart' | 'dots' | 'pulse';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  text,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'heart':
        return (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className={`${sizeClasses[size]} text-orange fill-current`} />
          </motion.div>
        );

      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-orange rounded-full"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <motion.div
            className={`${sizeClasses[size]} bg-orange rounded-full`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );

      case 'default':
      default:
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Loader2 className={`${sizeClasses[size]} text-orange`} />
          </motion.div>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {renderSpinner()}
      {text && (
        <motion.p
          className={`mt-3 text-charcoal ${textSizeClasses[size]} font-medium`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Predefined loading components for common use cases
export const PageLoader: React.FC<{ text?: string }> = ({ text = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <LoadingSpinner size="xl" variant="heart" text={text} />
  </div>
);

export const SectionLoader: React.FC<{ text?: string; className?: string }> = ({ 
  text = "Loading...", 
  className = "" 
}) => (
  <div className={`py-16 flex items-center justify-center ${className}`}>
    <LoadingSpinner size="lg" variant="default" text={text} />
  </div>
);

export const ButtonLoader: React.FC<{ text?: string }> = ({ text = "Loading..." }) => (
  <div className="flex items-center space-x-2">
    <LoadingSpinner size="sm" variant="default" />
    <span>{text}</span>
  </div>
);

export const CardLoader: React.FC = () => (
  <div className="bg-white rounded-xl shadow-md p-8 flex items-center justify-center">
    <LoadingSpinner size="md" variant="dots" />
  </div>
);

export const OverlayLoader: React.FC<{ text?: string; isVisible: boolean }> = ({ 
  text = "Processing...", 
  isVisible 
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-xl p-8 shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LoadingSpinner size="lg" variant="heart" text={text} />
      </motion.div>
    </motion.div>
  );
};

export const InlineLoader: React.FC<{ size?: 'sm' | 'md'; className?: string }> = ({ 
  size = 'sm', 
  className = '' 
}) => (
  <LoadingSpinner size={size} variant="default" className={`inline-flex ${className}`} />
);

export default LoadingSpinner;
