import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../db/userSchema.js"

const protect = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		try {
			token = req.headers.authorization.split(" ")[1]

			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.user = await User.findById(decoded.id).select("-password")

			next()
		} catch (error) {
			res.status(401)
			throw new Error("Not authorized, token failed")
		}
	}
	if (!token) {
		res.status(401)
		throw new Error("Not authorized, token failed")
	}
})

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		res.status(401)
		throw new Error("Not authorized, not an admin")
	}
}

const vendor = (req, res, next) => {
	if (req.user && req.user.isVendor) {
		next()
	} else {
		res.status(401)
		throw new Error("Not authorized, not a vendor")
	}
}

const vendorAdmin = (req, res, next) => {
	if (req.user && (req.user.isAdmin || req.user.isVendor)) {
		next()
	} else {
		res.status(401)
		throw new Error("Not authorized, not an admin or a vendor")
	}
}

const user = (req, res, next) => {
	if (req.user && !(req.user.isAdmin || req.user.isVendor)) {
		next()
	} else {
		res.status(401)
		throw new Error("Only a regular user is allowed")
	}
}

export { protect, admin, vendor, vendorAdmin, user }
