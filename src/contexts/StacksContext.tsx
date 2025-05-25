import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { StacksNetwork, StacksTestnet } from '@stacks/network';
import { UserSession, AppConfig, showConnect } from '@stacks/connect';

interface StacksContextType {
  userSession: UserSession;
  network: StacksNetwork;
  userData: any;
  authenticated: boolean;
  connecting: boolean;
  handleSignIn: () => void;
  handleSignOut: () => void;
}

const defaultNetwork = new StacksTestnet();
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

const StacksContext = createContext<StacksContextType | undefined>(undefined);

export const StacksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
        setAuthenticated(true);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
      setAuthenticated(true);
    }
  }, []);

  const handleSignIn = () => {
    setConnecting(true);
    try {
      showConnect({
        appDetails: {
          name: 'GiveChain',
          icon: window.location.origin + '/logo.png',
        },
        redirectTo: window.location.pathname,
        onFinish: () => {
          const userData = userSession.loadUserData();
          setUserData(userData);
          setAuthenticated(true);
          setConnecting(false);
        },
        onCancel: () => {
          console.log('Wallet connection cancelled by user');
          setConnecting(false);
        },
        userSession,
      });
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setConnecting(false);
    }
  };

  const handleSignOut = () => {
    userSession.signUserOut(window.location.origin);
    setUserData(null);
    setAuthenticated(false);
  };

  return (
    <StacksContext.Provider
      value={{
        userSession,
        network: defaultNetwork,
        userData,
        authenticated,
        connecting,
        handleSignIn,
        handleSignOut,
      }}
    >
      {children}
    </StacksContext.Provider>
  );
};

export const useStacks = (): StacksContextType => {
  const context = useContext(StacksContext);
  if (context === undefined) {
    throw new Error('useStacks must be used within a StacksProvider');
  }
  return context;
};
