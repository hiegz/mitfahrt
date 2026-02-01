import "./global.css";

import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
