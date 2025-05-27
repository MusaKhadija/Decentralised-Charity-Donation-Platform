import React from 'react';
import { motion } from 'framer-motion';
import { Charity } from '../../types/charity';
import CharityCard from './CharityCard';
import { SkeletonCard } from '../ui/Skeleton';
import { Heart } from 'lucide-react';

interface CharityListProps {
  charities: Charity[];
  isLoading: boolean;
}

const CharityList: React.FC<CharityListProps> = ({ charities, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true" aria-live="polite" role="status">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <SkeletonCard />
          </motion.div>
        ))}
      </div>
    );
  }

  if (charities.length === 0) {
    return (
      <motion.div
        className="text-center py-16"
        role="alert"
        aria-live="polite"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="h-8 w-8 text-gray-400" />
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No charities found</h3>
        <p className="text-gray-500">Try adjusting your search or filters to find more charities.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
      {charities.map((charity, index) => (
        <div key={charity.id} role="listitem">
          <CharityCard charity={charity} index={index} />
        </div>
      ))}
    </div>
  );
};

export default CharityList;