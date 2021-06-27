import React from "react"
import "./MenHero.css"
import HeadingBig from "../Typography/HeadingBig"

const MenHero = () => {
	return (
		<div className="men">
			<div className="men-container">
				<div className="men-container-heading">
					<div className="heading">
						<HeadingBig>men's collection</HeadingBig>
					</div>
					<div className="image">
						<img src="/images/products/bg-13.jpg" alt="poster" className="image-s" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default MenHero
