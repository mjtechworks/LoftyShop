import React, { useState, useEffect } from "react"
import "./Login.css"
import HeadingBig from "../components/Typography/HeadingBig"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userRegister } from "../redux/actions/userActions"
import Message from "../components/Utils/Message"
import Button2 from "../components/Utils/Button2"
import { VENDOR_SAVE } from "../redux/constants/vendorConstant"
import SmallSpin from "../components/Utils/SmallSpin"
import axios from "axios"

const Register = ({ location, history }) => {
	const userState = useSelector((state) => state.user)
	let { user: userInfo } = userState

	const vendor = useSelector((state) => state.vendor)
	const { vendorDetails } = vendor

	const [password, changePassword] = useState(
		vendorDetails.password ? vendorDetails.password : ""
	)
	const [email, changeEmail] = useState(vendorDetails.email ? vendorDetails.email : "")
	const [name, changeName] = useState(vendorDetails.name ? vendorDetails.name : "")
	const [isAdmin, changeIsAdmin] = useState(false)
	const [isVendor, changeIsVendor] = useState(false)
	const [confirmPassword, changeConfirmPassword] = useState("")
	const [vendorLoading, changeVendorLoading] = useState(false)

	const checkVendor = (e) => {
		if (isAdmin) changeIsAdmin(false)
		changeIsVendor(!isVendor)
	}

	const checkAdmin = (e) => {
		if (isVendor) changeIsVendor(false)
		changeIsAdmin(!isAdmin)
	}

	const dispatch = useDispatch()
	const registerState = useSelector((state) => state.register)
	let { loading, error } = registerState

	const passwordChange = (e) => changePassword(e.target.value)
	const emailChange = (e) => changeEmail(e.target.value)
	const confirmPasswordChange = (e) => changeConfirmPassword(e.target.value)
	const nameChange = (e) => changeName(e.target.value)

	const [registerError, changeRegisterError] = useState(null)

	const redirect = location.search ? location.search.split("=")[1] : "/shop"

	useEffect(() => {
		let isCancelled = false
		if (userInfo && !isCancelled) {
			history.push(redirect)
		}
		if (error && !isCancelled) showError(error)

		return () => {
			isCancelled = true
		}
	}, [history, redirect, userInfo, error])

	const showError = (e) => {
		changeRegisterError(e)
		setTimeout(() => changeRegisterError(null), 3000)
	}

	const checkValues = () => {
		const nameValue = /\w{3,}\s\w{3,}/i.test(name)
		const emailValue = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
			email
		)
		const passwordLength = password.length > 5
		const passwordValue = password === confirmPassword

		if (!nameValue) {
			return showError("Pls Enter Your Full Name With Space")
		}
		if (!emailValue) {
			return showError("Pls Enter A Valid Email Address")
		}
		if (!passwordLength) {
			return showError("Password Must Be Atleast 6 In Length")
		}
		if (!passwordValue) {
			return showError("Password Must Match Confirm Password")
		}
		return true
	}

	const checkEmail = async () => {
		try {
			await axios.get(`http://localhost:5000/api/vendor/register/email/${email}`)
			return true
		} catch (err) {
			const message =
				err.response && err.response.data.message ? err.response.data.message : err.message
			showError(message)

			return false
		}
	}

	const submitForm = async (e) => {
		e.preventDefault()
		const correctValues = checkValues()
		if (correctValues) {
			if (!isVendor) {
				dispatch(userRegister(name, email, password, isAdmin))
			} else {
				changeVendorLoading(true)
				const emailInUse = await checkEmail()

				if (emailInUse) {
					dispatch({ type: VENDOR_SAVE, payload: { name, email, password } })
					history.push("/register/vendor/company_details")
				}
				changeVendorLoading(false)
			}
		}
	}

	return (
		<>
			<div className="login-menu">
				<div className="login-heading">
					<HeadingBig>Register</HeadingBig>
				</div>
				<div className="login-input-container">
					{registerError && <Message color="red-message">{registerError}</Message>}
					<form onSubmit={submitForm}>
						<div className="login-input">
							<label htmlFor="register-name" className="login-label">
								Full Name
							</label>
							<input
								type="text"
								name="name"
								className="login-inputs"
								id="register-name"
								value={name}
								onChange={nameChange}
							/>
							<label htmlFor="register-email" className="login-label">
								Email
							</label>
							<input
								type="text"
								className="login-inputs"
								name="email"
								id="register-email"
								value={email}
								onChange={emailChange}
							/>
							<label htmlFor="register-password" className="login-label">
								Password
							</label>
							<input
								type="password"
								className="login-inputs"
								name="password"
								id="register-password"
								value={password}
								onChange={passwordChange}
							/>
							<label htmlFor="login-confirm-password" className="login-label">
								Confirm Password
							</label>
							<input
								type="password"
								className="login-inputs"
								name="confirm-password"
								id="register-confirm-password"
								value={confirmPassword}
								onChange={confirmPasswordChange}
							/>
							<div className="register-vendor">
								<input
									type="checkbox"
									name="admin"
									id="admin-register"
									className="register-box"
									onChange={checkAdmin}
									checked={isAdmin}
								/>
								<label htmlFor="admin-register" className="check-vendor">
									Sign up as admin
								</label>
							</div>
							<div className="register-vendor">
								<input
									type="checkbox"
									name="vendor"
									id="vendor-register"
									className="register-box"
									onChange={checkVendor}
									checked={isVendor}
								/>
								<label htmlFor="vendor-register" className="check-vendor">
									Sign up as a vendor
								</label>
							</div>
						</div>

						<div className="login-button button-relative">
							<Button2 type="submit" color="blue">
								register
								{loading && (
									<div className=" cover-1">
										<SmallSpin />
									</div>
								)}
								{vendorLoading && (
									<div className=" cover-1">
										<SmallSpin />
									</div>
								)}
							</Button2>
						</div>
					</form>
					<p className="login-register">
						Already registered?
						<Link className="margin-2 c-blue" to="/login">
							Login
						</Link>
					</p>
				</div>
			</div>
		</>
	)
}

export default Register
