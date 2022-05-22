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
    const openMenu = (event) => {
        // Safari focus workaround
        event.target.focus();
        setMenuOpen(true);
    };
    const closeMenu = () => {
        // Allow nav links to be clicked before menu close
        setTimeout(() => setMenuOpen(false), 50);
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
            <button
                id={styles["menu-button"]}
                onClick={(event) => openMenu(event)}
                onBlur={closeMenu}
            >
                <hr className={styles["menu-line"]} />
                <hr className={styles["menu-line"]} />
                <hr className={styles["menu-line"]} />
            </button>
            <NavMenu open={menuOpen} />
        </nav>
    );
};

export default Navbar;
