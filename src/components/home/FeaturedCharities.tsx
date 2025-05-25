import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CharityCard from '../charity/CharityCard';
import { useCharityStore } from '../../store/useCharityStore';

const FeaturedCharities: React.FC = () => {
  const { featuredCharities, isLoading, fetchFeaturedCharities } = useCharityStore();
  
  useEffect(() => {
    fetchFeaturedCharities();
  }, [fetchFeaturedCharities]);
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Featured Charities
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            These organizations are making a real difference in the world. 
            Learn about their mission and contribute to their cause.
          </p>
        </div>
        
        <div className="mt-12">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-8 bg-gray-300 rounded"></div>
                      <div className="h-8 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex justify-between pt-2">
                      <div className="h-8 bg-gray-300 rounded w-24"></div>
                      <div className="h-8 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredCharities.slice(0, 3).map(charity => (
                  <CharityCard key={charity.id} charity={charity} />
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <Link
                  to="/charities"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
                >
                  View All Charities
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCharities;