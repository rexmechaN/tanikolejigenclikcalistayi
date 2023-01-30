import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
const Navbar = () => {
    return (
        <nav className="navbar-container">
            <div className="navbar">
                <img className="logo" src={Logo} alt="logo"/>
                <div className="nav-items">
                    <Link className="nav-item" to="/">Ana Sayfa</Link>
                    <Link className="nav-item" to="/basvuru">Başvuru</Link>
                    <button className="nav-item">Konferans</button>
                </div>
                <button className="menu-icon"><HiOutlineMenuAlt3 size={50} /></button>
            </div>
        </nav>
    );
};

export default Navbar;
