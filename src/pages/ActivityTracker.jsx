import { useState } from "react";
import "./ActivityTracker.css";

export default function ActivityTracker({ goBack }) {
    const [activities, setActivities] = useState([
        { id: 1, text: "Recycle plastic bottles", done: false },
        { id: 2, text: "Use reusable shopping bags", done: false },
        { id: 3, text: "Plant a tree or donate to reforestation", done: false },
        { id: 4, text: "Bike or walk instead of driving", done: false },
        { id: 5, text: "Turn off unused lights", done: false },
    ]);

    const toggleActivity = (id) => {
        setActivities((prev) =>
            prev.map((a) =>
                a.id === id ? { ...a, done: !a.done } : a
            )
        );
    };

    return (
        <div className="tracker">
            <h2>🌿 Your Eco Activities</h2>
            <p>Mark activities you’ve completed to track your positive impact.</p>

            <ul>
                {activities.map((a) => (
                    <li
                        key={a.id}
                        className={a.done ? "done" : ""}
                        onClick={() => toggleActivity(a.id)}
                    >
                        <input
                            type="checkbox"
                            checked={a.done}
                            onChange={() => toggleActivity(a.id)}
                        />
                        <span>{a.text}</span>
                    </li>
                ))}
            </ul>

            <button className="back-btn" onClick={goBack}>
                ← Back to Home
            </button>
        </div>
    );
}
