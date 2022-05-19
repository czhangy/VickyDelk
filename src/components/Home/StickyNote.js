// Stylesheet
import styles from "@styles/Home/StickyNote.module.scss";

const StickyNote = (props) => {
    return (
        <div className={styles["sticky-note"]}>
            <div className={styles.tape} />
            <h5 className={styles["note-title"]}>{props.post.title}</h5>
            <p className={styles["note-body"]}>{props.post.content[0]}</p>
        </div>
    );
};

export default StickyNote;
