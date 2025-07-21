import {Router} from "express";
import {getLendingHistory, getOverdueBooks, lendBook, returnBook} from "../controller/lending.controller";
import {authenticateToken} from "../middlewares/authentication";

const lendingRoutes = Router();
lendingRoutes.use(authenticateToken);

lendingRoutes.post('/lend', lendBook);
lendingRoutes.post('/return/:id', returnBook);
lendingRoutes.get('/history', getLendingHistory);
lendingRoutes.get('/overdue', getOverdueBooks);

export default lendingRoutes;