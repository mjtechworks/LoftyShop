import { Router } from "express"
import {
	vendorRegister,
	confirmEmail,
	confirmCompanyName,
} from "../controllers/vendorController.js"

const router = Router()

router.post("/register", vendorRegister)
router.get("/register/email/:email", confirmEmail)
router.get("/register/company/:companyName", confirmCompanyName)

export default router
