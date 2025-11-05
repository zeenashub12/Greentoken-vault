import { useState } from "react";
import "./Community.css"; // optional if you want to style it separately

export default function Community() {
    const [aiInput, setAiInput] = useState("");
    const [aiResponse, setAiResponse] = useState("");

    const handleAIAsk = () => {
        if (!aiInput.trim()) return;

        setAiResponse("🤔 Thinking...");
        setTimeout(() => {
            setAiResponse(
                "🌍 Great question! To live sustainably, reduce waste, use clean energy, and plant trees whenever possible. 💚"
            );
        }, 1200);
    };

    return (
        <section
            style={{
                padding: "2rem",
                background: "linear-gradient(180deg, #e0ffe3, #f5fff7)",
                minHeight: "100vh",
                color: "#1a3c34",
                textAlign: "center",
            }}
        >
            <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
                🌱 Green Community Hub
            </h2>
            <p style={{ marginBottom: "2rem", fontSize: "1rem" }}>
                Connect, learn, and share ideas on how we can protect our planet
                together!
            </p>

            {/* AI Box */}
            <div
                style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    maxWidth: "500px",
                    margin: "0 auto",
                }}
            >
                <h3 style={{ marginBottom: "1rem" }}>🤖 Ask Our AI Climate Buddy</h3>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                    <input
                        type="text"
                        placeholder="e.g. How does tree planting help the climate?"
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        style={{
                            flex: 1,
                            padding: "0.6rem",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            outline: "none",
                        }}
                    />
                    <button
                        onClick={handleAIAsk}
                        style={{
                            background: "#27ae60",
                            color: "white",
                            border: "none",
                            padding: "0.6rem 1rem",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                    >
                        Ask AI
                    </button>
                </div>
                {aiResponse && (
                    <div
                        style={{
                            background: "#f0fff4",
                            border: "1px solid #b2f5ea",
                            padding: "1rem",
                            borderRadius: "8px",
                            color: "#2f855a",
                        }}
                    >
                        {aiResponse}
                    </div>
                )}
            </div>

            {/* Social Links */}
            <div style={{ marginTop: "3rem" }}>
                <h3>🌐 Join Our Community</h3>
                <p>Follow us and stay updated on our eco-initiatives:</p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer" style={{ color: "#1DA1F2" }}>
                        Twitter
                    </a>
                    <a href="https://t.me/" target="_blank" rel="noreferrer" style={{ color: "#0088cc" }}>
                        Telegram
                    </a>
                    <a href="https://discord.gg/" target="_blank" rel="noreferrer" style={{ color: "#5865F2" }}>
                        Discord
                    </a>
                    <a href="https://github.com/" target="_blank" rel="noreferrer" style={{ color: "#333" }}>
                        GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
