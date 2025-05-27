import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Framer Motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    form: 'form',
    button: 'button',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    span: 'span',
    img: 'img',
    section: 'section',
    nav: 'nav',
    header: 'header',
    footer: 'footer',
    main: 'main',
    aside: 'aside',
    article: 'article',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
  useInView: () => [vi.fn(), true],
}));

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  Heart: () => 'Heart',
  DollarSign: () => 'DollarSign',
  CheckCircle: () => 'CheckCircle',
  Sparkles: () => 'Sparkles',
  Menu: () => 'Menu',
  X: () => 'X',
  Search: () => 'Search',
  Filter: () => 'Filter',
  MapPin: () => 'MapPin',
  Globe: () => 'Globe',
  Users: () => 'Users',
  Calendar: () => 'Calendar',
  ExternalLink: () => 'ExternalLink',
  ArrowRight: () => 'ArrowRight',
  ChevronDown: () => 'ChevronDown',
  ChevronUp: () => 'ChevronUp',
  Info: () => 'Info',
  AlertCircle: () => 'AlertCircle',
  Loader2: () => 'Loader2',
}));

// Mock React Router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: 'charity-1' }),
    useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
  };
});

// Mock Stacks Connect
vi.mock('@stacks/connect', () => ({
  showConnect: vi.fn(),
  UserSession: vi.fn().mockImplementation(() => ({
    isSignInPending: () => false,
    isUserSignedIn: () => false,
    loadUserData: () => null,
    signUserOut: vi.fn(),
    handlePendingSignIn: () => Promise.resolve(null),
  })),
  AppConfig: vi.fn(),
}));

// Mock Stacks Network
vi.mock('@stacks/network', () => ({
  StacksTestnet: vi.fn(),
  StacksMainnet: vi.fn(),
}));

// Mock Stacks Transactions
vi.mock('@stacks/transactions', () => ({
  makeContractCall: vi.fn(),
  broadcastTransaction: vi.fn(),
  AnchorMode: {
    Any: 'any',
  },
  PostConditionMode: {
    Allow: 'allow',
  },
}));

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver for react-intersection-observer
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver for react-use-measure
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Suppress console warnings in tests
const originalConsoleWarn = console.warn;
console.warn = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('React Router') ||
     args[0].includes('Warning: ReactDOM.render') ||
     args[0].includes('Warning: componentWillReceiveProps'))
  ) {
    return;
  }
  originalConsoleWarn(...args);
};
