// Stylesheet
import styles from "@styles/Home/Polaroid.module.scss";
// NextJS
import Image from "next/image";

const Polaroid = () => {
    return (
        <div id={styles.polaroid}>
            <div id={styles.tape} />
            <Image
                src="/images/profile.JPG"
                alt=""
                height={360}
                width={360}
                objectFit="cover"
            />
            <p id={styles["polaroid-caption"]}>Hi, I&apos;m Vicky!</p>
        </div>
    );
};

export default Polaroid;
