import { Link } from "react-router-dom";
import logo from "../assets/greentoken-logo.png"; // ✅ update path if needed


export default function Header() {
    return (
        <header className="navbar">
            <h2>🌿 GreenToken</h2>
            <nav>
                <Link to="/">Landing</Link>
                <Link to="/home">Home</Link>
                <Link to="/community">Community</Link>
                <Link to="/info">Info</Link>
            </nav>
        </header>
    );
}
