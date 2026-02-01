"server-only";

import { cookies, headers } from "next/headers";
import Locale from "@/types/locale";
import i18nConfig from "@/i18n.config";

export async function getSystemLocale() {
    const locale = (await headers()).get(i18nConfig.systemLocaleHeader);

    if (!locale || i18nConfig.locales.includes(locale as Locale))
        return i18nConfig.default;

    return locale;
}

export async function getAppLocale() {
    const locale = (await headers()).get(i18nConfig.appLocaleHeader);

    if (!locale || i18nConfig.locales.includes(locale as Locale))
        return i18nConfig.default;

    return locale;
}

export async function postUserLocale(locale: Locale) {
    const store = await cookies();
    store.set(i18nConfig.cookie, locale);
    return {};
}

export async function deleteUserLocale() {
    const store = await cookies();
    store.delete(i18nConfig.cookie);
    return {};
}

export async function getTranslations() {
    return (await import(`./locales/${await getAppLocale()}.json`)).default;
}
