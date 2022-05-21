// Stylesheet
import styles from "@styles/Resume/Resume.module.scss";
// NextJS
import Head from "next/head";

const Resume = () => {
    return (
        <div id={styles.resume}>
            <Head>
                <title>Resume | Vicky Delk&apos;s Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p>This page is a work in progress!</p>
        </div>
    );
};

export default Resume;
