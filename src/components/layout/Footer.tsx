import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Twitter, Facebook, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-amber-400" />
              <span className="text-lg font-bold text-white">GiveChain</span>
            </div>
            <p className="mt-2 text-sm">
              A decentralized platform for transparent charity donations on the Stacks blockchain.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-150">Home</Link>
              </li>
              <li>
                <Link to="/charities" className="text-gray-400 hover:text-white transition duration-150">Charities</Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-400 hover:text-white transition duration-150">Donation History</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://www.stacks.co/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-150">
                  Stacks Blockchain
                </a>
              </li>
              <li>
                <a href="https://hiro.so/wallet" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-150">
                  Hiro Wallet
                </a>
              </li>
              <li>
                <a href="https://explorer.stacks.co/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-150">
                  Stacks Explorer
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} GiveChain. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition duration-150">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition duration-150">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;