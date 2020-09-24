import express from 'express';
import BookController from '../controllers/bookController';
import AuthController from '../controllers/userController';
import { 
    Authenticate, 
    verifyAdmin 
} from '../middleware/middleware';

// defining middleware routes
const router = express.Router();

// Users routes
router.post('/api/auth/signup', AuthController.signup);
router.post('/api/auth/login', AuthController.login);

// Books routes
router.post('/api/auth/book/', Authenticate, verifyAdmin, BookController.addBook);
router.get('/api/auth/books/', Authenticate, BookController.getAllBooks);
router.get('/api/auth/book/:id', Authenticate, BookController.getOneBook); 
router.put('/api/auth/book/:id', Authenticate, BookController.updateBook);
router.delete('/api/auth/book/:id', Authenticate, verifyAdmin, BookController.deleteBook);

export default router;
