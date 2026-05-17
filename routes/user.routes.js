import { Router } from "express";
import { login, me, signUp, updateUserName } from "../controllers/user.controllers.js";
import { validateUserLoggedIn } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get('/', validateUserLoggedIn, me);
router.patch('/', validateUserLoggedIn, updateUserName)

router.post('/signup', signUp);
router.post('/login', login);

export default router;