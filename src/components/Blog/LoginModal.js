// Stylesheet
import styles from "@styles/Blog/LoginModal.module.scss";
// React
import { useState } from "react";

const LoginModal = ({ open, onClose }) => {
    // Stops click on content from closing modal
    const contentClick = (e) => {
        e.stopPropagation();
    };

    // Form input data
    const [password, setPassword] = useState("");
    const updatePassword = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div
            id={styles["login-modal"]}
            className={open ? styles["show-overlay"] : ""}
            onClick={onClose}
        >
            <form id={styles["login-modal-content"]} onClick={contentClick}>
                <h2 id={styles["login-header"]}>Enter password</h2>
                <input
                    id={styles["login-input"]}
                    type="password"
                    value={password}
                    onChange={updatePassword}
                />
                <input id={styles["login-button"]} type="submit" />
            </form>
        </div>
    );
};

export default LoginModal;
