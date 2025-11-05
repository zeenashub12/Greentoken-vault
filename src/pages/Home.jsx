// src/pages/Home.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Home.css";

export default function Home({ startApp }) {
    // Simple animated counter hook
    const useCounter = (target, duration = 1500) => {
        const [value, setValue] = useState(0);
        useEffect(() => {
            let start = null;
            const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                setValue(Math.floor(target * progress));
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }, [target, duration]);
        return value;
    };

    const co2Saved = useCounter(12500);
    const treesPlanted = useCounter(580);
    const members = useCounter(2100);

                // add this inside your Home() component, near top
            const quotes = [
            "🌱 Every small action counts — plant a seed, reduce waste, inspire change.",
            "💧 Save water today, secure life tomorrow.",
            "🌞 Switch to renewables — the sun never sends a bill.",
            "🌍 Be part of the solution, not the pollution.",
            "🍃 Sustainability is not a trend, it’s our future.",
            "♻️ What we save today will save us tomorrow.",
            ];

            const [currentQuote, setCurrentQuote] = useState(0);

            useEffect(() => {
            const interval = setInterval(() => {
                setCurrentQuote((prev) => (prev + 1) % quotes.length);
            }, 4000); // change every 4 seconds
            return () => clearInterval(interval);
            }, []);


    return (
        <motion.section
            className="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
        >
            {/* 🌍 Hero Section */}
            <div className="hero-section">
                <img
                    className="hero-bg"
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
                    alt="Sustainable Earth"
                />
                <div className="hero-overlay">
                    <div className="hero-text">

                        <p>
                            Together, we can <span className="accent">restore balance</span> to our
                            planet. Track your eco-impact, plant trees, and earn{" "}
                            <span className="brand">GreenToken</span> rewards for real climate action.
                        </p>

                            {/* 🌿 Climate Quotes Section */}
                            <div className="climate-quote">
                                <motion.p
                                key={currentQuote}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.6 }}
                                >
                                {quotes[currentQuote]}
                                </motion.p>
                            </div>

                        {/* 🌎 Statistics Section */}
                        <div className="stats">
                            <div className="stat">
                                <span className="stat-value">{co2Saved.toLocaleString()}</span>
                                <span className="stat-label">kg CO₂ offset</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{treesPlanted}</span>
                                <span className="stat-label">trees planted</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{members}</span>
                                <span className="stat-label">active members</span>
                            </div>
                        </div>

                        <div className="cta-buttons">
                            <button className="start-btn" onClick={() => setTracking(true)}>
                                🚀 Start Tracking
                            </button>
                            <a
                                href="https://www.un.org/sustainabledevelopment/climate-change/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="learn-btn"
                            >
                                Learn More →
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🌱 Highlights */}
            <div className="highlights">
                <div className="highlight">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2331/2331926.png"
                        alt="Recycle"
                    />
                    <p>Reduce & Recycle Waste</p>
                </div>
                <div className="highlight">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3069/3069116.png"
                        alt="Tree Planting"
                    />
                    <p>Plant Trees, Earn Tokens</p>
                </div>
                <div className="highlight">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1895/1895498.png"
                        alt="Community"
                    />
                    <p>Join Global Eco Community</p>
                </div>
            </div>
        </motion.section>
    );
}
