# GiveChain - Decentralized Charity Donations Platform

<div align="center">
  <img src="https://images.pexels.com/photos/6646989/pexels-photo-6646989.jpeg" alt="GiveChain Banner" width="800"/>
</div>

## Overview

GiveChain is a decentralized platform that enables transparent and secure charitable donations using the Stacks blockchain. By leveraging blockchain technology, we ensure that every donation is traceable, immutable, and reaches its intended beneficiaries.

### Key Features

- 🔒 **Secure Donations**: Make donations using STX tokens through secure blockchain transactions
- ✅ **Verified Charities**: Browse and donate to verified charitable organizations
- 📊 **Transparent Tracking**: Monitor donations and their impact in real-time
- 👤 **User Dashboard**: Track your donation history and impact
- 🔗 **Blockchain Integration**: Built on Stacks blockchain for security and transparency

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- [Hiro Wallet](https://wallet.hiro.so/) browser extension

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MusaKhadija/Decentralised-Charity-Donation-Platform
   cd Decentralised-Charity-Donation-Platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_STACKS_NETWORK=testnet
VITE_CONTRACT_ADDRESS=your_contract_address
VITE_CONTRACT_NAME=your_contract_name
```

## Architecture

### Frontend
- **React**: Modern UI framework for building interactive interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Zustand**: Lightweight state management
- **React Router**: Client-side routing
- **Lucide React**: Icon library

### Blockchain
- **Stacks Blockchain**: Layer-1 blockchain that enables smart contracts
- **Clarity**: Smart contract language for secure transactions
- **Hiro Wallet**: Web wallet for Stacks blockchain interaction

## Smart Contracts

### Charity Registration Contract
```clarity
;; charity-registry.clar
(define-data-var charities (list 100 {
  id: uint,
  name: (string-utf8 50),
  wallet: principal,
  verified: bool
}) (list))

(define-public (register-charity 
  (name (string-utf8 50)) 
  (wallet principal)
) (begin
  ;; Implementation details
))
```

### Donation Management Contract
```clarity
;; donation-manager.clar
(define-map donations 
  { id: uint } 
  { 
    donor: principal,
    charity: uint,
    amount: uint,
    timestamp: uint 
  }
)

(define-public (donate (charity-id uint) (amount uint))
  (begin
    ;; Implementation details
  ))
```

## Project Structure

```
givechain/
├── src/
│   ├── components/        # Reusable UI components
│   ├── contexts/         # React contexts
│   ├── pages/           # Page components
│   ├── store/           # Zustand store
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── contracts/           # Clarity smart contracts
├── public/             # Static assets
└── tests/              # Test files
```

## Features

### For Donors
- Connect Stacks wallet
- Browse verified charities
- Make secure donations
- Track donation history
- View impact metrics

### For Charities
- Register organization
- Receive donations
- Manage profile
- Track donations
- Generate reports

## Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## Testing

Run the test suite:
```bash
npm run test
```

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy smart contracts to testnet:
   ```bash
   clarinet deploy --testnet
   ```

3. Deploy frontend to production:
   ```bash
   npm run deploy
   ```

## Security

- All smart contracts are audited
- Multi-signature wallet support
- Rate limiting for donations
- Verified charity profiles

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Stacks Foundation](https://stacks.org)
- [Hiro Systems](https://www.hiro.so)
- [OpenZeppelin](https://www.openzeppelin.com)

## Contact

- Website: [givechain.netlify.app](https://givechain.netlify.app/)
- Email: quidax001@gmail.com
- Twitter: [@dataperitus](https://twitter.com/dataperitus)

## Roadmap

- [ ] Multi-currency support
- [ ] Recurring donations
- [ ] Mobile app
- [ ] Impact tracking
- [ ] Charity verification system
- [ ] Donor rewards program
