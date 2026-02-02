"use client";

import { useState } from "react";

import SignIn from "./sign-in";
import SignUp from "./sign-up";
import styles from "./styles.module.css";

const views = ["sign-in", "sign-up"] as const;

type View = (typeof views)[number];

const formatView = (v: View) =>
    v.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

const Form = () => {
    const [view, setView] = useState<View>("sign-in");

    return (
        <div className={styles["tab-view"]}>
            <div className={styles["tab-selection"]}>
                {views.map((v, i) => (
                    <button
                        key={i}
                        onClick={() => setView(v)}
                        data-state={view === v ? "selected" : "unselected"}
                    >
                        {formatView(v)}
                    </button>
                ))}
            </div>

            <div className={styles["tab"]}>
                {view === "sign-in" && <SignIn />}
                {view === "sign-up" && <SignUp />}
            </div>
        </div>
    );
};

export default Form;
