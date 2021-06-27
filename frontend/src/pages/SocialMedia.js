import React, { useState, useEffect } from "react"
import "./registerDetails.css"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Utils/Message"
import Button2 from "../components/Utils/Button2"
import HeadingBig from "../components/Typography/HeadingBig"
import SmallSpin from "../components/Utils/SmallSpin"
import Instagram from "../assets/svg/Instagram"
import Facebook from "../assets/svg/Facebook"
import Twitter from "../assets/svg/Twitter"
import Pinterest from "../assets/svg/Pinterest"
import { VENDOR_SAVE_SOCIAL_MEDIA } from "../redux/constants/vendorConstant"

const SocialMedia = ({ history, location }) => {
	const [nextloading, changeNextloading] = useState(false)

	const dispatch = useDispatch()
	const vendorState = useSelector((state) => state.vendor)
	const { vendorDetails, companyDetails, socialMedia } = vendorState

	const [facebook, changeFacebook] = useState(socialMedia.facebook ? socialMedia.facebook : "")
	const [instagram, changeInstagram] = useState(
		socialMedia.instagram ? socialMedia.instagram : ""
	)
	const [twitter, changeTwitter] = useState(socialMedia.twitter ? socialMedia.twitter : "")
	const [pinterest, changePinterest] = useState(socialMedia.pinterest ? socialMedia.facebook : "")

	const userState = useSelector((state) => state.user)
	let { user: userInfo } = userState

	const facebookChange = (e) => changeFacebook(e.target.value)
	const instagramChange = (e) => changeInstagram(e.target.value)
	const twitterChange = (e) => changeTwitter(e.target.value)
	const pinterestChange = (e) => changePinterest(e.target.value)
	const [registerError, changeRegisterError] = useState(null)

	const redirect = location.search && location.search.split("=")[1]
	const push = redirect ? redirect : "/shop"

	const length = (obj) => Object.keys(obj).length === 0

	useEffect(() => {
		if (userInfo) {
			history.push(push)
		}
		if (length(companyDetails) || length(vendorDetails)) {
			history.push(`/register/vendor/company_details${redirect && `?${redirect}`}`)
		}
	}, [history, push, userInfo, companyDetails, redirect, vendorDetails])

	const showError = (e) => {
		changeRegisterError(e)
		setTimeout(() => changeRegisterError(null), 3000)
	}

	const checkValues = () => {
		let value = false
		if (facebook) value = true
		if (instagram) value = true
		if (twitter) value = true
		if (pinterest) value = true
		if (!value) return showError("You must fill atleast one")
		return value
	}

	const submitForm = (e) => {
		changeNextloading(true)
		e.preventDefault()
		const correctValues = checkValues()
		if (correctValues) {
			let socialMedia = {}
			if (facebook) socialMedia.facebook = facebook
			if (instagram) socialMedia.instagram = instagram
			if (twitter) socialMedia.twitter = twitter
			if (pinterest) socialMedia.pinterest = pinterest
			dispatch({ type: VENDOR_SAVE_SOCIAL_MEDIA, payload: socialMedia })
			history.push(`/register/vendor/contact_info${redirect && `?${redirect}`}`)
		}
		changeNextloading(false)
	}

	const back = () => history.push("/register/vendor/company_details")

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
							<div className="company-name-input">
								<label htmlFor="companyName" className="company-name-label">
									<Facebook /> Facebook
								</label>
								<input
									type="text"
									name="facebook"
									id="facebook"
									className="company-name-inputs"
									placeholder="e.g http://www.facebook.com/company-name"
									value={facebook}
									onChange={facebookChange}
								/>
								<label htmlFor="companyName" className="company-name-label">
									<Instagram /> Instagram
								</label>
								<input
									type="text"
									name="instagram"
									id="instagram"
									className="company-name-inputs"
									value={instagram}
									onChange={instagramChange}
								/>
								<label htmlFor="companyName" className="company-name-label">
									<Twitter /> Twitter
								</label>
								<input
									type="text"
									name="twitter"
									id="twitter"
									className="company-name-inputs"
									value={twitter}
									onChange={twitterChange}
								/>
								<label htmlFor="companyName" className="company-name-label">
									<Pinterest /> Pinterest
								</label>
								<input
									type="text"
									name="pinterest"
									id="pinterest"
									className="company-name-inputs"
									value={pinterest}
									onChange={pinterestChange}
								/>
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

export default SocialMedia
