import React from "react"
import "./About.css"
import HeadingBig from "../components/Typography/HeadingBig"
import Underline from "../components/Typography/Underline"

const About = () => (
	<div className="about">
		<div className="about-heading">
			<img
				src="/images/products/about_hero.png"
				alt="aboutImage"
				className="about-heading-image"
			/>
			<div className="about-heading-1">
				<HeadingBig>about</HeadingBig>
			</div>
		</div>
		<div className="about-details">
			<div className="heading">
				<Underline color="about-underline-text">details</Underline>
			</div>
			<div className="content">
				<img className="content-img" src="/images/products/about-01.jpg" alt="contentImg" />
				<div className="content-text">
					Motivated, Designed And Created By Anthony. It Uses React Framework Library,
					Node Js Server With Modgodb As Its Database For The Product Details
				</div>
			</div>
		</div>
		<div className="about-mission">
			<div className="heading">
				<Underline color="about-underline-text">mission</Underline>
			</div>
			<div className="content">
				<div className="content-text">
					Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum rhoncus dignissim
					risus, sed consectetur erat. Pellentesque habitant morbi tristique senectus et
					netus et malesuada fames ac turpis egestas. Nullam maximus mauris sit amet odio
					convallis, in pharetra magna gravida. Praesent sed nunc fermentum mi molestie
					tempor. Morbi vitae viverra odio.
				</div>
				<img className="content-img" src="/images/products/about.jpg" alt="contentImg" />
			</div>
		</div>
	</div>
)

export default About
