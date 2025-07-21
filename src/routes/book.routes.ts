import {Router} from "express";
import {createBook, deleteBook, getAllBooks, updateBook} from "../controller/book.controller";
import {authenticateToken} from "../middlewares/authentication";

const bookRoutes = Router();
bookRoutes.use(authenticateToken);

bookRoutes.get('/', getAllBooks);
bookRoutes.post('/', createBook);
bookRoutes.put('/:id', updateBook);
bookRoutes.delete('/:id', deleteBook);

export default bookRoutes;