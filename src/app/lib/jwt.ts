import jwt from "jsonwebtoken";

export interface JWTAccessPayload {
    userEmail: string
    userName: string
}

export interface JWTRefreshPayload {
    userEmail: string
    userID: string
    iat?: number
    exp?: number
}

function signAccessToken(accessPayload: JWTAccessPayload) {
    return jwt.sign(
        accessPayload,
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    )

}

function signRefreshToken(refreshPayload: JWTRefreshPayload) {
    return jwt.sign(
        refreshPayload,
        process.env.JWT_SECRET!,
        { expiresIn: '30d' }
    )
}

function verifyAccessToken(accessToken: string) {
    return jwt.verify(
        accessToken,
        process.env.JWT_SECRET!
    )
}

function verifyRefreshToken(refreshToken: string) {
    return jwt.verify(
        refreshToken,
        process.env.JWT_SECRET!
    )
}

export { signAccessToken }