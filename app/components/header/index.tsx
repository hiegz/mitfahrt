import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import styles from "./styles.module.css";
import LogOutButton from "@/components/logout-button";
import LogOutIcon from "@/icons/logout-icon";

const Header = async () => {
    const { session } = (await auth.api.getSession({
        headers: await headers(),
    })) ?? { session: null };

    return (
        session && (
            <header className={styles["header"]}>
                <h1 className={styles["logo"]}>mitfahrt</h1>
                <LogOutButton
                    token={session.token}
                    className={styles["logout-button"]}
                >
                    <LogOutIcon width={24} strokeWidth={1.5} /> Log Out
                </LogOutButton>
            </header>
        )
    );
};

export default Header;
