import React, { useEffect, useState } from 'react';
import CharityList from '../components/charity/CharityList';
import { useCharityStore } from '../store/useCharityStore';
import { Search } from 'lucide-react';

const CharitiesPage: React.FC = () => {
  const { charities, isLoading, fetchCharities } = useCharityStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    fetchCharities();
  }, [fetchCharities]);
  
  // Get unique categories from charities
  const categories = [...new Set(charities.map(charity => charity.category))];
  
  // Filter charities based on search term and category
  const filteredCharities = charities.filter(charity => {
    const matchesSearch = charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          charity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || charity.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Explore Charities</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
          Discover verified organizations making a difference and support their mission.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                placeholder="Search for charities..."
              />
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-md p-4">
          <div className="flex flex-wrap items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredCharities.length}</span> charities
              {selectedCategory && <span> in <span className="font-medium">{selectedCategory}</span></span>}
            </p>
            
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-sm text-indigo-600 hover:text-indigo-900"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      </div>
      
      <CharityList charities={filteredCharities} isLoading={isLoading} />
    </div>
  );
};

export default CharitiesPage;