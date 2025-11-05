import React from "react";
import { Link } from "react-router-dom";
import "./mint.css";

export default function Mint({
  wallet,
  balance,
  toAddress,
  setToAddress,
  amount,
  setAmount,
  mintTokens,
  status,
  mintHistory,
}) {
  return (
    <section className="mint-section">
      <div className="mint-header">
        <h2>🌿 Green Token Minting</h2>
        <p className="wallet-info">
          {wallet ? (
            <>
              <strong>Wallet:</strong> {wallet}
            </>
          ) : (
            "No wallet connected"
          )}
        </p>
        <p className="balance">
          <strong>Balance:</strong> {balance || "0 GTN"}
        </p>
      </div>

      <div className="mint-container">
        <div className="mint-inputs">
          <input
            type="text"
            placeholder="Recipient Address"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="mint-btn" onClick={mintTokens}>
            Mint Tokens
          </button>
        </div>

        {status && <p className="status-message">{status}</p>}

        <div className="mint-history-box">
          <h3>🧾 Mint History</h3>
          {mintHistory.length > 0 ? (
            <ul className="mint-history">
              {mintHistory.map((entry, i) => (
                <li key={i}>
                  Minted <strong>{entry.amount} GTN</strong> to{" "}
                  <span>{entry.to}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-history">No minting activity yet.</p>
          )}
        </div>

        {/* ✅ Go to Vault Button */}
        <div className="go-to-vault">
          <Link to="/vault">
            <button className="vault-btn">Go to Yield Vault 🌿</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
