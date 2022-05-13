// Stylesheet
import styles from "@styles/Home/Polaroid.module.scss";
// NextJS
import Image from "next/image";

const Polaroid = () => {
    return (
        <div id={styles.polaroid}>
            <div id={styles.tape} />
            <div id={styles["polaroid-image"]}>
                <Image
                    src="/images/profile.JPG"
                    alt=""
                    height={360}
                    width={360}
                    layout="responsive"
                    objectFit="cover"
                />
            </div>
            <p id={styles["polaroid-caption"]}>Hi, I&apos;m Vicky!</p>
        </div>
    );
};

export default Polaroid;
