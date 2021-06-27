import React from "react"
import "./WomenHero.css"
import HeadingBig from "../Typography/HeadingBig"

const WomenHero = () => {
	return (
		<div className="women">
			<div className="women-container">
				<div className="women-container-heading">
					<div className="heading">
						<HeadingBig>women's collection</HeadingBig>
					</div>
					<div className="image">
						<img
							src="/images/products/heather-ford-5gkYsrH_ebY-unsplash (1)sd.jpg"
							alt="poster"
							className="image-s"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WomenHero
