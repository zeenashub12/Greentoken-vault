import React, { useEffect } from "react";
import Navbar from "./Navbar"; // adjust path if needed

export default function LandingPage() {
    useEffect(() => {
        const spawnLeaf = () => {
            const leaf = document.createElement("div");
            leaf.classList.add("leaf");
            leaf.style.left = Math.random() * 100 + "vw";
            leaf.style.animationDuration = 6 + Math.random() * 4 + "s";
            document.body.appendChild(leaf);
            setTimeout(() => leaf.remove(), 10000);
        };
        const interval = setInterval(spawnLeaf, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="landing">
            <Navbar /> {/* ✅ Navbar added */}

            <section className="landing-hero">
                <div className="hero-text">
                    <h1 className="landing-title">
                        Welcome to <span className="brand">EcoVerse 🌍</span>
                    </h1>
                    <p className="landing-subtitle">
                        Join our mission to combat <span className="accent">climate change</span> and reduce <span className="accent">biohazards</span> by using innovative data-driven insights and community action.
                    </p>
                    <button className="start-btn">Explore Climate Insights</button>
                </div>

                <div className="hero-image">
                    <img
                        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
                        alt="Climate Scenery"
                    />
                </div>
            </section>

            <section className="stats">
                <div className="stat-card">
                    <div className="stat-number">+150</div>
                    <p>Communities Engaged</p>
                </div>
                <div className="stat-card">
                    <div className="stat-number">45%</div>
                    <p>Reduction in Biohazard Waste</p>
                </div>
                <div className="stat-card">
                    <div className="stat-number">12K</div>
                    <p>Trees Planted</p>
                </div>
            </section>

            <section className="climate-info">
                <h2>Understanding Climate & Biohazards</h2>
                <p>
                    Climate change intensifies biohazards—such as toxic waste, air pollution, and contaminated water—that affect millions globally. Our mission is to connect communities with real-time environmental data, encourage eco-friendly practices, and foster resilience through technology and collaboration.
                </p>
            </section>
        </div>
    );
}
