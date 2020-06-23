import React from "react";
import { Link } from "react-router-dom";
import Rainbow from "../hoc/Rainbow"

const Navbar = () => {
    return (
        <nav className="nav-wrapper blue darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">yo'planna</Link>
                <ul className="right">
                    <li><Link to="/day">Day</Link></li>
                    <li><Link to="/week">Week</Link></li>
                    <li><Link to="/month">Month</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>

            </div>
        </nav>
    )
}

export default Rainbow(Navbar);