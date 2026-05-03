import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import Terminal from './components/Terminal';
import { motion } from 'motion/react';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

export default function App() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => import.meta.env.VITE_HELIUS_RPC_URL || clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *   - (Optional) Wallet Standard
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-[#050505] text-[#00ff41] relative overflow-hidden flex flex-col font-mono">
            
            {/* Background Grid Accent */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, #00ff41 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Navigation / Header */}
            <header className="fixed top-0 left-0 w-full z-20 flex justify-between items-center p-6 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-[0.2em] glow-text uppercase">Vault AI</h1>
                  <p className="text-[10px] text-green-500/60 font-medium">BETA_PROTOCOL_ACCESS_01</p>
                </div>
              </motion.div>

              <div className="flex items-center gap-4">
                <WalletMultiButton className="wallet-adapter-button-custom" />
              </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex items-center justify-center p-4">
              <Terminal />
            </main>

            {/* Footer / Status Bar */}
            <footer className="fixed bottom-0 left-0 w-full p-4 flex justify-between items-center text-[10px] uppercase text-green-500/40 bg-black/40 border-t border-green-500/10 backdrop-blur-md">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  NETWORK: MAINNET_BETA
                </div>
                <div>LATENCY: 42MS</div>
                <div>ECOSYSTEM: BAGSFM_PROTOCOL</div>
              </div>
              <div className="hidden sm:block">
                SEC_ARCH: ZERO_TRUST_VAULT
              </div>
            </footer>

            {/* Global Scanning Overlay */}
            <motion.div 
              animate={{
                top: ["-20%", "120%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-0 w-full h-[2px] bg-green-500/10 shadow-[0_0_20px_rgba(0,255,65,0.2)] z-0 pointer-events-none"
            />
          </div>

          <style>{`
            .wallet-adapter-button-custom {
              background: rgba(0, 255, 65, 0.1) !important;
              border: 1px solid rgba(0, 255, 65, 0.4) !important;
              color: #00ff41 !important;
              font-family: inherit !important;
              font-size: 11px !important;
              text-transform: uppercase !important;
              letter-spacing: 0.1em !important;
              height: 40px !important;
              border-radius: 4px !important;
              transition: all 0.2s ease !important;
            }
            .wallet-adapter-button-custom:hover {
              background: rgba(0, 255, 65, 0.2) !important;
              border-color: #00ff41 !important;
              box-shadow: 0 0 15px rgba(0, 255, 65, 0.2) !important;
            }
            .wallet-adapter-modal-wrapper {
              background: #0a0a0a !important;
              border: 1px solid rgba(0, 255, 65, 0.2) !important;
              border-radius: 8px !important;
              color: #00ff41 !important;
              font-family: inherit !important;
            }
            .wallet-adapter-modal-title {
              color: #00ff41 !important;
            }
            .wallet-adapter-modal-button-close {
              background: rgba(0, 255, 65, 0.1) !important;
            }
          `}</style>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
