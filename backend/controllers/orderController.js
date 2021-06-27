import asynHandler from "express-async-handler"
import Order from "../db/orderSchema.js"
import User from "../db/userSchema.js"
import Product from "../db/productSchema.js"

// @desc create a new order
// @route POST /api/order/save/order
// @access public
const saveOrder = asynHandler(async (req, res) => {
	const { orders, contactInfo, totalPrice, shippingFee } = req.body

	const order = await Order.create({
		user: req.user._id,
		contactInfo,
		orders,
		totalPrice,
		shippingFee,
	})

	orders.forEach(async (item) => {
		let product = await Product.findById(item.product)
		product.countInStock = Number(product.countInStock) - Number(item.qty)
		await product.save()
	})

	res.status(200).json(order)
})

// @desc get an order
// @route GET /api/order/:id
// @access public
const getOrder = asynHandler(async (req, res) => {
	const { id } = req.params
	const order = await Order.findById(id)
	await User.populate(order, { path: "user" })
	if (!order) {
		res.status(404)
		throw new Error("Order does not exist")
	} else {
		res.status(200).json(order)
	}
})

// @desc get all orders
// @route GET /api/order/all/orders
// @access public
const getAllOrders = asynHandler(async (req, res) => {
	const { currentPage } = req.query

	const pagelimit = 10

	const skip = (+currentPage - 1) * pagelimit

	const order = await Order.find({ user: req.user._id })
		.skip(skip)
		.limit(pagelimit)
		.sort({ createdAt: "desc" })
	await User.populate(order, { path: "user", select: "name" })
	const numberOfOrders = await Order.countDocuments({ user: req.user._id })

	const totalPages = Math.ceil(numberOfOrders / pagelimit)

	res.status(200).json({ order, totalPages, currentPage })
})

// @desc get all admin orders
// @route GET /api/order/all/admin/orders
// @access public
const getAllAdminOrders = asynHandler(async (req, res) => {
	const { currentPage } = req.query

	const pagelimit = 10

	const skip = (+currentPage - 1) * pagelimit

	const order = await Order.find().skip(skip).limit(pagelimit).sort({ createdAt: "desc" })
	await User.populate(order, { path: "user", select: "name" })
	const numberOfOrders = await Order.countDocuments()

	const totalPages = Math.ceil(numberOfOrders / pagelimit)

	res.status(200).json({ order, totalPages, currentPage })
})

// @desc mark an order as paid
// @route POST /api/order/:id
// @access admin
const markPaidAdmin = asynHandler(async (req, res) => {
	const { id } = req.params
	const {
		paymentMethod,
		status,
		update_time,
		payer,
		id: payId,
		reference,
		email_address,
	} = req.body
	// 	message: "Approved",
	// 	reference: "1624441450015",
	// 	status: "success",
	// 	trans: "1186152993",
	// 	transaction: "1186152993",
	// 	trxref: "1624441450015"

	const order = await Order.findById(id)
	if (!order) {
		res.status(404)
		throw new Error("Order does not exist")
	} else {
		order.paymentMethod = paymentMethod ? paymentMethod : "Paid On Delivery"
		order.isPaid = true
		order.paidAt = Date.now()

		if (order.paymentMethod !== "Paid On Delivery") {
			order.paymentResult = {
				id: paymentMethod === "Paypal" ? payId : reference,
				status: status,
				update_time:
					paymentMethod === "Paypal" ? update_time : new Date(+reference).toISOString(),
				email_address: paymentMethod === "Paypal" ? payer.email_address : email_address,
			}
		}

		const updatedOrder = await order.save()
		res.status(200).json(updatedOrder)
	}
})

// @desc mark an order as delivered
// @route PUT /api/order/:id
// @access admin
const markDeliveredAdmin = asynHandler(async (req, res) => {
	const { id } = req.params
	const order = await Order.findById(id)
	if (!order) {
		res.status(404)
		throw new Error("Order does not exist")
	} else {
		order.isDelivered = true
		order.deliveredAt = Date.now()

		const updatedOrder = await order.save()
		res.status(200).json(updatedOrder)
	}
})

export { saveOrder, getOrder, getAllOrders, getAllAdminOrders, markPaidAdmin, markDeliveredAdmin }
