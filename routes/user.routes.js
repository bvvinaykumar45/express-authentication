import { Router } from "express";
import { login, me, signUp } from "../controllers/user.controller.js";
import db from "../db/index.js";
import { users, userSessions } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

router.get('/', me);

router.post('/signup', signUp);
router.post('/login', login);

export default router;