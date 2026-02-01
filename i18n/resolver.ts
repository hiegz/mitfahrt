import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

import Negotiator from "negotiator";
import Locale from "@/types/locale";
import i18nConfig from "@/i18n.config";

/**
 * Determines the client's preferred locale.
 *
 * @param cookies - The request cookies to inspect.
 * @returns The resolved locale.
 */
export function resolveUserLocale(cookies: RequestCookies): Locale | undefined {
    const locale = cookies.get(i18nConfig.cookie)?.value;
    if (!i18nConfig.locales.includes(locale as Locale)) return undefined;
    return locale as Locale;
}

/**
 * Determines the system's preferred locale.
 *
 * @param headers - The request headers to inspect.
 * @returns The resolved locale.
 */
export function resolveSystemLocale(headers: Headers): Locale | undefined {
    const acceptLanguage = headers.get("accept-language");
    const locales = new Negotiator({
        headers: { "accept-language": acceptLanguage ?? undefined },
    }).languages();

    for (const locale of locales) {
        if (i18nConfig.locales.includes(locale as Locale)) {
            return locale as Locale;
        }
    }

    return undefined;
}
