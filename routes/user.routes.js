import { Router } from "express";
import { login, me, signUp } from "../controllers/user.controller.js";

const router = Router();

router.get('/', me);

router.post('/signup', signUp);
router.post('/login', login);

export default router;