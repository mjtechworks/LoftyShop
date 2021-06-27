import React from "react"
import HeroImage from "./HeroImage"
import Gallery from "./Gallery"
import Services from "./Services"
import FeaturedProduct from "./FeaturedProduct"

const Home = () => {
	return (
		<div className="home">
			<HeroImage />
			<Services />
			<FeaturedProduct />
			<Gallery />
		</div>
	)
}

export default Home
