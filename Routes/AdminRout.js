import express from 'express';
import { getAllTestResults,} from '../Controllers/AdminController.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import{signin,login,logout,verifyAdminCode} from '../Controllers/AuthController.js';
const router = express.Router();

router.get('/all-users', verifyAdmin); // Protected route for admin only
router.get('/test-results', getAllTestResults);
router.post("/signin", signin);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-admin", verifyAdminCode); // New route for admin verification
export default router;