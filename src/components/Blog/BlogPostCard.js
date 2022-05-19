// Stylesheet
import styles from "@styles/Blog/BlogPostCard.module.scss";
// NextJS
import Link from "next/link";
import Image from "next/image";

const BlogPostCard = ({ post }) => {
    // Format timestamp to MM/DD/YYYY
    const formatDate = () => {
        let date = new Date(post.timestamp);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, "0");
        let day = date.getDate().toString().padStart(2, "0");
        return month + "/" + day + "/" + year;
    };

    return (
        <Link href={`/blog/${post._id}`}>
            <div className={styles["blog-post-card"]}>
                <div className={`${styles.tape} ${styles["top-tape"]}`} />
                <div className={`${styles.tape} ${styles["bottom-tape"]}`} />
                <div className={styles["post-header"]}>
                    <h3 className={styles["post-title"]}>{post.title}</h3>
                    <p className={styles["post-timestamp"]}>{formatDate()}</p>
                </div>
                <div className={styles["post-body"]}>
                    <div className={styles["post-image"]}>
                        <Image
                            src="/images/profile.JPG"
                            alt=""
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <p className={styles["post-content"]}>{post.content[0]}</p>
                </div>
            </div>
        </Link>
    );
};

export default BlogPostCard;
