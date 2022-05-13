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
            {[...Array(8)].map((x, i) => (
                <hr
                    className={styles["blue-line"]}
                    style={{ top: `${i * 100 + 100}px` }}
                    key={i}
                />
            ))}
            <div className={styles.container}>
                <Polaroid />
            </div>
            <div className={styles.container}>
                <div id={styles["note-1"]} className={styles["note-container"]}>
                    <StickyNote title="Post #1" />
                </div>
                <div id={styles["note-2"]} className={styles["note-container"]}>
                    <StickyNote title="Post #2" />
                </div>
                <div id={styles["note-3"]} className={styles["note-container"]}>
                    <StickyNote title="Post #3" />
                </div>
            </div>
        </div>
    );
};

export default Home;
