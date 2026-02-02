"use client";

import { ButtonHTMLAttributes, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type SessionProps = {
    token: string;
};

type LogOutButtonProps = SessionProps & ButtonHTMLAttributes<HTMLButtonElement>;

const LogOutButton = (props: LogOutButtonProps) => {
    const { token, onClick, disabled: shouldBeDisabled, ...rest } = props;
    const [isDisabled, setIsDisabled] = useState(false);
    const disabled = shouldBeDisabled ?? isDisabled;
    const router = useRouter();

    return (
        <button
            onClick={async () => {
                setIsDisabled(true);
                await authClient.revokeSession({ token });
                setIsDisabled(false);
                router.refresh();
            }}
            disabled={disabled}
            {...rest}
        />
    );
};

export default LogOutButton;
