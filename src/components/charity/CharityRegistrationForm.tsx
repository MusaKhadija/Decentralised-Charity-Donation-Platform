import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCharityStore } from '../../store/useCharityStore';
import { useToast } from '../../contexts/ToastContext';
import { Upload, Globe, Twitter, Facebook, Instagram, Building, Users, Target, FileText } from 'lucide-react';

interface FormData {
  name: string;
  description: string;
  mission: string;
  category: string;
  website: string;
  walletAddress: string;
  imageUrl: string;
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

const CharityRegistrationForm: React.FC = () => {
  const { registerCharity, isLoading } = useCharityStore();
  const { showSuccess, showError } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    mission: '',
    category: '',
    website: '',
    walletAddress: '',
    imageUrl: '',
    socialLinks: {
      twitter: '',
      facebook: '',
      instagram: '',
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const categories = [
    'Healthcare',
    'Education',
    'Environment',
    'Emergency Relief',
    'Food & Nutrition',
    'Housing',
    'Social Services',
    'Community Development',
    'Animal Welfare',
    'Human Rights',
    'Arts & Culture',
    'Technology',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('social.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.mission || !formData.category || !formData.website || !formData.walletAddress) {
      showError('Please fill in all required fields');
      return;
    }

    try {
      await registerCharity(formData);
      showSuccess('Charity registration submitted successfully!', 'Your charity will be reviewed and verified within 3-5 business days.');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        mission: '',
        category: '',
        website: '',
        walletAddress: '',
        imageUrl: '',
        socialLinks: {
          twitter: '',
          facebook: '',
          instagram: '',
        }
      });
      setCurrentStep(1);
    } catch (error) {
      showError('Failed to register charity', 'Please try again later.');
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Building className="h-12 w-12 text-orange mx-auto mb-4" />
        <h3 className="text-xl font-bold text-text-dark">Basic Information</h3>
        <p className="text-charcoal">Tell us about your organization</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Organization Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange focus:border-orange transition-colors duration-300"
          placeholder="Enter your organization name"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange focus:border-orange transition-colors duration-300"
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Short Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange focus:border-orange transition-colors duration-300"
          placeholder="Brief description of your organization (max 200 characters)"
          maxLength={200}
        />
        <p className="text-sm text-gray-500 mt-1">{formData.description.length}/200 characters</p>
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
          Website URL *
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange focus:border-orange transition-colors duration-300"
            placeholder="https://your-organization.org"
          />
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Target className="h-12 w-12 text-orange mx-auto mb-4" />
        <h3 className="text-xl font-bold text-text-dark">Mission & Details</h3>
        <p className="text-charcoal">Share your mission and impact</p>
      </div>

      <div>
        <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-2">
          Mission Statement *
        </label>
        <textarea
          id="mission"
          name="mission"
          value={formData.mission}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange focus:border-orange transition-colors duration-300"
          placeholder="Describe your organization's mission and goals in detail"
        />
      </div>

      <div>
        <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700 mb-2">
          Stacks Wallet Address *
        </label>
        <input
          type="text"
          id="walletAddress"
          name="walletAddress"
          value={formData.walletAddress}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange focus:border-orange transition-colors duration-300 font-mono text-sm"
          placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
        />
        <p className="text-sm text-gray-500 mt-1">This address will receive donations</p>
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
          Organization Image URL
        </label>
        <div className="relative">
          <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange focus:border-orange transition-colors duration-300"
            placeholder="https://example.com/your-logo.jpg"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">Optional: URL to your organization's logo or representative image</p>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Users className="h-12 w-12 text-orange mx-auto mb-4" />
        <h3 className="text-xl font-bold text-text-dark">Social Media & Review</h3>
        <p className="text-charcoal">Connect your social presence</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="social.twitter" className="block text-sm font-medium text-gray-700 mb-2">
            Twitter/X Profile
          </label>
          <div className="relative">
            <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="url"
              id="social.twitter"
              name="social.twitter"
              value={formData.socialLinks.twitter}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange focus:border-orange transition-colors duration-300"
              placeholder="https://twitter.com/yourorganization"
            />
          </div>
        </div>

        <div>
          <label htmlFor="social.facebook" className="block text-sm font-medium text-gray-700 mb-2">
            Facebook Page
          </label>
          <div className="relative">
            <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="url"
              id="social.facebook"
              name="social.facebook"
              value={formData.socialLinks.facebook}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange focus:border-orange transition-colors duration-300"
              placeholder="https://facebook.com/yourorganization"
            />
          </div>
        </div>

        <div>
          <label htmlFor="social.instagram" className="block text-sm font-medium text-gray-700 mb-2">
            Instagram Profile
          </label>
          <div className="relative">
            <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="url"
              id="social.instagram"
              name="social.instagram"
              value={formData.socialLinks.instagram}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange focus:border-orange transition-colors duration-300"
              placeholder="https://instagram.com/yourorganization"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <FileText className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">Review Process</h4>
            <p className="text-sm text-blue-700 mt-1">
              After submission, our team will review your application within 3-5 business days. 
              You'll receive an email notification once your charity is verified and approved.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300 ${
                step <= currentStep
                  ? 'bg-orange border-orange text-white'
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-orange h-2 rounded-full"
            initial={{ width: '33%' }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <motion.button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            whileHover={currentStep > 1 ? { scale: 1.02 } : {}}
            whileTap={currentStep > 1 ? { scale: 0.98 } : {}}
          >
            Previous
          </motion.button>

          {currentStep < totalSteps ? (
            <motion.button
              type="button"
              onClick={nextStep}
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Next Step
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </motion.button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CharityRegistrationForm;
