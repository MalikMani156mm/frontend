import express from 'express';
import { 
    getAllCategories,
    getCategoryById,
    createNewCategory,
    updateCategory,
    deleteCategory
} from '../controllers/CategoryController.js';
import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/Categories').get(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin','Citizen'),getAllCategories);
router.route('/Category/:id').get(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin','Citizen'),getCategoryById);
router.route('/new/Category').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'),createNewCategory);
router.route('/updateCategory/:id').put(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin','Citizen'), updateCategory);
router.route('/deleteCategory/:id').delete(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin','Citizen'), deleteCategory);

export default router;