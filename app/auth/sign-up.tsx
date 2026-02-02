"use client";

import {
    ChangeEvent,
    FocusEvent,
    SyntheticEvent,
    useRef,
    useState,
} from "react";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import styles from "./styles.module.css";

// prettier-ignore

const stages = ["sign-up", "verification"] as const;
type Stage = (typeof stages)[number];

const SignUp = () => {
    const [stage, setStage] = useState<Stage>("sign-up");

    // Temporarily disables all interactive elements to prevent changes while validating data
    const [disabled, setDisabled] = useState(false);

    // Currently displayed error message
    const [errorMessage, setErrorMessage] = useState("");

    const fullnameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const repeatedPasswordRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    // highlights the provided input element
    const highlight = (e: HTMLInputElement) => {
        if (
            e !== fullnameRef.current &&
            e !== usernameRef.current &&
            e !== passwordRef.current &&
            e !== repeatedPasswordRef.current
        ) {
            throw new Error("unreachable");
        }

        e.classList.add(styles["highlighted"]);
    };

    // removes highlighting for the provided input element
    const mute = (e: HTMLInputElement) => {
        if (
            e !== fullnameRef.current &&
            e !== usernameRef.current &&
            e !== passwordRef.current &&
            e !== repeatedPasswordRef.current
        ) {
            throw new Error("unreachable");
        }

        e.classList.remove(styles["highlighted"]);
    };

    const onSubmit = async (e: SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setDisabled(true);

        let result;
        const fullname = fullnameRef.current!.value;
        const username = usernameRef.current!.value;
        const email = username + "@hochschule-trier.de";
        const password = passwordRef.current!.value;
        const repeatedPassword = repeatedPasswordRef.current!.value;

        if (password !== repeatedPassword) {
            highlight(passwordRef.current!);
            highlight(repeatedPasswordRef.current!);
            setErrorMessage("Passwords do not match");
            setDisabled(false);
            return;
        }

        result = await authClient.signUp.email({
            name: fullname,
            email,
            password,
        });

        if (result.error) {
            setErrorMessage(result.error.message ?? "");
            setDisabled(false);
            return;
        }

        setStage("verification");
        setDisabled(false);

        router.replace("/");
        router.refresh();
    };

    const onFocus = (e: FocusEvent<HTMLInputElement>) => {
        mute(e.target);
        setErrorMessage("");
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        mute(e.target);
        setErrorMessage("");
    };

    switch (stage) {
        case "sign-up":
            return (
                <form className="flex flex-col gap-2">
                    <input
                        ref={fullnameRef}
                        type="text"
                        placeholder="Full Name"
                        disabled={disabled}
                        onFocus={onFocus}
                        onChange={onChange}
                    />

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

                    <input
                        ref={repeatedPasswordRef}
                        type="password"
                        placeholder="Repeat Password"
                        autoComplete="new-password"
                        disabled={disabled}
                        onFocus={onFocus}
                        onChange={onChange}
                    />

                    <div className="h-1" />

                    <button
                        type="submit"
                        className={styles["button"]}
                        onClick={onSubmit}
                        disabled={disabled}
                    >
                        Sign Up
                    </button>

                    <label className={styles["error-message"]}>
                        {errorMessage}
                    </label>
                </form>
            );

        case "verification":
            return (
                <p>
                    <strong>Check your email</strong>
                    <br />
                    We've sent you a verification link. Please follow the
                    instructions in the email to finish setting up your account.
                    <br />
                    <br />
                    <button
                        type="button"
                        className={styles["button"]}
                        onClick={() => setStage("sign-up")}
                    >
                        Ok
                    </button>
                </p>
            );
    }
};

export default SignUp;
