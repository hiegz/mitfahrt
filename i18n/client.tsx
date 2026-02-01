"use client";

import { useContext, createContext, ReactNode } from "react";

export const TranslationContext = createContext(
    {} as {
        systemLocale?: string | undefined;
        appLocale: string;
        translations: any;
    },
);

export type Props = {
    children: ReactNode;
    systemLocale?: string | undefined;
    appLocale: string;
    translations: any;
};

export function TranslationProvider({
    children,
    systemLocale,
    appLocale,
    translations,
}: Props) {
    return (
        <TranslationContext.Provider
            value={{ systemLocale, appLocale, translations }}
        >
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslationContext() {
    return useContext(TranslationContext)!;
}
