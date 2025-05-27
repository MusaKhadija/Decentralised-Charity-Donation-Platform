import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Charity } from '../../types/charity';
import { BadgeCheck, ExternalLink, Heart } from 'lucide-react';

interface CharityCardProps {
  charity: Charity;
  index?: number;
}

const CharityCard: React.FC<CharityCardProps> = ({ charity, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="card-interactive overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 relative overflow-hidden">
        <motion.img
          src={charity.imageUrl}
          alt={charity.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{
            scale: imageLoaded ? (isHovered ? 1.1 : 1) : 1.1,
            opacity: imageLoaded ? 1 : 0
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {charity.featured && (
          <motion.div
            className="absolute top-3 right-3 bg-orange text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          >
            ⭐ Featured
          </motion.div>
        )}

        {/* Floating heart animation */}
        <motion.div
          className="absolute top-3 left-3 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0, y: 10 }}
          animate={{
            scale: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Heart className="h-6 w-6 text-white fill-red-500 text-red-500" />
        </motion.div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <motion.h3
            className="text-lg font-bold text-text-dark"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {charity.name}
          </motion.h3>
          {charity.verified && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.2, rotate: 360 }}
            >
              <BadgeCheck className="h-5 w-5 text-orange-red" title="Verified Charity" />
            </motion.div>
          )}
        </div>

        <motion.p
          className="text-sm text-charcoal line-clamp-3 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {charity.description}
        </motion.p>

        <motion.div
          className="flex justify-between items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            to={`/charities/${charity.id}`}
            className="btn-primary text-sm group/btn relative overflow-hidden"
          >
            <motion.span
              className="relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Donate Now
            </motion.span>
          </Link>

          <motion.a
            href={charity.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-charcoal hover:text-orange-red transition-colors flex items-center text-sm group/link"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            Website
            <motion.div
              className="ml-1"
              animate={{ x: isHovered ? 3 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ExternalLink className="h-3 w-3" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CharityCard;
