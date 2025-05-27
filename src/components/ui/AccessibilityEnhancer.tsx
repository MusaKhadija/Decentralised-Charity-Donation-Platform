import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Eye, EyeOff, Type, Contrast, Volume2, VolumeX } from 'lucide-react';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
}

const AccessibilityEnhancer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }

    // Check for system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    if (prefersReducedMotion || prefersHighContrast) {
      const systemSettings = {
        ...settings,
        reducedMotion: prefersReducedMotion,
        highContrast: prefersHighContrast,
      };
      setSettings(systemSettings);
      applySettings(systemSettings);
    }
  }, []);

  // Apply settings to document
  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // High contrast
    if (newSettings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (newSettings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Reduced motion
    if (newSettings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Screen reader announcements
    if (newSettings.screenReader) {
      root.setAttribute('aria-live', 'polite');
    } else {
      root.removeAttribute('aria-live');
    }
  };

  const updateSetting = (key: keyof AccessibilitySettings) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    
    setSettings(newSettings);
    applySettings(newSettings);
    localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));

    // Announce change to screen readers
    const announcement = `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${newSettings[key] ? 'enabled' : 'disabled'}`;
    announceToScreenReader(announcement);
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
    };
    
    setSettings(defaultSettings);
    applySettings(defaultSettings);
    localStorage.removeItem('accessibilitySettings');
    announceToScreenReader('Accessibility settings reset to default');
  };

  return (
    <>
      {/* Accessibility Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-orange text-white p-3 rounded-full shadow-lg hover:bg-orange-red transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open accessibility settings"
        title="Accessibility Settings"
      >
        <Settings className="h-6 w-6" />
      </motion.button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed bottom-20 right-4 z-50 bg-white rounded-xl shadow-2xl p-6 w-80 max-w-[calc(100vw-2rem)]"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-labelledby="accessibility-title"
              aria-describedby="accessibility-description"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 id="accessibility-title" className="text-lg font-bold text-gray-900">
                  Accessibility Settings
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange rounded"
                  aria-label="Close accessibility settings"
                >
                  <EyeOff className="h-5 w-5" />
                </button>
              </div>

              <p id="accessibility-description" className="text-sm text-gray-600 mb-6">
                Customize your experience with these accessibility options.
              </p>

              <div className="space-y-4">
                {/* High Contrast */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Contrast className="h-5 w-5 text-gray-600" />
                    <div>
                      <label htmlFor="high-contrast" className="text-sm font-medium text-gray-900">
                        High Contrast
                      </label>
                      <p className="text-xs text-gray-500">Increase color contrast for better visibility</p>
                    </div>
                  </div>
                  <button
                    id="high-contrast"
                    onClick={() => updateSetting('highContrast')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 ${
                      settings.highContrast ? 'bg-orange' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.highContrast}
                    aria-labelledby="high-contrast"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Large Text */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Type className="h-5 w-5 text-gray-600" />
                    <div>
                      <label htmlFor="large-text" className="text-sm font-medium text-gray-900">
                        Large Text
                      </label>
                      <p className="text-xs text-gray-500">Increase text size for better readability</p>
                    </div>
                  </div>
                  <button
                    id="large-text"
                    onClick={() => updateSetting('largeText')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 ${
                      settings.largeText ? 'bg-orange' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.largeText}
                    aria-labelledby="large-text"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.largeText ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Reduced Motion */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-gray-600" />
                    <div>
                      <label htmlFor="reduced-motion" className="text-sm font-medium text-gray-900">
                        Reduced Motion
                      </label>
                      <p className="text-xs text-gray-500">Minimize animations and transitions</p>
                    </div>
                  </div>
                  <button
                    id="reduced-motion"
                    onClick={() => updateSetting('reducedMotion')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 ${
                      settings.reducedMotion ? 'bg-orange' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.reducedMotion}
                    aria-labelledby="reduced-motion"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Screen Reader Announcements */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Volume2 className="h-5 w-5 text-gray-600" />
                    <div>
                      <label htmlFor="screen-reader" className="text-sm font-medium text-gray-900">
                        Enhanced Announcements
                      </label>
                      <p className="text-xs text-gray-500">More detailed screen reader announcements</p>
                    </div>
                  </div>
                  <button
                    id="screen-reader"
                    onClick={() => updateSetting('screenReader')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 ${
                      settings.screenReader ? 'bg-orange' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.screenReader}
                    aria-labelledby="screen-reader"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.screenReader ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Reset Button */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={resetSettings}
                  className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
                >
                  Reset to Default
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityEnhancer;
