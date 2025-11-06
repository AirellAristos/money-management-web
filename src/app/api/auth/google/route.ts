import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import * as cookie from "cookie";
import { oauth2Client, scopes } from "@/app/lib/google";

export async function GET(
    req: NextRequest,
) {
    const state = crypto.randomBytes(32).toString("hex")

    const cookieHeader = cookie.serialize("session-state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 300,
        path: "/",
    })

    const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        include_granted_scopes: true,
        state,
    })

    const res = NextResponse.redirect(authorizationUrl)
    res.headers.set("Set-Cookie", cookieHeader)
    return res
}

