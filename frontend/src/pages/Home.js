import React from "react"
import HeroImage from "../components/Home/HeroImage"
import Gallery from "../components/Home/Gallery"
import Services from "../components/Home/Services"
import FeaturedProduct from "../components/Home/FeaturedProduct"

const Home = () => {
	return (
		<div>
			<HeroImage />
			<Services />
			<FeaturedProduct />
			<Gallery />
		</div>
	)
}

export default Home
