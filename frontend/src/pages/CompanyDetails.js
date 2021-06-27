import React, { useState, useEffect } from "react"
import "./registerDetails.css"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Utils/Message"
import Button2 from "../components/Utils/Button2"
import HeadingBig from "../components/Typography/HeadingBig"
import axios from "axios"
import SmallSpin from "../components/Utils/SmallSpin"
import { VENDOR_SAVE_COMPANY_DETAILS } from "../redux/constants/vendorConstant"

const CompanyDetails = ({ history, location }) => {
	const [nextloading, changeNextloading] = useState(false)
	const [loading, changeloading] = useState(false)

	const dispatch = useDispatch()
	const userState = useSelector((state) => state.user)
	let { user: userInfo } = userState

	const [registerError, changeRegisterError] = useState(null)

	const vendor = useSelector((state) => state.vendor)
	const { vendorDetails, companyDetails: company } = vendor

	const [image, changeImage] = useState(company.image ? company.image : "/images/No_image.png")
	const [companyName, changeCompanyName] = useState(
		company.companyName ? company.companyName : ""
	)

	const companyNameChange = (e) => changeCompanyName(e.target.value)

	const redirect = location.search && location.search.split("=")[1]
	const pushs = redirect ? redirect : "/shop"

	const length = (obj) => Object.keys(obj).length === 0

	useEffect(() => {
		let isCancelled = false
		if (userInfo && !isCancelled) {
			history.push(pushs)
		}
		if (length(vendorDetails) && !isCancelled) {
			history.push(`/register${redirect && `?${redirect}`}`)
		}
		return () => {
			isCancelled = true
		}
	}, [history, pushs, userInfo, vendorDetails, redirect])

	const showError = (e) => {
		changeRegisterError(e)
		setTimeout(() => changeRegisterError(null), 3000)
	}

	const checkValues = () => {
		const companyNameLength = companyName.length > 2
		if (!companyNameLength) {
			showError("Company Name Must Be Atleast 3 In Length")
			return false
		}
		return true
	}

	const checkCompanyName = async () => {
		try {
			await axios.get(`/api/vendor/register/company/${companyName}`)
			return true
		} catch (err) {
			const message =
				err.response && err.response.data.message ? err.response.data.message : err.message
			showError(message)
			return false
		}
	}

	const submitForm = async (e) => {
		changeNextloading(true)
		e.preventDefault()
		const correctValues = checkValues()
		if (correctValues) {
			const checkCompany = await checkCompanyName()
			if (checkCompany) {
				dispatch({ type: VENDOR_SAVE_COMPANY_DETAILS, payload: { image, companyName } })
				history.push(`/register/vendor/social_media${redirect && `?${redirect}`}`)
			}
		}
		changeNextloading(false)
	}

	const sendImage = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append("image", file)
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
		changeloading(true)
		try {
			const { data } = await axios.post("/api/upload/", formData, config)
			changeloading(false)
			changeImage(data)
		} catch (error) {
			changeloading(false)
			showError("image upload failed")
		}
	}

	const back = () => history.goBack()
	return (
		<>
			<div className="register-menu">
				<div className="register-heading">
					<HeadingBig color="vendor-heading">vendor application</HeadingBig>
				</div>
				<div className="register-breadcrumbs">
					<NavLink
						to="/register/vendor/company_details"
						activeClassName="active-breadcrumbs"
						className="breadcrumbs-link"
					>
						Company Details
					</NavLink>
					<NavLink
						to="/register/vendor/social_media"
						activeClassName="active-breadcrumbs"
						className="breadcrumbs-link"
					>
						social Media
					</NavLink>
					<NavLink
						to="/register/vendor/contact_info"
						activeClassName="active-breadcrumbs"
						className="breadcrumbs-link"
					>
						contact Info
					</NavLink>
				</div>
				<div className="register-input-container">
					{registerError && <Message color="red-message">{registerError}</Message>}
					<form onSubmit={submitForm}>
						<div className="company-input">
							<p className="company-text">Your company logo</p>
							<div className="register-logo">
								<div className="image-previev">
									<img
										src={image}
										alt="default"
										className="register-logo-image"
									/>
									{loading && (
										<div className="cover-image">
											<SmallSpin />
										</div>
									)}
								</div>
								<label htmlFor="img" className="register-logo-label">
									Choose Image
								</label>
								<input
									type="file"
									id="img"
									name="img"
									accept="image/png, image/jpeg ,image/png"
									className="register-logo-input"
									onChange={sendImage}
								/>
							</div>
							<div className="company-name-input">
								<label htmlFor="companyName" className="company-name-label">
									Company Name
								</label>
								<input
									type="text"
									name="companyName"
									id="companyName"
									className="company-name-inputs"
									placeholder="xyx industries"
									value={companyName}
									onChange={companyNameChange}
								/>
							</div>
							<div className="vendor-button">
								<div className="vendor-button-1" onClick={back}>
									<Button2 color="red" arrow="yes" type="button">
										back
									</Button2>
								</div>
								<div className="vendor-button-1 button-relative">
									<Button2 color="blue">
										next
										{nextloading && (
											<div className="cover">
												<SmallSpin />
											</div>
										)}
									</Button2>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default CompanyDetails
