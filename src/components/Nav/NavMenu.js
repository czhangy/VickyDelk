// Stylesheet
import styles from "@styles/Nav/NavMenu.module.scss";
// NextJS
import Link from "next/link";

const NavMenu = ({ open }) => {
    return (
        <nav
            id={styles["nav-menu"]}
            className={open ? styles.show : styles.hide}
        >
            <Link href="/about">
                <a className={styles["nav-link"]}>About</a>
            </Link>
            <Link href="/blog">
                <a className={styles["nav-link"]}>Blog</a>
            </Link>
            <Link href="/resume">
                <a className={styles["nav-link"]}>Resume</a>
            </Link>
        </nav>
    );
};

export default NavMenu;
