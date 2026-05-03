import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, Search, Shield, Zap } from 'lucide-react';
import { useVault } from '../hooks/useVault';
import { cn } from '../lib/utils';

interface LogEntry {
  type: 'input' | 'output' | 'error' | 'system';
  content: string | React.ReactNode;
  id: string;
}

export default function Terminal() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [input, setInput] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { fetchTrendingCreators, getVaultAlpha } = useVault();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    const initSequence = async () => {
      const messages = [
        'INITIALIZING VAULT AI PROTOCOL...',
        'ESTABLISHING CONNECTION TO HELIUS RPC...',
        'SYNCHRONIZING WITH BAGS ECONOMY STATE...',
        'MOMENTUM CALCULATOR ONLINE.',
        'PROTOCOL READY. TYPE "help" FOR COMMANDS.',
      ];

      for (const msg of messages) {
        setLogs(prev => [...prev, { type: 'system', content: msg, id: Math.random().toString() }]);
        await new Promise(r => setTimeout(r, 600));
      }
      setIsInitializing(false);
    };

    initSequence();
  }, []);

  const addLog = (type: LogEntry['type'], content: LogEntry['content']) => {
    setLogs(prev => [...prev, { type, content, id: Math.random().toString() }]);
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isInitializing) return;

    const cmd = input.toLowerCase().trim();
    addLog('input', `> ${input}`);
    setInput('');

    switch (cmd) {
      case 'help':
        addLog('output', (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-2"><Zap size={14} className="text-yellow-400" /> <span className="font-bold">scan</span>: Pulse Bags ecosystem for creators</div>
            <div className="flex items-center gap-2"><Shield size={14} className="text-blue-400" /> <span className="font-bold">vault</span>: Extract high-momentum Alpha</div>
            <div className="flex items-center gap-2"><Search size={14} className="text-green-400" /> <span className="font-bold">help</span>: Display command module list</div>
            <div className="flex items-center gap-2"><TerminalIcon size={14} className="text-purple-400" /> <span className="font-bold">clear</span>: Flush console buffer</div>
          </div>
        ));
        break;

      case 'scan':
        addLog('system', 'SCANNING BAGS ECOSYSTEM TOKEN CREATORS...');
        try {
          const creators = await fetchTrendingCreators();
          const container = {
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08
              }
            }
          };
          const item = {
            hidden: { opacity: 0, x: -10 },
            show: { opacity: 1, x: 0 }
          };

          addLog('output', (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs border border-green-500/20">
                <thead>
                  <tr className="bg-green-500/10 text-green-400 border-b border-green-500/20">
                    <th className="p-2 text-left">CREATOR</th>
                    <th className="p-2 text-right">FEES</th>
                    <th className="p-2 text-right">FOLLOWERS</th>
                    <th className="p-2 text-right text-green-300">MOMENTUM</th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {creators.slice(0, 10).map((c: any, i: number) => (
                    <motion.tr 
                      key={i} 
                      variants={item}
                      className="border-b border-green-500/10 hover:bg-green-500/5 transition-colors"
                    >
                      <td className="p-2 truncate max-w-[120px] font-mono">{c.creatorAddress?.toString() || 'Unknown'}</td>
                      <td className="p-2 text-right">{(c.totalFeesCollected / 1e9).toFixed(2)} SOL</td>
                      <td className="p-2 text-right">{c.followerCount}</td>
                      <td className="p-2 text-right font-bold text-green-300">{c.momentum.toFixed(4)}</td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          ));
        } catch (err) {
          addLog('error', 'ERR_SCAN_FAILURE: Could not interface with Bags SDK.');
        }
        break;

      case 'vault':
        addLog('system', 'DECRYPTING ALPHA DATA FROM VAULT...');
        try {
          const alpha = await getVaultAlpha();
          const container = {
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          };
          const item = {
            hidden: { opacity: 0, scale: 0.95 },
            show: { opacity: 1, scale: 1 }
          };

          addLog('output', (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4 mt-4"
            >
              {alpha.map((a: any, i: number) => (
                <motion.div 
                  key={i} 
                  variants={item}
                  className="p-3 border-l-4 border-green-400 bg-green-500/5 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="flex justify-between items-center">
                    <span className="text-green-300 font-bold">SIGNAL_{i + 1}</span>
                    <span className="text-[10px] opacity-50 px-2 py-0.5 border border-green-500/30 rounded">STRENGTH: HIGH</span>
                  </div>
                  <p className="text-xs mt-2 font-mono text-white/80">Creator: {a.creatorAddress?.toString()}</p>
                  <div className="flex gap-4 mt-3 text-[10px] text-green-400/70 border-t border-green-500/10 pt-2">
                    <span className="flex items-center gap-1"><Zap size={10} /> MOMENTUM: {a.momentum.toFixed(4)}</span>
                    <span className="flex items-center gap-1"><Shield size={10} /> FEES: {(a.totalFeesCollected / 1e9).toFixed(2)} SOL</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ));
        } catch (err) {
          addLog('error', 'ERR_VAULT_DECRYPT: Access denied or data corrupted.');
        }
        break;

      case 'clear':
        setLogs([]);
        break;

      default:
        addLog('error', `UNKNOWN_COMMAND: "${cmd}". Attempt "help" for a list of valid modules.`);
    }
  };

  return (
    <div className="w-full max-w-4xl h-[80vh] terminal-box rounded-lg p-1 flex flex-col mx-auto my-8 mt-24">
      <div className="scanline" />
      
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-green-500/20 bg-black/40">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} className="text-green-500 animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-green-500/80">VAULT_AI_v1.0.4</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-900/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-900/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-900/50" />
        </div>
      </div>

      {/* Logs View */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-sm low-opacity-text scroll-smooth"
      >
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "break-words py-0.5",
                log.type === 'input' && "text-white opacity-90",
                log.type === 'output' && "text-green-400",
                log.type === 'system' && "text-green-500/60 italic",
                log.type === 'error' && "text-red-500 bg-red-500/10 px-1 rounded"
              )}
            >
              {typeof log.content === 'string' ? (
                <span className={cn(log.type === 'system' && "before:content-['['] after:content-[']']")}>
                  {log.content}
                </span>
              ) : (
                log.content
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Field */}
      <form onSubmit={handleCommand} className="p-4 border-t border-green-500/20 bg-black/60 flex items-center gap-2">
        <span className="text-green-400 font-bold glow-text leading-none mt-0.5">λ</span>
        <input
          type="text"
          className="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isInitializing ? "SYSTEM INITIALIZING..." : "AWAITING COMMAND..."}
          autoFocus
          disabled={isInitializing}
          spellCheck={false}
        />
      </form>
    </div>
  );
}
