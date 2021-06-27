import React, { useState, useEffect } from "react"
import "./registerDetails.css"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Utils/Message"
import Button2 from "../components/Utils/Button2"
import HeadingBig from "../components/Typography/HeadingBig"
import SmallSpin from "../components/Utils/SmallSpin"
import { vendorRegister } from "../redux/actions/VendorActions"

const ContactInfo = ({ history, location }) => {
	const [nextloading, changeNextloading] = useState(false)

	const dispatch = useDispatch()
	const vendorState = useSelector((state) => state.vendor)

	const { socialMedia, companyDetails, vendorDetails, error } = vendorState
	const [fName, changeFName] = useState("")
	const [lName, changeLName] = useState("")
	const [mName, changeMName] = useState("")
	const [streetAddress, changeStreetAddress] = useState("")
	const [city, changeCity] = useState("")
	const [zip, changeZip] = useState("")
	const [country, changeCountry] = useState("")
	const [phoneNumber, changePhoneNumber] = useState("")
	const [title, changeTitle] = useState("")

	const userState = useSelector((state) => state.user)
	let { user: userInfo } = userState

	const fNameChange = (e) => changeFName(e.target.value)
	const lNameChange = (e) => changeLName(e.target.value)
	const mNameChange = (e) => changeMName(e.target.value)
	const streetAddressChange = (e) => changeStreetAddress(e.target.value)
	const cityChange = (e) => changeCity(e.target.value)
	const zipChange = (e) => changeZip(e.target.value)
	const countryChange = (e) => changeCountry(e.target.value)
	const phoneNumberChange = (e) => changePhoneNumber(e.target.value)
	const titleChange = (e) => changeTitle(e.target.value)
	const [registerError, changeRegisterError] = useState(null)

	const redirect = location.search && location.search.split("=")[1]
	const push = redirect ? redirect : "/shop"

	const length = (obj) => Object.keys(obj).length === 0

	useEffect(() => {
		if (userInfo) {
			history.push(push)
		}
		if (length(socialMedia) || length(companyDetails) || length(vendorDetails)) {
			history.push(`/register/vendor/social_media${redirect && `?${redirect}`}`)
		}
	}, [history, push, userInfo, redirect, socialMedia, vendorDetails, companyDetails])

	const showError = (e) => {
		changeRegisterError(e)
		setTimeout(() => changeRegisterError(null), 3000)
	}

	const checkValues = (e) => {
		if (!fName || fName.length < 3) {
			showError("First Name is Required")
			return false
		}
		if (!lName || lName.length < 3) {
			showError("Last Name is Required")
			return false
		}
		if (!streetAddress || streetAddress.length < 3) {
			showError("Street Address is Required")
			return false
		}
		if (!city || city.length < 3) {
			showError("City is Required")
			return false
		}
		if (!zip || zip.length < 4 || !parseInt(zip)) {
			showError("zip code is Required")
			return false
		}
		if (!phoneNumber || phoneNumber.length < 3 || !parseInt(phoneNumber)) {
			showError("Phone Number is Required")
			return false
		}
		if (!title || title.length < 3) {
			showError("Title is Required")
			return false
		}

		return true
	}

	const submitForm = (e) => {
		changeNextloading(true)
		e.preventDefault()
		if (length(socialMedia) || length(companyDetails) || length(vendorDetails)) {
			history.push(`/register/vendor/social_media${redirect && `?${redirect}`}`)
		} else {
			const correctValues = checkValues(e)
			if (correctValues) {
				let fullName = mName ? `${fName} ${mName} ${lName}` : `${fName} ${lName}`
				let contactInfo = {
					fullName,
					title,
					streetAddress,
					city,
					zip,
					country,
					phoneNumber,
				}
				dispatch(vendorRegister(contactInfo))
				history.push("/register/vendor/contact_info")
			}
			changeNextloading(false)
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
				<div className="contact-input-container">
					{registerError && <Message color="red-message">{registerError}</Message>}
					{error && <Message color="red-message">{error}</Message>}
					<form onSubmit={submitForm}>
						<div className="contact-register">
							<div className="contact-input">
								<label className="contact-name-label">Name</label>
								<div className="contact-inputs">
									<input
										type="text"
										name="fName"
										id="fName"
										className="contact-input-item"
										placeholder="First Name"
										value={fName}
										onChange={fNameChange}
									/>
									<input
										type="text"
										name="mName"
										id="mName"
										className="contact-input-item"
										placeholder="Middle Name"
										value={mName}
										onChange={mNameChange}
									/>
									<input
										type="text"
										name="lName"
										id="lName"
										className="contact-input-item"
										placeholder="Last Name"
										value={lName}
										onChange={lNameChange}
									/>
								</div>
								<div className="contact-inputs-address">
									<label htmlFor="companyName" className="contact-name-label">
										Title
									</label>
									<input
										type="text"
										name="title"
										id="title"
										className="contact-input-item"
										placeholder="eg. CEO, Owner, Manager, Designer, Merchandiser"
										value={title}
										onChange={titleChange}
									/>
								</div>
								<p className="business-mailing">Business Mailing Address</p>
								<div className="contact-inputs">
									<div className="contact-inputs-address">
										<label htmlFor="companyName" className="contact-name-label">
											Street Address
										</label>
										<input
											type="text"
											name="streetAddress"
											id="streetAddress"
											className="contact-input-item"
											value={streetAddress}
											onChange={streetAddressChange}
										/>
									</div>
									<div className="contact-inputs-address">
										<label htmlFor="companyName" className="contact-name-label">
											City and State
										</label>
										<input
											type="text"
											name="city"
											id="city"
											className="contact-input-item"
											value={city}
											onChange={cityChange}
										/>
									</div>
									<div className="contact-inputs-address">
										<label htmlFor="companyName" className="contact-name-label">
											Zip Code
										</label>
										<input
											type="text"
											name="zip"
											id="zip"
											className="contact-input-item"
											value={zip}
											onChange={zipChange}
										/>
									</div>
									<div className="contact-inputs-address">
										<label htmlFor="companyName" className="contact-name-label">
											Phone Number
										</label>
										<input
											type="text"
											name="phoneNumber"
											id="phoneNumber"
											className="contact-input-item"
											value={phoneNumber}
											onChange={phoneNumberChange}
										/>
									</div>
									<div className="contact-inputs-address">
										<label htmlFor="companyName" className="contact-name-label">
											Country
										</label>
										<input
											type="text"
											name="country"
											id="country"
											className="contact-input-item"
											value={country}
											onChange={countryChange}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="vendor-button">
							<div className="vendor-button-1" onClick={back}>
								<Button2 color="red" link="/register" arrow="yes">
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
					</form>
				</div>
			</div>
		</>
	)
}

export default ContactInfo
