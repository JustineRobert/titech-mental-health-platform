import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

export function createAccessToken(payload, env) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.ACCESS_TOKEN_TTL, issuer: 'titech-mental-health' });
}

export function verifyAccessToken(token, env) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, { issuer: 'titech-mental-health' });
}

export function createRefreshToken() {
  return crypto.randomBytes(48).toString('base64url');
}

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
