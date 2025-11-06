import { oauth2Client } from "@/app/lib/google";
import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";
import { logger } from "@/app/lib/logger";

export async function GET(
    req: NextRequest,
) {
    const code = req.nextUrl.searchParams.get("code")
    const state = req.nextUrl.searchParams.get("state")

    // Parse cookies from the request
    const cookies = cookie.parse(req.headers.get("cookie") || "")
    const sessionState = cookies["session-state"]

    // Validate state parameter to prevent CSRF attacks
    if (!state || !sessionState || state !== sessionState) {
        return NextResponse.json(
            { error: "Invalid state parameter. Possible CSRF attack." },
            { status: 403 }
        )
    }

    // Clear the state cookie after validation
    const clearCookie = cookie.serialize("session-state", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
    })

    if (!code) {
        return NextResponse.json(
            { error: "Authorization code not found" },
            { status: 400 }
        )
    }

    try {
        const { tokens } = await oauth2Client.getToken(code)
        // oauth2Client.setCredentials(tokens)

        const ticket = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token!,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        const payload = ticket.getPayload()
        const userProfile = {
            email: payload?.email,
            name: payload?.name,
            picture: payload?.picture,
            emailVerified: payload?.email_verified,
            sub: payload?.sub,
        }

        console.log("User profile:", userProfile)
        console.log("Has refresh_token:", !!tokens.refresh_token)

        const response = NextResponse.json({
            success: true,
            user: userProfile,
            hasRefreshToken: !!tokens.refresh_token
        }, { status: 200 })

        logger.info('User successfuly login', {
            module: 'api/auth/google/callback/route.ts',
            function: 'GET',
            username: userProfile.name,
            email: userProfile.email
        })

        response.headers.set("Set-Cookie", clearCookie)
        return response

    } catch (error) {
        console.error("Error exchanging code fsor tokens:", error)
        const response = NextResponse.json(
            { error: "Failed to authenticate" },
            { status: 500 }
        )
        logger.error('User failed to login', {
            module: 'api/auth/google/callback/route.ts',
            function: 'GET',
            error: error
        })
        response.headers.set("Set-Cookie", clearCookie)
        return response
    }
}