"use client";

import styles from "./styles.module.css";
import PlusIcon from "@/icons/plus-icon";

const AddButton = () => {
    return (
        <button className={styles["add-button"]}>
            <PlusIcon width={24} strokeWidth={1.5} />
            <span>Add a Ride</span>
        </button>
    );
};

export default AddButton;
