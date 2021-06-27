import React, { useState, useEffect } from "react"
import "./Login.css"
import HeadingBig from "../components/Typography/HeadingBig"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userLogin } from "../redux/actions/userActions"
import Message from "../components/Utils/Message"
import Button2 from "../components/Utils/Button2"
import SmallSpin from "../components/Utils/SmallSpin"

const Login = ({ location, history }) => {
	const [password, changePassword] = useState("")
	const [email, changeEmail] = useState("")
	const [loginError, changeLoginError] = useState(null)

	const dispatch = useDispatch()
	const userState = useSelector((state) => state.user)
	let { loading, user: userInfo, error } = userState

	const passwordChange = (e) => changePassword(e.target.value)
	const emailChange = (e) => changeEmail(e.target.value)

	const showError = (e) => {
		changeLoginError(e)
		setTimeout(() => changeLoginError(null), 3000)
	}

	const redirect = location.search ? location.search.split("=")[1] : "/shop"

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
		if (error) showError(error)
	}, [history, redirect, userInfo, error])

	const submitForm = (e) => {
		e.preventDefault()
		dispatch(userLogin(email, password))
	}
	return (
		<div className="login-menu">
			<div className="login-heading">
				<HeadingBig>Login</HeadingBig>
			</div>
			<div className="login-input-container">
				{loginError && <Message color="red-message">{loginError}</Message>}
				<form onSubmit={submitForm}>
					<div className="login-input">
						<label htmlFor="login-email" className="login-label">
							Email
						</label>
						<input
							type="email"
							className="login-inputs"
							name="email"
							id="login-email"
							value={email}
							required
							onChange={emailChange}
						/>
						<label htmlFor="login-password" className="login-label">
							Password
						</label>
						<input
							type="password"
							className="login-inputs"
							name="password"
							id="login-password"
							value={password}
							minLength="4"
							onChange={passwordChange}
						/>
					</div>
					<div className="login-button button-relative">
						<Button2 type="submit" color="blue">
							login
							{loading && (
								<div className=" cover-1">
									<SmallSpin />
								</div>
							)}
						</Button2>
					</div>
				</form>
				<p className="login-register">
					New Customer?
					<Link className="margin-2 c-blue" to="/register">
						Register
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Login
