import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to monitoring service in production
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <motion.div
            className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </motion.div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              We encountered an unexpected error. Don't worry, our team has been notified 
              and we're working to fix this issue.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.details
                className="mb-6 text-left bg-gray-100 rounded-lg p-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                  Error Details (Development)
                </summary>
                <pre className="text-xs text-red-600 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </motion.details>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={this.handleRetry}
                className="flex-1 bg-orange text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-red transition-colors duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </motion.button>

              <motion.button
                onClick={this.handleGoHome}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </motion.button>
            </div>

            <motion.div
              className="mt-6 pt-6 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-sm text-gray-500 mb-3">
                Still having issues? Contact our support team:
              </p>
              <a
                href="mailto:support@givechain.org"
                className="inline-flex items-center text-orange hover:text-orange-red transition-colors duration-300"
              >
                <Mail className="h-4 w-4 mr-2" />
                support@givechain.org
              </a>
            </motion.div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for functional components
export const useErrorHandler = () => {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    // In a real app, you would send this to your error reporting service
  };
};

// Simple error fallback component
export const ErrorFallback: React.FC<{ 
  error?: Error; 
  resetError?: () => void;
  title?: string;
  message?: string;
}> = ({ 
  error, 
  resetError, 
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again."
}) => (
  <motion.div
    className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-red-800 mb-2">{title}</h3>
    <p className="text-red-700 mb-4">{message}</p>
    
    {process.env.NODE_ENV === 'development' && error && (
      <details className="mb-4 text-left bg-white rounded p-3">
        <summary className="cursor-pointer font-medium text-red-700 mb-2">
          Error Details
        </summary>
        <pre className="text-xs text-red-600 overflow-auto">
          {error.toString()}
        </pre>
      </details>
    )}
    
    {resetError && (
      <motion.button
        onClick={resetError}
        className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Try Again
      </motion.button>
    )}
  </motion.div>
);

// Network error component
export const NetworkError: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <motion.div
    className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Connection Error</h3>
    <p className="text-yellow-700 mb-4">
      Unable to connect to the network. Please check your internet connection and try again.
    </p>
    
    {onRetry && (
      <motion.button
        onClick={onRetry}
        className="bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors duration-300 flex items-center mx-auto"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Retry
      </motion.button>
    )}
  </motion.div>
);

export default ErrorBoundary;
