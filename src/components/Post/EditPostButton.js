// Stylesheet
import styles from "@styles/Blog/EditPostButton.module.scss";
// NextJS
import Image from "next/image";

const EditPostButton = ({ onClick }) => {
    return (
        <button
            className={styles["edit-post-button"]}
            type="button"
            onClick={onClick}
        >
            <Image src="/icons/edit.svg" alt="" height={16} width={16} />
        </button>
    );
};

export default EditPostButton;
