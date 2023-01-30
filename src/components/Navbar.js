import Logo from "../images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Popup } from "reactjs-popup";
const Navbar = () => {

    const [expand, setExpand] = useState(false)
    const { pathname } = useLocation();

    useEffect(() => {
        setExpand(false)
    }, [pathname])

    return (
        <>
            <nav className="navbar-container">
                <div className="navbar">
                    <img className="logo" src={Logo} alt="logo"/>
                    <div className="nav-items">
                        <Link className="nav-item" to="/">Ana Sayfa</Link>
                        <Link className="nav-item" to="/basvuru">Başvuru</Link>
                        <Popup
                            trigger={(
                                <button className="responsive-nav-item">Konferans</button>
                            )}
                            position="bottom center"
                            closeOnDocumentClick
                        >
                            <div className="konf-items">
                                <Link className="konf-item" to="/ekip">Ekip</Link>
                                <Link className="konf-item" to="/komiteler">Komiteler</Link>
                            </div>
                        </Popup>
                    </div>
                    <button onClick={() => setExpand(prev => !prev)} className="menu-icon"><HiOutlineMenuAlt3 size={50} /></button>
                </div>
                {expand &&
                    <motion.div
                        className="responsive-nav-items"
                        initial={{ opacity: 0 , y: -100 }}
                        animate={{ opacity: 1 , y: 0 }}
                    >
                        <Link className="responsive-nav-item" to="/">Ana Sayfa</Link>
                        <Link className="responsive-nav-item" to="/basvuru">Başvuru</Link>
                        <Popup
                            trigger={(
                                <button className="responsive-nav-item">Konferans</button>
                            )}
                            position="bottom center"
                            closeOnDocumentClick
                        >
                            <motion.div
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="konf-items"
                            >
                                <Link className="konf-item" to="/ekip">Ekip</Link>
                                <Link className="konf-item" to="/komiteler">Komiteler</Link>
                            </motion.div>
                        </Popup>
                    </motion.div>
                }
            </nav>
        </>
    );
};

export default Navbar;
