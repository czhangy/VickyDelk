// NextJS
import Head from "next/head";
// Stylesheet
import styles from "../styles/Home/Home.module.scss";

const Home = () => {
    return (
        <div id={styles.home}>
            <Head>
                <title>Home | Vicky Delk&apos;s Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    );
};

export default Home;
