import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import VaultPage from "./vault/VaultPage";
import ClimateQuotes from "./components/ClimateQuotes";


// Pages
import Home from "./pages/Home";
import Mint from "./pages/Mint";
import Info from "./pages/Info";
import Community from "./pages/Community";

const CONTRACT_ADDRESS = "0xd57c184b1cc08628c731859d6de530723b074a9b";
const ABI = [
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "rewardUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "decimals", outputs: [{ internalType: "uint8", name: "", type: "uint8" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "owner", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
];

export default function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [mintHistory, setMintHistory] = useState([]);
  const [started, setStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [cleanMode, setCleanMode] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask!");
    try {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      await newProvider.send("eth_requestAccounts", []);
      const newSigner = await newProvider.getSigner();
      const address = await newSigner.getAddress();
      const newContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, newSigner);

      setProvider(newProvider);
      setSigner(newSigner);
      setContract(newContract);
      setWallet(address);
      setStatus("✅ Wallet connected successfully!");
      getBalance(newContract, address);
    } catch (err) {
      console.error(err);
      setStatus("❌ Wallet connection failed.");
    }
  };

  const getBalance = async (c, address) => {
    try {
      const bal = await c.balanceOf(address);
      const formatted = ethers.formatUnits(bal, 18);
      setBalance(`${formatted} GTN`);
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Error fetching balance.");
    }
  };

  const mintTokens = async () => {
    if (!toAddress || !amount) return alert("Please fill both fields.");
    try {
      const decimals = await contract.decimals();
      const value = ethers.parseUnits(amount, decimals);
      const tx = await contract.rewardUser(toAddress, value);
      setStatus("🪴 Minting in progress...");
      await tx.wait();
      setStatus("✅ Mint successful!");
      getBalance(contract, wallet);
      setMintHistory([{ to: toAddress, amount }, ...mintHistory]);
      setToAddress("");
      setAmount("");
    } catch (err) {
      console.error(err);
      setStatus("❌ Mint failed.");
    }
  };

  const startApp = () => {
    setStarted(true);
    setCurrentPage(0);
  };

  // Particle animation
  useEffect(() => {
    const spawnParticle = () => {
      const particle = document.createElement("div");
      particle.classList.add(cleanMode ? "leaf" : "smoke");
      particle.style.left = Math.random() * 100 + "vw";
      const size = cleanMode
        ? 15 + Math.random() * 25 + "px"
        : 20 + Math.random() * 40 + "px";
      particle.style.width = size;
      particle.style.height = size;
      particle.style.animationDuration = 6 + Math.random() * 5 + "s";
      particle.style.position = "fixed";
      particle.style.zIndex = "0";
      document.body.appendChild(particle);
      particle.addEventListener("animationend", () => particle.remove());
    };
    const interval = setInterval(spawnParticle, 1500);
    return () => clearInterval(interval);
  }, [cleanMode]);

  const pages = [
    <Home key={0} />,
    <Info key={1} />,
    <Mint
      wallet={wallet}
      balance={balance}
      toAddress={toAddress}
      setToAddress={setToAddress}
      amount={amount}
      setAmount={setAmount}
      mintTokens={mintTokens}
      status={status}
      mintHistory={mintHistory}
    />,
    <Community key={3} />,
  ];

  return (
    <Router>
      <Routes>
        {/* 🌿 Main App */}
        <Route
          path="/"
          element={
            <div className="app">
              <nav className="navbar">
                <h2 className="logo">🌿 GreenToken</h2>
                <div className="nav-links">
                  <button onClick={() => setStarted(true)}>Home</button>
                  <button onClick={() => setCurrentPage(1)}>Info</button>
                  <button onClick={() => setCurrentPage(2)}>Mint</button>
                  <button onClick={() => setCurrentPage(3)}>Community</button>

                  {/* ✅ Vault navigation */}
                  <Link to="/vault">
                    <button className="vault-btn">Yield Vault 🌱</button>
                  </Link>
                </div>

                <button
                  className={`connect-btn ${wallet ? "connected" : ""}`}
                  onClick={connectWallet}
                >
                  {wallet ? "Connected ✅" : "Connect Wallet"}
                </button>

                <button
                  className="toggle-btn"
                  onClick={() => setCleanMode(!cleanMode)}
                >
                  {cleanMode ? "Switch to Smoke 🌫️" : "Switch to Clean Air 🌿"}
                </button>
              </nav>

              {!started ? (
                <motion.section
                  className="landing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="hero-section">
                    <img
                      className="hero-bg"
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
                      alt="Climate Scenery"
                    />
                    <div className="hero-overlay">
                      <div className="hero-text">
                        <h1 className="animated-title">
                          <span className="rotating-globe">🌍</span> Climate Change is Real
                        </h1>

                        <p>
                          Rising temperatures, melting glaciers, and polluted air
                          threaten all living things. Let’s understand the facts —
                          and take meaningful action for a sustainable planet 🌱
                        </p>
                        <ClimateQuotes />

                        <div className="stats">
                          <div className="stat">
                            <motion.h2
                              className="stat-number"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 1 }}
                            >
                              +<CountUp end={1.5} decimals={1} duration={3} suffix="°C" />
                            </motion.h2>
                            <span className="stat-label">Global Temp Rise</span>
                          </div>

                          <div className="stat">
                            <motion.h2
                              className="stat-number"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 1.2 }}
                            >
                              <CountUp end={8} duration={3} suffix="M+" />
                            </motion.h2>
                            <span className="stat-label">Species at Risk</span>
                          </div>

                          <div className="stat">
                            <motion.h2
                              className="stat-number"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 1.4 }}
                            >
                              <CountUp end={60} duration={3} suffix="%" />
                            </motion.h2>
                            <span className="stat-label">Deforestation Rate</span>
                          </div>
                        </div>

                        <div className="cta-buttons">
                          <button className="start-btn" onClick={startApp}>
                            Start Tracking
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
                  ) : (
                <motion.div className="mainApp" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="page-container">{pages[currentPage]}</div>
                  <footer>
                    © 2025 GreenToken DApp — Built on Base 🌍 | Made with 💚 by Zeenat
                  </footer>
                </motion.div>
              )}
            </div>
          }
        />

        {/* ✅ Vault Page for Octant DeFi Hackathon */}
        <Route
          path="/vault"
          element={<VaultPage vaultAddress={CONTRACT_ADDRESS} tokenAddress={CONTRACT_ADDRESS} />}
        />
      </Routes>
    </Router>
  );
}
