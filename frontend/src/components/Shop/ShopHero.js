import React from "react"
import HeadingBig from "../Typography/HeadingBig"

const ShopHero = () => {
	return (
		<>
			<div className="shop-heading">
				<div className="shop-heading-main">
					<HeadingBig>shop with us</HeadingBig>
				</div>
				<div className="shop-heading-image">
					<img
						className="shop-heading-image-item"
						src="/images/products/bg-5.jpg"
						alt="poster"
					/>
					<div className="shop-heading-image-main1">
						<HeadingBig color="shop-text">we are in touch with</HeadingBig>
					</div>
					<div className="shop-heading-image-main2">
						<HeadingBig color="shop-text">the latest trends</HeadingBig>
					</div>
				</div>
			</div>
		</>
	)
}

export default ShopHero
