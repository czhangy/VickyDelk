// Stylesheet
import styles from "@styles/Post/ImageElement.module.scss";
// Local component
import DeleteElementButton from "@components/Post/DeleteElementButton.js";
// NextJS
import Image from "next/image";
// React
import { useRef } from "react";

const ImageElement = ({ ind, onUpdate, onDelete }) => {
    // Declare ref for data access
    const imgUpload = useRef();

    // Update when image is selected
    const handleUpdate = () => {
        // Update current display
        document.getElementById(`preview-${ind}`).src = URL.createObjectURL(
            imgUpload.current.files[0]
        );
        // Propagate data to parent
        onUpdate(ind, imgUpload.current.files[0]);
    };

    return (
        <div className={styles["image-element"]}>
            <div
                className={`${styles["image-container"]} ${
                    imgUpload.current && imgUpload.current.files.length > 0
                        ? ""
                        : styles["hide"]
                }`}
            >
                <Image
                    id={`preview-${ind}`}
                    src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
                    alt=""
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div
                className={`${styles["upload-container"]} ${
                    imgUpload.current && imgUpload.current.files.length > 0
                        ? styles["hide"]
                        : ""
                }`}
            >
                <Image src="/icons/upload.svg" alt="" height={50} width={50} />
                <label className={styles["upload-button"]}>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleUpdate}
                        ref={imgUpload}
                    />
                    Choose a Photo
                </label>
            </div>
            <DeleteElementButton onClick={() => onDelete(ind)} />
        </div>
    );
};

export default ImageElement;
