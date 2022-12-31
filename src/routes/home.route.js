import express from "express";
import HomeController from "../controllers/HomeController.js";
import ProfileController from "../controllers/user/ProfileController.js";
import accountRoute from "./account.route.js";
import auth from "../middlewares/auth.mdw.js";

const router = express.Router();

router.get("/", HomeController.index);

router.get("/profile", auth, ProfileController.index);
//router.post("/profile", ProfileController.editProfile);
router.get("/profile/learning", ProfileController.getLearning);
router.get("/profile/watchList", ProfileController.getWatchList);

router.use("/", accountRoute);

export default router;
