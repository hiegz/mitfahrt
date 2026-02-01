const i18nConfig = {
    /** List of supported locales. */
    locales: ["en", "de"] as const,

    /** Used when no locale matches */
    default: "en",

    /** Header name used to pass the resolved locale to server components. */
    appLocaleHeader: "x-application-locale",

    /** Header name used to pass the resolved system's preferred locale to server components. */
    systemLocaleHeader: "x-system-locale",

    /** Cookie name used to persist the user’s preferred locale. */
    cookie: "NEXT_LOCALE",
} as const;

type Locale = (typeof i18nConfig.locales)[number];

const i18nTypedConfig: {
    locales: readonly Locale[];
    default: Locale;
    appLocaleHeader: string;
    systemLocaleHeader: string;
    cookie: string;
} = i18nConfig;

export default i18nTypedConfig;
