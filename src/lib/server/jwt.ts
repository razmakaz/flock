// import { PRIVATE_JWT_SIGNING_SECRET } from '$env/static/private';
// import jwt, { type Secret } from 'jsonwebtoken';

// const secret: Secret = PRIVATE_JWT_SIGNING_SECRET;

// export const signJWT = async (payload: object) => {
// 	try {
// 		const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; // 30 days

// 		const token = await jwt.sign(
// 			{
// 				...payload,
// 				exp: expiresIn,
// 				iat: Math.floor(Date.now() / 1000) // Issued at
// 			},
// 			secret,
// 			{
// 				algorithm: 'HS256'
// 			}
// 		);

// 		return token;
// 	} catch (error) {
// 		console.error('JWT signing failed:', error);
// 		return null;
// 	}
// };

// export const verifyJWT = async (token: string) => {
// 	try {
// 		const decoded = await jwt.verify(token, secret);
// 		return decoded;
// 	} catch (error) {
// 		console.error('JWT verification failed:', error);
// 		return null;
// 	}
// };

// export const decodeJWT = async (token: string) => {
// 	try {
// 		const decoded = (await jwt.decode(token)) as any;
// 		return decoded;
// 	} catch (error) {
// 		console.error('JWT decoding failed:', error);
// 		return null;
// 	}
// };
