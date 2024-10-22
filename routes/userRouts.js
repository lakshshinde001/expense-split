import { registerUser, loginUser, logout, getUserDetails, getAllUsers } from "../controllers/user.controller.js";

import express from 'express'
import isAuthenticated from "../middlewares/isAuthenticated.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/getuserdetails").get(isAuthenticated, getUserDetails);
router.route("/getallusers").get(isAuthenticated, getAllUsers);

export default router
