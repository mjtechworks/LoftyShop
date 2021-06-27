import React, { useState, useEffect } from "react"
import "./Profile.css"
import HeadingBig from "../components/Typography/HeadingBig"
import Button2 from "../components/Utils/Button2"
import SmallSpin from "../components/Utils/SmallSpin"
import UserDetails from "../components/Profile/UserDetails"
import CompanyInput from "../components/Profile/CompanyInput"
import SocialMedia from "../components/Profile/SocialMedia"
import ContactInfo from "../components/Profile/ContactInfo"
import axios from "axios"
import Message from "../components/Utils/Message"
import { useDispatch, useSelector } from "react-redux"
import { getSingleUser, editSingleUser } from "../redux/actions/userActions"
import { useHistory } from "react-router-dom"
import { EDIT_SINGLE_USER_CLEAR, CLEAR_SINGLE_USER } from "../redux/constants/userConstants"

const Profile = () => {
	const [inputError, changeInputError] = useState(null)
	const [successProfile, changeSuccessProfile] = useState(null)

	const showError = (e) => {
		changeInputError(e)
		setTimeout(() => changeInputError(null), 3000)
	}

	const dispatch = useDispatch()
	const user = useSelector((state) => state.getSingleUser)

	const { user: userInfo } = useSelector((state) => state.user)

	const { loading: profileLoading, user: profileUser, error: profileError } = user

	const updated = useSelector((state) => state.editSingleUser)

	const { loading, success, error: updatedError } = updated

	const [password, changePassword] = useState("")
	const [email, changeEmail] = useState("")
	const [name, changeName] = useState("")
	const [confirmPassword, changeConfirmPassword] = useState("")
	const [checked, changeChecked] = useState(false)

	const passwordChange = (e) => changePassword(e.target.value)
	const emailChange = (e) => changeEmail(e.target.value)
	const confirmPasswordChange = (e) => changeConfirmPassword(e.target.value)
	const nameChange = (e) => changeName(e.target.value)

	const checkUserValues = () => {
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
		if (checked) {
			if (!passwordLength) {
				return showError("Password Must Be Atleast 6 In Length")
			}
			if (!passwordValue) {
				showError("Password Must Match Confirm Password")
				return false
			}
		}

		return true
	}

	const checkEmail = async () => {
		if (profileUser.email === email) {
			return true
		} else {
			try {
				await axios.get(`http://localhost:5000/api/vendor/register/email/${email}`)
				return true
			} catch (err) {
				const message =
					err.response && err.response.data.message
						? err.response.data.message
						: err.message
				showError(message)
				return false
			}
		}
	}

	const userCompleteForm = async () => {
		const correctValues = checkUserValues()

		if (correctValues === true) {
			const emailInUse = await checkEmail()
			if (emailInUse) return true
		}
		return false
	}

	const [imageloading, changeImageloading] = useState(false)
	const [image, changeImage] = useState("/images/No_image.png")
	const [companyName, changeCompanyName] = useState("")

	const companyNameChange = (e) => changeCompanyName(e.target.value)

	const sendImage = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append("image", file)
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
		changeImageloading(true)
		try {
			const { data } = await axios.post(
				"http://localhost:5000/api/upload/register",
				formData,
				config
			)
			changeImageloading(false)
			changeImage(`http://localhost:5000${data}`)
		} catch (error) {
			changeImageloading(false)
			if (error) {
				showError("image upload failed")
			}
		}
	}

	const checkCompanyLength = () => {
		const companyNameLength = companyName.length > 2
		if (!companyNameLength) {
			showError("Company Name Must Be Atleast 3 In Length")
			return false
		}
		return true
	}

	const checkCompanyName = async () => {
		if (profileUser.vendor.companyName === companyName) {
			return true
		} else {
			try {
				await axios.get(`http://localhost:5000/api/vendor/register/company/${companyName}`)
				return true
			} catch (err) {
				const message =
					err.response && err.response.data.message
						? err.response.data.message
						: err.message
				showError(message)
				return false
			}
		}
	}

	const checkCompanyValues = async () => {
		const correctValues = checkCompanyLength()
		if (correctValues) {
			const checkCompany = await checkCompanyName()
			return checkCompany
		}
		return false
	}

	const [facebook, changeFacebook] = useState("")
	const [instagram, changeInstagram] = useState("")
	const [twitter, changeTwitter] = useState("")
	const [pinterest, changePinterest] = useState("")

	const facebookChange = (e) => changeFacebook(e.target.value)
	const instagramChange = (e) => changeInstagram(e.target.value)
	const twitterChange = (e) => changeTwitter(e.target.value)
	const pinterestChange = (e) => changePinterest(e.target.value)

	const checkSocialValues = () => {
		let value = false
		if (facebook) value = true
		if (instagram) value = true
		if (twitter) value = true
		if (pinterest) value = true
		if (!value) return showError("You must fill atleast one")
		return value
	}

	const [fName, changeFName] = useState("")
	const [lName, changeLName] = useState("")
	const [mName, changeMName] = useState("")
	const [streetAddress, changeStreetAddress] = useState("")
	const [city, changeCity] = useState("")
	const [zip, changeZip] = useState("")
	const [country, changeCountry] = useState("")
	const [phoneNumber, changePhoneNumber] = useState("")
	const [title, changeTitle] = useState("")

	const fNameChange = (e) => changeFName(e.target.value)
	const lNameChange = (e) => changeLName(e.target.value)
	const mNameChange = (e) => changeMName(e.target.value)
	const streetAddressChange = (e) => changeStreetAddress(e.target.value)
	const cityChange = (e) => changeCity(e.target.value)
	const zipChange = (e) => changeZip(e.target.value)
	const countryChange = (e) => changeCountry(e.target.value)
	const phoneNumberChange = (e) => changePhoneNumber(e.target.value)
	const titleChange = (e) => changeTitle(e.target.value)

	const contactCheckValues = () => {
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

	const checkContact = () => {
		const correctValues = contactCheckValues()
		return correctValues
	}

	const history = useHistory()

	useEffect(() => {
		if (!userInfo) {
			history.push("/login")
		} else {
			if (success) {
				changeSuccessProfile(success)
				dispatch({ type: EDIT_SINGLE_USER_CLEAR })
				dispatch({ type: CLEAR_SINGLE_USER })
			}

			const profile = () => {
				changeEmail(profileUser.email)
				changeName(profileUser.name)
				if (profileUser.isVendor) {
					changeCompanyName(profileUser.vendor.companyName)
					changeImage(profileUser.vendor.image)

					const {
						facebook,
						instagram,
						twitter,
						pinterest,
					} = profileUser.vendor.socialMedia

					facebook && changeFacebook(facebook)
					instagram && changeInstagram(instagram)
					twitter && changeTwitter(twitter)
					pinterest && changePinterest(pinterest)

					const {
						fullName,
						title,
						streetAddress,
						city,
						zip,
						country,
						phoneNumber,
					} = profileUser.vendor.contactInfo
					const names = fullName.split(" ")
					changeFName(names[0])
					names.length === 3 && changeMName(names[1])
					changeLName(names[names.length === 3 ? 2 : 1])
					changeTitle(title)
					changeStreetAddress(streetAddress)
					changeCity(city)
					changeZip(zip)
					changeCountry(country)
					changePhoneNumber(phoneNumber)
				}
				changePassword("")
				changeConfirmPassword("")
				changeChecked(false)
			}
			if (profileUser) {
				profile()
			} else {
				dispatch(getSingleUser())
				changeSuccessProfile(null)
			}
		}
	}, [dispatch, profileUser, success, history, userInfo])

	const checkAllValues = async () => {
		if (await userCompleteForm()) {
			const values = await checkCompanyValues()
			if (values === true) {
				if (checkSocialValues()) {
					if (checkContact()) {
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
						let socialMedia = {}
						if (facebook) socialMedia.facebook = facebook
						if (instagram) socialMedia.instagram = instagram
						if (twitter) socialMedia.twitter = twitter
						if (pinterest) socialMedia.pinterest = pinterest
						const vendor = { contactInfo, socialMedia, image, companyName }
						const items = { vendor, name, email }
						if (password) items.password = password
						dispatch(editSingleUser(items))
					}
				}
			}
		}
	}

	return (
		<div className="Profile">
			<div className="Profile-container">
				{!profileLoading && profileError ? (
					<Message>{profileError}</Message>
				) : (
					<>
						<UserDetails
							name={name}
							confirmPassword={confirmPassword}
							confirmPasswordChange={confirmPasswordChange}
							email={email}
							emailChange={emailChange}
							nameChange={nameChange}
							password={password}
							passwordChange={passwordChange}
							changeChecked={changeChecked}
							checked={checked}
						/>
						{!profileLoading && profileUser.isVendor && (
							<div className="vendors">
								<div className="Profile-heading">
									<HeadingBig>vendor details</HeadingBig>
								</div>
								<CompanyInput
									image={image}
									companyName={companyName}
									companyNameChange={companyNameChange}
									sendImage={sendImage}
									imageLoading={imageloading}
									inputError={inputError}
								/>
								<SocialMedia
									facebook={facebook}
									facebookChange={facebookChange}
									instagram={instagram}
									instagramChange={instagramChange}
									twitter={twitter}
									twitterChange={twitterChange}
									pinterest={pinterest}
									pinterestChange={pinterestChange}
									inputError={inputError}
								/>
								<ContactInfo
									inputError={inputError}
									fName={fName}
									fNameChange={fNameChange}
									mName={mName}
									mNameChange={mNameChange}
									lName={lName}
									lNameChange={lNameChange}
									title={title}
									titleChange={titleChange}
									streetAddress={streetAddress}
									streetAddressChange={streetAddressChange}
									city={city}
									cityChange={cityChange}
									zip={zip}
									zipChange={zipChange}
									phoneNumber={phoneNumber}
									phoneNumberChange={phoneNumberChange}
									country={country}
									countryChange={countryChange}
								/>
							</div>
						)}
						{inputError && <Message color="red-message">{inputError}</Message>}
						{updatedError && <Message color="red-message">{updatedError}</Message>}
						{successProfile && (
							<Message color="green-message">{successProfile}</Message>
						)}
						<div
							className="Profile-update-button button-relative"
							onClick={checkAllValues}
						>
							<Button2 color="blue">
								update
								{loading && (
									<div className="cover">
										<SmallSpin />
									</div>
								)}
							</Button2>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Profile
