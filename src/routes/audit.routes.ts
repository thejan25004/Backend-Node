import {Router} from "express";
import {getAudits} from "../controller/audit.controller";
import {authenticateToken} from "../middlewares/authentication";

const auditRoutes = Router();

auditRoutes.get("/", authenticateToken, getAudits)

export default auditRoutes;