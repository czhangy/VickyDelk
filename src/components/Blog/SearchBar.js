// Stylesheet
import styles from "@styles/Blog/SearchBar.module.scss";

const SearchBar = () => {
    return (
        <form id={styles["search-bar"]}>
            <input id={styles["search-input"]} placeholder="Search by title" />
        </form>
    );
};

export default SearchBar;
