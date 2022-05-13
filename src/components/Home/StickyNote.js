// Stylesheet
import styles from "@styles/Home/StickyNote.module.scss";

const StickyNote = ({ title }) => {
    return (
        <div className={styles["sticky-note"]}>
            <div className={styles.tape} />
            <h5 className={styles["note-title"]}>{title}</h5>
            <p className={styles["note-body"]}></p>
        </div>
    );
};

export default StickyNote;
