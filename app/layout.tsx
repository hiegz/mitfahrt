import "./global.css";

import { ReactNode } from "react";
import { getAppLocale, getSystemLocale, getTranslations } from "@/i18n/server";
import { TranslationProvider } from "@/i18n/client";

type Props = {
    children: ReactNode;
};

const Providers = async ({ children }: Props) => {
    const systemLocale = await getSystemLocale();
    const appLocale = await getAppLocale();
    const translations = await getTranslations();

    return (
        <TranslationProvider
            systemLocale={systemLocale}
            appLocale={appLocale}
            translations={translations}
        >
            {children}
        </TranslationProvider>
    );
};

export default async function Layout({ children }: Props) {
    return (
        <html>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
