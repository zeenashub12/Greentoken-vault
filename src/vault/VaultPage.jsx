import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./VaultPage.css";

const VaultPage = ({ vaultAddress, tokenAddress }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [vaultContract, setVaultContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [wallet, setWallet] = useState("");
  const [vaultBalance, setVaultBalance] = useState("0");
  const [tokenBalance, setTokenBalance] = useState("0");
  const [totalVaultAssets, setTotalVaultAssets] = useState("0");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [status, setStatus] = useState("");

  // Public goods allocation
  const [allocation, setAllocation] = useState({});
  const projects = [
    { name: "Reforest Earth", address: "0x123..." },
    { name: "Clean Water", address: "0xabc..." },
    { name: "Solar Villages", address: "0xdef..." },
  ];

  // Minimal ERC20 ABI
  const ERC20_ABI = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function balanceOf(address account) external view returns (uint256)",
    "function decimals() view returns (uint8)",
  ];

  // Minimal Vault ABI (ERC-4626 style)
  const VAULT_ABI = [
    "function deposit(uint256 assets, address receiver) external returns (uint256)",
    "function withdraw(uint256 shares, address receiver, address owner) external returns (uint256)",
    "function balanceOf(address account) external view returns (uint256)",
    "function totalAssets() view returns (uint256)"
  ];

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask!");
    try {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      await _provider.send("eth_requestAccounts", []);
      const _signer = await _provider.getSigner();
      const _wallet = await _signer.getAddress();

      const _vaultContract = new ethers.Contract(vaultAddress, VAULT_ABI, _signer);
      const _tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, _signer);

      setProvider(_provider);
      setSigner(_signer);
      setWallet(_wallet);
      setVaultContract(_vaultContract);
      setTokenContract(_tokenContract);

      updateBalances(_vaultContract, _tokenContract, _wallet);
      setStatus("✅ Wallet connected");
    } catch (err) {
      console.error(err);
      setStatus("❌ Wallet connection failed");
    }
  };

  const updateBalances = async (_vault, _token, _wallet) => {
    try {
      const tokenBal = await _token.balanceOf(_wallet);
      const vaultBal = await _vault.balanceOf(_wallet);
      const totalAssets = await _vault.totalAssets();
      const decimals = await _token.decimals();

      setTokenBalance(ethers.formatUnits(tokenBal, decimals));
      setVaultBalance(ethers.formatUnits(vaultBal, decimals));
      setTotalVaultAssets(ethers.formatUnits(totalAssets, decimals));
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Error fetching balances");
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || !vaultContract || !tokenContract) return;
    try {
      const decimals = await tokenContract.decimals();
      const amount = ethers.parseUnits(depositAmount, decimals);

      const approveTx = await tokenContract.approve(vaultAddress, amount);
      setStatus("Approving...");
      await approveTx.wait();

      const tx = await vaultContract.deposit(amount, wallet);
      setStatus("Depositing...");
      await tx.wait();

      setStatus("✅ Deposit successful!");
      updateBalances(vaultContract, tokenContract, wallet);
      setDepositAmount("");
    } catch (err) {
      console.error(err);
      setStatus("❌ Deposit failed");
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || !vaultContract || !tokenContract) return;
    try {
      const decimals = await tokenContract.decimals();
      const amount = ethers.parseUnits(withdrawAmount, decimals);

      const tx = await vaultContract.withdraw(amount, wallet, wallet);
      setStatus("Withdrawing...");
      await tx.wait();

      setStatus("✅ Withdrawal successful!");
      updateBalances(vaultContract, tokenContract, wallet);
      setWithdrawAmount("");
    } catch (err) {
      console.error(err);
      setStatus("❌ Withdrawal failed");
    }
  };

  // Handle allocation submission
  const submitAllocation = () => {
    const total = Object.values(allocation).reduce((a, b) => Number(a) + Number(b), 0);
    if (total !== 100) return alert("Total allocation must sum to 100%");
    setStatus("✅ Allocation recorded!");
    console.log("User yield allocation:", allocation);
    // Optional: send to contract here
  };

  // Optional: live update every 15 seconds
  useEffect(() => {
    if (!vaultContract || !tokenContract || !wallet) return;
    const interval = setInterval(() => {
      updateBalances(vaultContract, tokenContract, wallet);
    }, 15000);
    return () => clearInterval(interval);
  }, [vaultContract, tokenContract, wallet]);

  const userShare = totalVaultAssets && vaultBalance
    ? ((parseFloat(vaultBalance) / parseFloat(totalVaultAssets)) * 100).toFixed(2)
    : 0;

  return (
    <div className="vault-page">
      <h2>🌱 GreenToken Yield Vault</h2>
      {!wallet ? (
        <button className="connect-btn" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div className="vault-container">
          <p><strong>Wallet:</strong> {wallet}</p>
          <p><strong>Vault Balance:</strong> {vaultBalance} GTN</p>
          <p><strong>Wallet Token Balance:</strong> {tokenBalance} GTN</p>
          <p><strong>Total Vault Assets:</strong> {totalVaultAssets} GTN</p>
          <p><strong>Your Share:</strong> {userShare}%</p>

          <div className="vault-box">
            <input
              type="number"
              placeholder="Amount to deposit"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <button onClick={handleDeposit}>Deposit</button>
          </div>

          <div className="vault-box">
            <input
              type="number"
              placeholder="Amount to withdraw"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <button onClick={handleWithdraw}>Withdraw</button>
          </div>

          {/* Public Goods Allocation */}
          <div className="allocation-section">
            <h3>🌍 Allocate Your Yield</h3>
            {projects.map((project, index) => (
              <div key={index} className="project-allocation">
                <span>{project.name}</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={allocation[project.name] || ""}
                  onChange={(e) =>
                    setAllocation({ ...allocation, [project.name]: e.target.value })
                  }
                  placeholder="%"
                />
              </div>
            ))}
            <button onClick={submitAllocation}>Allocate Yield</button>
          </div>

          {status && <p className="status">{status}</p>}
        </div>
      )}
    </div>
  );
};

export default VaultPage;
