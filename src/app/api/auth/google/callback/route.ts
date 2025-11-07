import { oauth2Client } from "@/app/lib/google";
import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";
import { logger } from "@/app/lib/logger";
import { insertUser, isUserExists } from "@/app/lib/queries/user";
import { JWTAccessPayload, signAccessToken } from "@/app/lib/jwt";

export async function GET(
    req: NextRequest,
) {
    const code = req.nextUrl.searchParams.get("code")
    const state = req.nextUrl.searchParams.get("state")

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

        // Validate tokens exist
        if (!tokens.id_token) {
            return NextResponse.json(
                { error: "No ID token received from Google" },
                { status: 400 }
            )
        }

        const ticket = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        const payload = ticket.getPayload()

        // Validate required user data exists
        if (!payload?.email || !payload?.name) {
            return NextResponse.json(
                { error: "Incomplete user information from Google" },
                { status: 400 }
            )
        } const userProfile = {
            email: payload.email,
            name: payload.name,
            picture: payload.picture || "",
            emailVerified: payload.email_verified || false,
            sub: payload.sub || "",
        }

        // Check if user exists
        const accountExist = await isUserExists(userProfile.email)

        if (!accountExist) {
            // New user - refresh_token is required
            if (!tokens.refresh_token) {
                return NextResponse.json(
                    { error: "No refresh token received. Please re-authorize." },
                    { status: 400 }
                )
            }

            const userInfo = await insertUser(
                userProfile.name,
                userProfile.email,
                tokens.refresh_token
            )
        }

        // Create JWT access token and set session cookie
        const jwtAccessPayload: JWTAccessPayload = {
            userEmail: userProfile.email,
            userName: userProfile.name
        }

        const sessionCookie = cookie.serialize("session", signAccessToken(jwtAccessPayload), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60, // 1 hour
            path: "/",
        })
        const response = NextResponse.json({
            message: "Authentication successful",
            success: true,
        }, { status: 200 })

        logger.info('User successfuly login', {
            module: 'api/auth/google/callback/route.ts',
            function: 'GET',
            username: userProfile.name,
            email: userProfile.email
        })

        response.headers.set("Set-Cookie", clearCookie)
        response.headers.append("Set-Cookie", sessionCookie)
        return response

    } catch (error) {
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