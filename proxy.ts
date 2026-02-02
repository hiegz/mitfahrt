import { NextRequest, NextResponse } from "next/server";
import { resolveUserLocale, resolveSystemLocale } from "@/i18n/resolver";
import { auth } from "@/lib/auth";
import i18nConfig from "@/i18n.config";

export default async function proxy(request: NextRequest) {
    const url = new URL(request.url);
    const path = url.pathname;
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session && path !== "/auth") {
        return NextResponse.redirect(new URL("/auth", request.url));
    }

    if (session && path === "/auth") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const systemLocale = resolveSystemLocale(request.headers);
    const userLocale = resolveUserLocale(request.cookies);
    const appLocale = userLocale ?? systemLocale ?? i18nConfig.default;

    return NextResponse.next({
        headers: {
            [i18nConfig.appLocaleHeader]: appLocale,

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
