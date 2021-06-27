import { Router } from "express"
import {
	userLogin,
	userRegister,
	getAllUsers,
	getAUser,
	editAUser,
	getAUserAdmin,
	deleteAUserAdmin,
} from "../controllers/userController.js"
import { protect, admin } from "../auth/auth.js"

const router = Router()

router.post("/login", userLogin)

router
	.route("/register")
	.post(userRegister)
	.put(protect, editAUser)
	.delete(protect, admin, deleteAUserAdmin)

router.get("/all/users", protect, admin, getAllUsers)

router.get("/single/user", protect, getAUser)

router.get("/admin/user", protect, admin, getAUserAdmin)

export default router
