import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ClimateQuotes() {
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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={currentQuote}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6 }}
      className="climate-quote"
    >
      <p>{quotes[currentQuote]}</p>
    </motion.div>
  );
}
