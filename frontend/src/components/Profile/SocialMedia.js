import React from "react"
import Facebook from "../../assets/svg/Facebook"
import Instagram from "../../assets/svg/Instagram"
import Twitter from "../../assets/svg/Twitter"
import Pinterest from "../../assets/svg/Pinterest"
import Message from "../Utils/Message"
import HeadingMid from "../Typography/HeadingMid"

const SocialMedia = ({
	facebook,
	facebookChange,
	instagram,
	instagramChange,
	twitter,
	twitterChange,
	pinterest,
	pinterestChange,
	updateError,
}) => {
	return (
		<>
			{updateError && <Message color="red-message">{updateError}</Message>}
			<div className="Profile-heading">
				<HeadingMid color="black">Social media </HeadingMid>
			</div>
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
		</>
	)
}

export default SocialMedia
