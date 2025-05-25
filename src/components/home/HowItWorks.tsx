import React from 'react';
import { Wallet, DollarSign, BarChart3, ShieldCheck } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Wallet className="h-10 w-10 text-indigo-600" />,
      title: 'Connect Your Wallet',
      description: 'Link your Hiro Wallet to our platform with just a few clicks. Your funds remain secure and under your control at all times.',
    },
    {
      icon: <DollarSign className="h-10 w-10 text-indigo-600" />,
      title: 'Make a Donation',
      description: 'Choose a verified charity and donate any amount of STX tokens. The transaction is processed securely on the Stacks blockchain.',
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-indigo-600" />,
      title: 'Track Your Impact',
      description: 'All donations are recorded on-chain and can be viewed in real-time. See exactly how your contribution is making a difference.',
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-indigo-600" />,
      title: 'Verified Charities',
      description: 'We carefully verify all organizations on our platform to ensure your donations go to legitimate causes doing important work.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Our platform makes charitable giving transparent, secure, and efficient through blockchain technology.
          </p>
        </div>
        
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-indigo-100 p-3">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;