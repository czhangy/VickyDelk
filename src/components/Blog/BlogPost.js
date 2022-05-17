// Stylesheet
import styles from "@styles/Blog/BlogPost.module.scss";
// NextJS
import Link from "next/link";
import Image from "next/image";

const BlogPost = ({ post }) => {
    return (
        <Link href={`/blog/${post.id}`}>
            <div className={styles["blog-post"]}>
                <div className={`${styles.tape} ${styles["top-tape"]}`} />
                <div className={`${styles.tape} ${styles["bottom-tape"]}`} />
                <div className={styles["post-header"]}>
                    <h3 className={styles["post-title"]}>{post.title}</h3>
                    <p className={styles["post-timestamp"]}>{post.timestamp}</p>
                </div>
                <hr className={styles.separator} />
                <div className={styles["post-body"]}>
                    <div className={styles["post-image"]}>
                        <Image
                            src="/images/profile.JPG"
                            alt=""
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <p className={styles["post-content"]}>{post.content}</p>
                </div>
            </div>
        </Link>
    );
};

export default BlogPost;
