// Stylesheet
import "@styles/globals.scss";
// Nav components
import Navbar from "@components/Nav/Navbar.js";
import Footer from "@components/Nav/Footer.js";

const MyApp = ({ Component, pageProps }) => {
    return (
        <div id="app">
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </div>
    );
};

export default MyApp;
