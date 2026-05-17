import { Router } from "express";
import { getAllUsers } from "../controllers/admin.controllers.js";
import { validateAdmin, validateUserLoggedIn } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use([validateUserLoggedIn, validateAdmin]);

router.get('/users', getAllUsers);

export default router;
