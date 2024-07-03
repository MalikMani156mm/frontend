import express from 'express';
import { 
    getAllCategories,
    getCategoryById,
    createNewCategory,
    updateCategory,
    deleteCategory
} from '../controllers/CategoryController.js';
// import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/Categories').get(getAllCategories);
router.route('/Category/:id').get(getCategoryById);
router.route('/new/Category').post(createNewCategory);
router.route('/updateCategory/:id').put( updateCategory);
router.route('/deleteCategory/:id').delete( deleteCategory);

export default router;