import {Router} from "express";
import {changePassword, getAllUsers, login, logout, refreshToken, register} from "../controller/auth.controller";
import {authenticateToken} from "../middlewares/authentication";

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.post("/refresh-token", refreshToken);
authRoutes.post("/logout", logout);
authRoutes.post("/changePassword", authenticateToken, changePassword);
authRoutes.get("/", authenticateToken, getAllUsers)

export default authRoutes;