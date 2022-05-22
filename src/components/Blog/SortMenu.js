// Stylesheet
import styles from "@styles/Blog/SortMenu.module.scss";

const SortMenu = ({ open, onClick }) => {
    return (
        <ul
            id={styles["sort-menu"]}
            className={open ? styles.show : styles.hide}
        >
            <li id={styles["menu-button"]} onClick={() => onClick(true)}>
                Newest
            </li>
            <li id={styles["menu-button"]} onClick={() => onClick(false)}>
                Oldest
            </li>
        </ul>
    );
};

export default SortMenu;
