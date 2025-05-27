import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Twitter, Facebook, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-dark text-text-light">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-orange" />
              <span className="text-lg font-bold text-white">GiveChain</span>
            </div>
            <p className="mt-2 text-sm">
              A decentralized platform for transparent charity donations on the Stacks blockchain.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-text-light hover:text-orange transition duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-light hover:text-orange transition duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-light hover:text-orange transition duration-200">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-orange transition duration-200">Home</Link></li>
              <li><Link to="/charities" className="hover:text-orange transition duration-200">Charities</Link></li>
              <li><Link to="/about" className="hover:text-orange transition duration-200">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-orange transition duration-200">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <p className="text-sm mb-2">Have questions or suggestions?</p>
            <a href="mailto:info@givechain.org" className="text-orange hover:underline">
              info@givechain.org
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} GiveChain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
