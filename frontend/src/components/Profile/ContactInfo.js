import React from "react"
import Message from "../Utils/Message"
import HeadingMid from "../Typography/HeadingMid"

const ContactInfo = ({
	updateError,
	fName,
	fNameChange,
	mName,
	mNameChange,
	lName,
	lNameChange,
	title,
	titleChange,
	streetAddress,
	streetAddressChange,
	city,
	cityChange,
	zip,
	zipChange,
	phoneNumber,
	phoneNumberChange,
	country,
	countryChange,
}) => {
	return (
		<>
			{updateError && <Message color="red-message">{updateError}</Message>}
			<div className="Profile-heading">
				<HeadingMid color="black">contact details </HeadingMid>
			</div>
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
		</>
	)
}

export default ContactInfo
