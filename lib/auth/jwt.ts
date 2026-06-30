import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production"
);

export async function createToken(payload: Record<string, any>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<Record<string, any> | null> {
  try {
    const { payload } = await jwtVerify(token, secret, { clockTolerance: 60 });
    return payload;
  } catch {
    return null;
  }
}

export async function createRefreshToken(payload: Record<string, any>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}