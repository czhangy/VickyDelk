// NextJS
import Head from "next/head";
// Stylesheet
import styles from "@styles/Home/Home.module.scss";
// Local components
import Polaroid from "@components/Home/Polaroid.js";
import StickyNote from "@components/Home/StickyNote.js";

const Home = () => {
    return (
        <div id={styles.home}>
            <Head>
                <title>Home | Vicky Delk&apos;s Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <vr className={styles["red-line"]} />
            {[...Array(16)].map((x, i) => (
                <hr
                    className={styles["blue-line"]}
                    style={{ top: `${i * 100 + 100}px` }}
                    key={i}
                />
            ))}
            <div className={styles.container}>
                <Polaroid />
            </div>
            <div id={styles["recent-posts"]} className={styles.container}>
                <h2 id={styles["recent-posts-header"]}>Recent Posts</h2>
                <StickyNote title="Post #1" />
                <StickyNote title="Post #2" />
                <StickyNote title="Post #3" />
            </div>
        </div>
    );
};

export default Home;
