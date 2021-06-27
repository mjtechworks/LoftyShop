import asyncHandler from "express-async-handler"
import User from "../db/userSchema.js"
import generateToken from "../utils/token.js"
import Vendor from "../db/vendorSchema.js"
import Product from "../db/productSchema.js"
import Order from "../db/orderSchema.js"

// @desc login users
// @route POST api/user/login
// @access public
const userLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		res.status(200).json({
			name: user.name,
			_id: user._id,
			email: user.email,
			isVendor: user.isVendor,
			vendor: user.vendor,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		throw new Error("Invalid Email or Password")
	}
})

// @desc sign up users
// @route POST api/user/register
// @access public
const userRegister = asyncHandler(async (req, res) => {
	const { name, email, password, isAdmin } = req.body

	const user = await User.findOne({ email })

	if (!user) {
		const newUser = await User.create({ name, email, password, isAdmin })

		res.status(200).json({
			name: newUser.name,
			_id: newUser._id,
			email: newUser.email,
			isVendor: newUser.isVendor,
			vendor: newUser.vendor,
			isAdmin: newUser.isAdmin,
			password: newUser.password,
			token: generateToken(newUser._id),
		})
	} else {
		throw new Error("Email already in use")
	}
})

// @desc get all users
// @route GET api/user/all/users
// @access admin
const getAllUsers = asyncHandler(async (req, res) => {
	const { currentPage } = req.query

	const pagelimit = 10

	const skip = (+currentPage - 1) * pagelimit

	const users = await User.find()
		.skip(skip)
		.limit(pagelimit)
		.select("-password")
		.populate("vendor", "companyName")
		.sort({ createdAt: "desc" })
	const numberOfUsers = await User.countDocuments()

	const totalPages = Math.ceil(numberOfUsers / pagelimit)

	res.status(200).json({ users, totalPages, currentPage })
})

// @desc get a user details
// @route GET api/user/single/user
// @access user
const getAUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select("-password")
	if (user.isVendor) {
		await Vendor.populate(user, { path: "vendor" })
	}

	if (!user) {
		res.status(404)
		throw new Error("User does not exist")
	} else {
		res.status(200).json(user)
	}
})

// @desc edit a user
// @route PUT api/user/register
// @access user
const editAUser = asyncHandler(async (req, res) => {
	const { vendor, name, email, password } = req.body
	const user = await User.findById(req.user._id)

	let updatedUser
	if (user) {
		if (user.isVendor) {
			const vendors = await Vendor.findById(user.vendor)

			if (vendors) {
				vendors.socialMedia = vendor.socialMedia
				vendors.companyName = vendor.companyName
				vendors.image = vendor.image
				vendors.contactInfo = vendor.contactInfo

				await vendors.save()
			} else {
				res.status(404)
				throw new Error("Vendor does not exist")
			}
		}
		user.name = name
		user.email = email
		if (password) user.password = password

		updatedUser = await user.save()
		await updatedUser.populate({ path: "vendor" })

		res.status(200).json({ updatedUser, message: "successfully updated user" })
	} else {
		res.status(404)
		throw new Error("User does not exist")
	}
})

// @desc get a user
// @route GET api/user/admin/user
// @access admin
const getAUserAdmin = asyncHandler(async (req, res) => {
	const { id } = req.query

	const user = await User.findById(id).select("-password")

	if (!user) {
		res.status(404)
		throw new Error("User does not exist")
	} else {
		if (user.isVendor) {
			await Vendor.populate(user, { path: "vendor" })
		}

		res.status(200).json(user)
	}
})

// @desc delete a user
// @route DELETE api/user/register
// @access admin
const deleteAUserAdmin = asyncHandler(async (req, res) => {
	const { id } = req.query

	const user = await User.findById(id)

	if (!user) {
		res.status(404)
		throw new Error("User does not exist")
	} else {
		if (user.isVendor) {
			const vendor = await Vendor.deleteMany({ _id: user.vendor })
			await Product.deleteMany({ vendor: user.vendor })
			await Order.deleteMany({ user: user._id })
		}

		await user.remove()

		res.status(200).json({ message: "done" })
	}
})

export {
	userLogin,
	userRegister,
	getAllUsers,
	getAUser,
	editAUser,
	getAUserAdmin,
	deleteAUserAdmin,
}
