import * as jwt from 'jsonwebtoken';

const HOUR = 3600;

interface JWTPayload {
  id: string;
}

export async function generateUserToken(
  payload: JWTPayload,
  secret: string,
): Promise<{ accessToken: any }> {
  const accessToken = await getEncodedJWT(payload, secret, {
    subject: 'accessToken',
    expiresIn: 24 * HOUR,
  });
  return {
    accessToken,
  };
}

export const getEncodedJWT = (
  payload: JWTPayload,
  secret: string,
  option: jwt.SignOptions,
): any => {
  return jwt.sign(payload, secret, option);
};

export const getDecodedJWT = (token: string, secret: string): any => {
  return jwt.verify(token, secret);
};
