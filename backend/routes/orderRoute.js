import { Router } from "express"
import {
	saveOrder,
	getOrder,
	getAllOrders,
	getAllAdminOrders,
	markPaidAdmin,
	markDeliveredAdmin,
} from "../controllers/orderController.js"
import { protect, admin, user } from "../auth/auth.js"

const router = Router()

router.post("/save/order", protect, user, saveOrder)

router.get("/all/orders", protect, getAllOrders)

router.get("/all/admin/orders", protect, admin, getAllAdminOrders)

router
	.route("/:id")
	.get(protect, getOrder)
	.post(protect, admin, markPaidAdmin)
	.put(protect, admin, markDeliveredAdmin)

export default router
