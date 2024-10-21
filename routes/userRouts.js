import { registerUser, loginUser, logout } from "../controllers/user.controller.js";

import express from 'express'
// import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

export default router
