// Stylesheet
import styles from "@styles/Home/StickyNote.module.scss";
// NextJS
import Link from "next/link";

const StickyNote = ({ post }) => {
    return (
        <Link href={`/blog/${post._id}`}>
            <a className={styles["sticky-note"]}>
                <div className={styles.tape} />
                <h5 className={styles["note-title"]}>{post.title}</h5>
                <p className={styles["note-body"]}>{post.content[0]}</p>
            </a>
        </Link>
    );
};

export default StickyNote;
