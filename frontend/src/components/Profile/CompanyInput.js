import React from "react"
import SmallSpin from "../Utils/SmallSpin"
import Message from "../Utils/Message"
import HeadingMid from "../Typography/HeadingMid"

const CompanyInput = ({
	image,
	sendImage,
	imageLoading,
	companyName,
	companyNameChange,
	updateError,
}) => {
	return (
		<>
			{updateError && <Message color="red-message">{updateError}</Message>}
			<div className="Profile-heading">
				<HeadingMid color="black">Company details </HeadingMid>
			</div>
			<div className="company-input">
				<p className="company-text">Your company logo</p>
				<div className="register-logo">
					<div className="image-previev">
						<img src={image} alt="default" className="register-logo-image" />
						{imageLoading && (
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
						onChange={(e) => sendImage(e)}
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
			</div>
		</>
	)
}

export default CompanyInput
