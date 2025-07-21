import {Router} from "express";
import {login, logout, refreshToken, register} from "../controller/auth.controller";

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.post("/refresh-token", refreshToken);
authRoutes.post("/logout", logout);

export default authRoutes;