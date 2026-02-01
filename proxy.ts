import { NextRequest, NextResponse } from "next/server";
import { resolveUserLocale, resolveSystemLocale } from "@/i18n/resolver";
import i18nConfig from "@/i18n.config";

export default async function proxy(request: NextRequest) {
    const systemLocale = resolveSystemLocale(request.headers);
    const userLocale =
        resolveUserLocale(request.cookies) ??
        systemLocale ??
        i18nConfig.default;

    return NextResponse.next({
        headers: {
            [i18nConfig.appLocaleHeader]: userLocale,

            /** this only includes system locale header if systemLocale is not undefined */
            ...(systemLocale !== undefined && {
                [i18nConfig.systemLocaleHeader]: systemLocale,
            }),
        },
    });
}

export const config = {
    //  Match all pathnames except for
    // - if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - the ones containing a dot (e.g. `favicon.ico`)
    matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
