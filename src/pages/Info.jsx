import React from "react";
import { motion } from "framer-motion";
import "./Info.css";

export default function Info() {
    const cards = [
        {
            img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
            title: "Building a Sustainable Future",
            desc: "Together, we can protect our planet by supporting eco-friendly innovations and adopting green habits.",
            link: "https://www.un.org/sustainabledevelopment/sustainable-development-goals/",
        },
        {
            img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
            title: "Empowering Climate Action",
            desc: "GreenToken rewards individuals and communities who take meaningful steps toward reducing carbon footprints.",
            link: "https://climate.nasa.gov/",
        },
        {
            img: "https://images.unsplash.com/photo-1581093458791-9a26b6d6d5a0?auto=format&fit=crop&w=800&q=80",
            title: "Technology for the Planet",
            desc: "Blockchain and AI bring transparency and impact tracking to environmental projects worldwide.",
            link: "https://www.weforum.org/topics/climate-change",
        },
        {
            img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
            title: "Join the Green Movement",
            desc: "Be part of the global mission to restore balance — one token, one action, one tree at a time.",
            link: "https://www.worldwildlife.org/",
        },
        {
            img: "https://images.unsplash.com/photo-1598514982930-fd9a66f0f04f?auto=format&fit=crop&w=800&q=80",
            title: "Clean Energy Revolution",
            desc: "Solar, wind, and hydro innovations are reshaping how we power our world sustainably.",
            link: "https://www.irena.org/renewable-energy",
        },
        {
            img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
            title: "Protecting Biodiversity",
            desc: "Every species plays a vital role. Learn how conservation efforts help maintain our planet’s balance.",
            link: "https://www.unep.org/explore-topics/biodiversity",
        },
    ];

    return (
        <section className="info-section">
            {/* Background gradient + scenery effect */}
            <div className="info-bg"></div>

            <motion.h2
                className="info-title"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                🌿 Learn About Climate Action
            </motion.h2>

            <motion.p
                className="info-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Explore how technology, community, and innovation are shaping a greener tomorrow.
            </motion.p>

            <div className="card-container">
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        className="info-card"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <img src={card.img} alt={card.title} className="card-img" />
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                        <a href={card.link} target="_blank" rel="noopener noreferrer">
                            Learn More →
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
