import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/nodemailer";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    emailVerification: {
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }, _) => {
            console.log("sending email ... ");

            const info = await transporter.sendMail({
                from: "noreply <noreply@hiegz.com>",
                to: user.email,
                subject: "Verify your Email",
                text: `Hi there,

                Thank you for signing up for Mitfahrt.

                Please verify your email address by clicking the link below:
                ${url}

                If you didn't create an account, you can safely ignore this email.

                Cheers,
                Mitfahrt's friendly bot`,
            });

            console.log(info);
        },
    },
});
