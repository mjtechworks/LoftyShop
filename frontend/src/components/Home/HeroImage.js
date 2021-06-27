import React, { useState } from "react"
import "./HeroImage.css"
import HeadingSmall from "../Typography/HeadingSmall"
import HeadingBig from "../Typography/HeadingBig"
import Button from "../Utils/Button"
import { useEffect } from "react"

function HeroImage() {
	const [show, setShow] = useState(true)

	useEffect(() => {
		const change = setInterval(() => setShow(!show), 5000)
		return () => clearInterval(change)
	}, [show])

	return (
		<>
			<div className={`hero-image ${show && "none"}`}>
				<div className="hero-image-text">
					<div className="small-heading rotate-scale-up">
						<HeadingSmall>men collection</HeadingSmall>
					</div>
					<div className="big-heading-1 roll-in-left">
						<HeadingBig>select your new</HeadingBig>
					</div>
					<div className="big-heading-2 roll-in-left">
						<HeadingBig>perfect style</HeadingBig>
					</div>
					<div className="hero-image-button scale-in-center">
						<Button link="/men" color="blue">
							view collections
						</Button>
					</div>
				</div>
			</div>
			<div className={`hero-image hero-image-1 ${!show && "none"}`}>
				<div className="hero-image-text">
					<div className="small-heading rotate-in-top">
						<HeadingSmall>women collection</HeadingSmall>
					</div>
					<div className="big-heading-1 slide-in-bottom">
						<HeadingBig>the joy of dressing</HeadingBig>
					</div>
					<div className="big-heading-2 slide-in-bottom">
						<HeadingBig>is an art</HeadingBig>
					</div>
					<div className="hero-image-button scale-in-center">
						<Button link="/women" color="blue">
							view collections
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default HeroImage
