// Stylesheet
import styles from "@styles/About/About.module.scss";
// NextJS
import Head from "next/head";

const About = () => {
    return (
        <div id={styles.about}>
            <Head>
                <title>About | Vicky Delk&apos;s Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p>This page is a work in progress!</p>
        </div>
    );
};

export default About;
