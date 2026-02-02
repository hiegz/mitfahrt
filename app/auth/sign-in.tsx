"use client";

import { SyntheticEvent, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Checkbox, { CheckboxHandle } from "@/ui/checkbox";
import CheckIcon from "@/icons/check-icon";
import styles from "./styles.module.css";

// prettier-ignore

const SignIn = () => {
    // Temporarily disables all interactive elements to prevent changes while validating data
    const [disabled, setDisabled] = useState(false);

    // Currently displayed error message
    const [errorMessage, setErrorMessage] = useState("");

    const usernameRef   = useRef<HTMLInputElement>(null);
    const passwordRef   = useRef<HTMLInputElement>(null);
    const rememberMeRef = useRef<CheckboxHandle>(null);

    const onSubmit = async (e: SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setDisabled(true);

        let result;
        const username = usernameRef.current!.value;
        const email = username + "@hochschule-trier.de";
        const password = passwordRef.current!.value;
        const rememberMe = rememberMeRef.current!.checked;

        result = await authClient.signIn.email({
            email,
            password,
            rememberMe,
        });

        if (result.error) {
            setErrorMessage(result.error.message ?? "");
            setDisabled(false);
            return;
        }

        setDisabled(false);
    };

    const onFocus = () => {
        setErrorMessage("");
    };

    const onChange = () => {
        setErrorMessage("");
    };

    return (
        <form className="flex flex-col gap-2">
            <div className="w-full flex items-center gap-3">
                <input
                    ref={usernameRef}
                    type="text"
                    placeholder="Username"
                    disabled={disabled}
                    onFocus={onFocus}
                    onChange={onChange}
                />

                <label className="min-w-1/2">
                    @hochschule-trier.de
                </label>
            </div>

            <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                disabled={disabled}
                onFocus={onFocus}
                onChange={onChange}
            />

            <div className="flex items-center gap-3 my-3">
                <Checkbox ref={rememberMeRef} className={styles["checkbox"]}>
                    <CheckIcon className={styles["check-icon"]} />
                </Checkbox>

                <label>Remember Me?</label>
            </div>

            <button
                type="submit"
                className={styles["button"]}
                onClick={onSubmit}
                disabled={disabled}
            >
                Sign In
            </button>

            <label className={styles["error-message"]}>
                {errorMessage}
            </label>
        </form>
    );
};

export default SignIn;
