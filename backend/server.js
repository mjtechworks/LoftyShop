import express from "express"
import dotenv from "dotenv"
import path from "path"
import db from "./db/config.js"
import cors from "cors"
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoute.js"
import uploadRouter from "./routes/uploadRoute.js"
import vendorRouter from "./routes/VendorRoute.js"
import orderRouter from "./routes/orderRoute.js"

const app = express()

dotenv.config()

db()

app.use(cors())
app.use(express.json())

app.use("/api/product", productRouter)
app.use("/api/user", userRouter)
app.use("/api/vendor", vendorRouter)
app.use("/api/upload", uploadRouter)
app.use("/api/order", orderRouter)

app.get("/api/config/paypal", (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID)
})

app.get("/api/config/paystack", (req, res) => {
	res.send(process.env.PAYSTACK_CLIENT_ID)
})

const __dirname = path.resolve()

app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")))

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	)
}

const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`)
	res.status(404)
	next(error)
}

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode)
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	})
}

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

// app.get("/", async (req, res) => {
// 	const newVendor = await Vendor.create({
// 		name1: "john1",
// 		email1: "tonyxnhs1",
// 		password1: "fngmd1",
// 	})

// 	const newUser = await User.create({
// 		name: "john",
// 		email: "tonyxnhs",
// 		password: "fngmd",
// 		isVendor: true,
// 		vendorId: newVendor._id,
// 	})

// 	if (newUser && newVendor) {
// 		res.status(200).json({ message: "done" })
// 	} else {
// 		throw new Error("Failed to register user")
// 	}
// })

// app.get("/user", async (req, res) => {
// 	let person = await User.findOne({ email: "tonyxnhs" })
// 	if (person.isVendor) {
// 		person = await person.populate("vendorId").execPopulate()
// 	}
// 	res.json(person)
// })

app.listen(process.env.PORT, console.log(`app is listening on ${port}`))
