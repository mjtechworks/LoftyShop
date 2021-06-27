import React from "react"
import "./Contact.css"
import HeadingBig from "../components/Typography/HeadingBig"
import HeadingMid from "../components/Typography/HeadingMid"
import Button from "../components/Utils/Button"
import Walking from "../assets/svg/Walking"
import HeadingSmall from "../components/Typography/HeadingSmall"
import Phone from "../assets/svg/Phone"
import Email from "../assets/svg/Email"

const Contact = () => (
	<div className="contact">
		<div className="contact-container">
			<HeadingBig>contact</HeadingBig>
			<div className="details">
				<div className="message">
					<HeadingMid color="service-font black">send us a message</HeadingMid>
					<input type="text" className="text" placeholder="your email" />
					<textarea
						name=""
						id=""
						cols="40"
						rows="10"
						placeholder="how can we help"
						className="text-area"
					></textarea>
					<div className="contact-button">
						<Button color="blue">submit</Button>
					</div>
				</div>
				<div className="address">
					<div className="address-info">
						<div className="address-icon">
							<Walking />
						</div>
						<div className="address-detail">
							<div className="heading">
								<HeadingSmall>address</HeadingSmall>
							</div>
							<div className="details-contact">
								LOGO Store Center 8th floor, 379 Hudson St, New York, NY 10018 US
							</div>
						</div>
					</div>
					<div className="address-info">
						<div className="address-icon">
							<Phone />
						</div>
						<div className="address-detail">
							<div className="heading">
								<HeadingSmall>let's talk</HeadingSmall>
							</div>
							<div className="details-contact">+1 800 1236879</div>
						</div>
					</div>
					<div className="address-info">
						<div className="address-icon">
							<Email />
						</div>
						<div className="address-detail">
							<div className="heading">
								<HeadingSmall>sales support</HeadingSmall>
							</div>
							<div className="details-contact">contact@logo.com</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default Contact
