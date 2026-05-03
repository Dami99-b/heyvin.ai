import { useMemo } from 'react';
import { Connection } from '@solana/web3.js';
import { BagsSDK } from '@bagsfm/bags-sdk';

const RPC_URL = import.meta.env.VITE_HELIUS_RPC_URL || 'https://mainnet.helius-rpc.com/?api-key=7e88f262-21de-488c-b82b-75789b1da22c';


const BAGS_API_KEY = import.meta.env.VITE_BAGS_API_KEY;

export function useVault() {
  const connection = useMemo(() => new Connection(RPC_URL, 'confirmed'), []);

  const sdk = useMemo(() => {
    // Basic initialization for read-only state
    // We pass the API key if available in the config
    // @ts-ignore - Constructor might vary, providing config object
    return new BagsSDK(connection, { 
      apiKey: BAGS_API_KEY,
    } as any);
  }, [connection]);

  const fetchTrendingCreators = async () => {
    try {
      const creators = await sdk.state.getTokenCreators();
      // Momentum Calculator: high fee-to-follower ratios
      return creators
        .map((c: any) => ({
          ...c,
          momentum: c.totalFeesCollected / (c.followerCount || 1),
        }))
        .sort((a: any, b: any) => b.momentum - a.momentum);
    } catch (err) {
      console.error('Failed to fetch Bags data:', err);
      throw err;
    }
  };

  const getVaultAlpha = async () => {
    const creators = await fetchTrendingCreators();
    // High conviction alpha: Top 5 by momentum
    return creators.slice(0, 5);
  };

  return {
    connection,
    sdk,
    fetchTrendingCreators,
    getVaultAlpha,
  };
}
