// Stylesheet
import styles from "@styles/Post/DeleteElementButton.module.scss";
// NextJS
import Image from "next/image";

const DeleteElementButton = ({ ind, onClick }) => {
    return (
        <button
            className={styles["delete-element-button"]}
            type="button"
            onClick={() => onClick(ind)}
        >
            <Image src="/icons/delete.svg" alt="" height={16} width={16} />
        </button>
    );
};

export default DeleteElementButton;
