import React from 'react';
import { Link } from 'react-router-dom';
import { useStacks } from '../../contexts/StacksContext';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const { authenticated, handleSignIn } = useStacks();
  
  return (
    <div className="relative bg-indigo-800 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <div className="absolute inset-0 z-0 transform origin-top-right opacity-20">
            <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect x="0" y="0" width="4" height="4" className="text-white" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
            </svg>
          </div>
          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Blockchain-Powered</span>
                <span className="block text-amber-400">Charitable Giving</span>
              </h1>
              <p className="mt-3 text-base text-indigo-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Donate securely and transparently to verified charities using the Stacks blockchain. 
                Every contribution is immutably recorded and can be tracked in real-time.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                {authenticated ? (
                  <Link
                    to="/charities"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-100 transition duration-150"
                  >
                    Browse Charities <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-100 transition duration-150"
                  >
                    Connect Wallet
                  </button>
                )}
                <Link
                  to="/charities"
                  className="mt-3 sm:mt-0 sm:ml-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.pexels.com/photos/6646989/pexels-photo-6646989.jpeg"
          alt="People helping each other"
        />
      </div>
    </div>
  );
};

export default Hero;