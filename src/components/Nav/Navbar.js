// React
import { useState } from "react";
// NextJS
import Link from "next/link";
// Stylesheet
import styles from "@styles/Nav/Navbar.module.scss";
// Local components
import NavMenu from "@components/Nav/NavMenu";

const Navbar = () => {
    // Nav menu state
    const [menuOpen, setMenuOpen] = useState(false);

    // Toggle the nav menu state on button click
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav id={styles.navbar}>
            <Link href="/">
                <a id={styles["site-title"]}>Victoria Delk</a>
            </Link>
            <div id={styles["link-container"]}>
                <Link href="/about">
                    <a className={styles["nav-link"]}>About</a>
                </Link>
                <Link href="/blog">
                    <a className={styles["nav-link"]}>Blog</a>
                </Link>
                <Link href="/resume">
                    <a className={styles["nav-link"]}>Resume</a>
                </Link>
            </div>
            <button id={styles["menu-button"]} onClick={toggleMenu}>
                <hr className={styles["menu-line"]} />
                <hr className={styles["menu-line"]} />
                <hr className={styles["menu-line"]} />
            </button>
            <NavMenu open={menuOpen} />
        </nav>
    );
};

export default Navbar;
