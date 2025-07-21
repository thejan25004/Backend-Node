// // src/controllers/auth.controller.ts
// import {NextFunction, Request, Response} from 'express';
// import { UserModel } from '../models/User';
// import bcrypt from 'bcryptjs';
// import jwt, {JsonWebTokenError, JwtPayload, TokenExpiredError} from 'jsonwebtoken';
// import {APIError} from "../errors/ApiError";
//
// const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
//
// // Constants for token expiration
// const ACCESS_TOKEN_EXPIRATION = "5m"
// const REFRESH_TOKEN_EXPIRATION = "7d"
//
// // Helper to create Access Token
// const createAccessToken = (userId: any, role: string) => {
//     return jwt.sign({ id: userId.toString(), role: role }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: ACCESS_TOKEN_EXPIRATION })
// }
//
// // Helper to create Refresh Token
// const createRefreshToken = (userId: any, role: string) => {
//     return jwt.sign({id: userId.toString(), role: role}, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: REFRESH_TOKEN_EXPIRATION})
// }
//
// export const login = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { email, password } = req.body;
//
//         const user = await UserModel.findOne({ email })
//         if (!user) {
//             return next(new APIError(401, "Invalid email"))
//         }
//
//         const isMatch = await bcrypt.compare(password, user.password)
//         if (!isMatch) {
//             return next(new APIError(401, "Invalid password"))
//         }
//
//         // const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
//         //     expiresIn: '1h',
//         // });
//         //
//         // res.json({ token });
//
//         // Create tokens
//         const accessToken = createAccessToken(user._id, user.role)
//         const refreshToken = createRefreshToken(user._id, user.role)
//
//         const isProduction = process.env.NODE_ENV === "production"
//         res.cookie("refreshToken", refreshToken, {
//             httpOnly: true,
//             secure: isProduction, // Secure only in production
//             sameSite: isProduction ? "strict" : "lax",
//             maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
//             path: "/api/auth/refresh-token", // restrict cookie to refresh token route
//         })
//
//         // Send access token in response
//         res.status(200).json({
//             accessToken,
//             user: {
//                 _id: user._id,
//                 email: user.email,
//             },
//         })
//     } catch (error) {
//         next(error);
//     }
// };
//
// export const register = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { email, password, role } = req.body;
//
//         const existingUser = await UserModel.findOne({ email })
//         if (existingUser) {
//             return next(new APIError(409, "Email already in use"))
//         }
//
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new UserModel({ email, password: hashedPassword, role });
//
//         await user.save();
//
//         res.status(201).json({ message: 'User registered' });
//     } catch (error) {
//         next(error);
//         // res.status(400).json({ error: 'Registration failed' });
//     }
// };
//
// // REFRESH TOKEN - issue new access token
// export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = req.cookies?.refreshToken;
//
//         if (!token) {
//             return next(new APIError(401, "Refresh token missing"));
//         }
//
//         jwt.verify(
//             token,
//             process.env.REFRESH_TOKEN_SECRET!,
//             async (err: Error | null, decoded: string | JwtPayload | undefined) => {
//                 if (err) {
//                     if (err instanceof TokenExpiredError) {
//                         return next(new APIError(401, "Refresh token expired"));
//                     } else if (err instanceof JsonWebTokenError) {
//                         return next(new APIError(401, "Invalid refresh token"));
//                     } else {
//                         return next(new APIError(401, "Could not verify refresh token"));
//                     }
//                 }
//
//                 // 🔥 FIXED: Decode `id` and `role` from token
//                 if (!decoded || typeof decoded === "string") {
//                     return next(new APIError(401, "Invalid refresh token payload"));
//                 }
//
//                 const { id, role } = decoded as JwtPayload;
//                 const user = await UserModel.findById(id);
//
//                 if (!user) {
//                     return next(new APIError(401, "User not found"));
//                 }
//
//                 const newAccessToken = createAccessToken(user._id, role);
//                 res.status(200).json({ accessToken: newAccessToken });
//             }
//         );
//     } catch (err) {
//         next(err);
//     }
// };
//
// // LOGOUT - Clear refresh token cookie
// export const logout = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const isProduction = process.env.NODE_ENV === "production"
//
//         // Clear the refresh token cookie by setting it to empty and expired
//         res.cookie("refreshToken", "", {
//             httpOnly: true,
//             secure: isProduction,
//             sameSite: isProduction ? "strict" : "lax",
//             expires: new Date(0), // Set cookie expiration to past date
//             path: "/api/auth/refresh-token", // Same path as when set
//         })
//
//         res.status(200).json({ message: "Logged out successfully" })
//     } catch (err) {
//         next(err)
//     }
// }