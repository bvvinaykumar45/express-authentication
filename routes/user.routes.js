import { Router } from "express";
import { login, me, signUp, updateUserName } from "../controllers/user.controller.js";

const router = Router();

router.get('/', me);
router.patch('/', updateUserName)

router.post('/signup', signUp);
router.post('/login', login);

export default router;