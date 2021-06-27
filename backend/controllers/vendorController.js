import asyncHandler from "express-async-handler"
import Vendor from "../db/vendorSchema.js"
import User from "../db/userSchema.js"
import generateToken from "../utils/token.js"

//@desc register vendors
//route POST /api/vendors/register
//access public
const vendorRegister = asyncHandler(async (req, res) => {
	const { vendorDetails, companyDetails, socialMedia, contactInfo } = req.body

	const { image, companyName } = companyDetails
	const { name, email, password } = vendorDetails

	const companyUsed = await Vendor.findOne({ companyName })
	const emailUsed = await User.findOne({ email })

	if (companyUsed) {
		throw new Error("company Name is used already")
	}

	if (emailUsed) {
		throw new Error("email is used already")
	}

	const newVendor = await Vendor.create({ companyName, image, socialMedia, contactInfo })

	const newUser = await User.create({
		name,
		email,
		password,
		isVendor: true,
		vendor: newVendor._id,
	})

	res.status(200).json({
		_id: newUser._id,
		name: newUser.name,
		email: newUser.email,
		isVendor: newUser.isvendor,
		vendor: newUser.vendor,
		isAdmin: newUser.isAdmin,
		token: generateToken(newUser._id),
	})
})

//@desc check if email is used
//route GET /api/vendors/register/email/:email
//access public
const confirmEmail = asyncHandler(async (req, res) => {
	const { email } = req.params

	const emailUsed = await User.findOne({ email })

	if (emailUsed) {
		throw new Error("Email already in use")
	}
	res.status(200).json(true)
})

//@desc check if company name exists
//route GET /api/vendors/register/company/:companyName
//access public
const confirmCompanyName = asyncHandler(async (req, res) => {
	const { companyName } = req.params

	const companyNameUsed = await Vendor.findOne({ companyName })

	if (companyNameUsed) {
		throw new Error("Company Name is already in use")
	}
	res.status(200).json(true)
})

export { vendorRegister, confirmEmail, confirmCompanyName }
