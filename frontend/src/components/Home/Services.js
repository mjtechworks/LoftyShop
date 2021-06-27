import React from "react"
import Truck from "../../assets/svg/Truck"
import Atm from "../../assets/svg/Atm"
import HeadSet from "../../assets/svg/HeadSet"
import Money from "../../assets/svg/Money"
import "./Services.css"
import HeadingSmall from "../Typography/HeadingSmall"
import HeadingMid from "../Typography/HeadingMid"

function Services() {
	return (
		<div className="services">
			<div className="services-container">
				<div className="services-container-item">
					<div className="services-container-item-icon">
						<Truck />
					</div>
					<HeadingMid color="black">free shipping</HeadingMid>
					<HeadingSmall color="light-grey">for items over $30</HeadingSmall>
					<div className="services-cointainer-item-text"></div>
				</div>
				<div className="services-container-item">
					<div className="services-container-item-icon">
						<Money />
					</div>
					<div className="services-cointainer-item-text">
						<HeadingMid color="black ">money back assured</HeadingMid>
						<HeadingSmall color="light-grey">
							when items are returned in perfect condition
						</HeadingSmall>
					</div>
				</div>
				<div className="services-container-item">
					<div className="services-container-item-icon">
						<Atm />
					</div>
					<div className="services-cointainer-item-text">
						<HeadingMid color="black">payment secure</HeadingMid>
						<HeadingSmall color="light-grey">100% secure payments</HeadingSmall>
					</div>
				</div>
				<div className="services-container-item">
					<div className="services-container-item-icon">
						<HeadSet />
					</div>
					<div className="services-cointainer-item-text">
						<HeadingMid color="black">online support</HeadingMid>
						<HeadingSmall color="light-grey">
							24/7 dedicated online support
						</HeadingSmall>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Services
