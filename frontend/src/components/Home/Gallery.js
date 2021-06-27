import React from "react"
import "./Gallery.css"
import big1 from "../../assets/gallery/big1.jpg"
import big2 from "../../assets/gallery/big2.jpg"
import big3 from "../../assets/gallery/big3.jpg"
import mid1 from "../../assets/gallery/mid1.jpg"
import mid2 from "../../assets/gallery/mid2.jpg"
import mid3 from "../../assets/gallery/mid3.jpg"
import mid4 from "../../assets/gallery/mid4.jpg"
import mid5 from "../../assets/gallery/mid5.jpg"
import mid6 from "../../assets/gallery/mid6.jpg"
import mid7 from "../../assets/gallery/mid7.jpg"
import tiny1 from "../../assets/gallery/tiny2.jpg"
import tiny2 from "../../assets/gallery/tiny1.jpg"
import tiny3 from "../../assets/gallery/tiny3.jpg"
import big4 from "../../assets/gallery/big4.jpg"
import logo1 from "../../assets/Partners/Layer 11.png"
import logo2 from "../../assets/Partners/Layer 1.png"
import logo3 from "../../assets/Partners/brand2.png"
import logo4 from "../../assets/Partners/brand3.png"
import logo5 from "../../assets/Partners/brand4.png"
import logo6 from "../../assets/Partners/brand5.png"
import Underline from "../Typography/Underline"
import HeadingMid from "../Typography/HeadingMid"

function Gallery() {
	return (
		<div className="gallery">
			<div className="gallery-text">
				<Underline>we suit your every need</Underline>
			</div>
			<div className="gallery-image">
				<figure className="gallery-image-1">
					<img src={big1} alt="gallery item 1" className="gallery-image-item" />
				</figure>
				<figure className="gallery-image-2">
					<img src={big2} alt="gallery item 2" className="gallery-image-item" />
				</figure>
				<figure className="gallery-image-3">
					<img src={big3} alt="gallery item 3" className="gallery-image-item" />
				</figure>
				<figure className="gallery-image-4">
					<img src={mid1} alt="gallery item 4" className="gallery-image-item" />
				</figure>
				<figure className="gallery-image-5">
					<img src={mid2} alt="gallery item 5" className="gallery-image-item" />
				</figure>
				<figure className="gallery-image-6">
					<img src={mid3} alt="gallery item 6" className="gallery-image-item" />
				</figure>
				<figure className="gallery-image-7">
					<img src={mid4} alt="gallery item 7" className="gallery-image-item" />
				</figure>
				<figure className="gallery-image-8">
					<img src={mid5} alt="gallery item 8" className="gallery-image-item" />
				</figure>
				<figure className="gallery-image-9">
					<img src={mid6} alt="gallery item 9" className="gallery-image-item" />
				</figure>
				<figure className="gallery-image-10">
					<img src={mid7} alt="gallery item 10" className="gallery-image-item" />
				</figure>
				<figure className="gallery-image-11">
					<img src={tiny1} alt="gallery item 11" className="gallery-image-item" />
				</figure>
				<figure className="gallery-image-12">
					<img src={tiny2} alt="gallery item 12" className="gallery-image-item" />
				</figure>
				<figure className="gallery-image-13">
					<img src={tiny3} alt="gallery item 13" className="gallery-image-item" />
				</figure>
				<figure className="gallery-image-14">
					<img src={big4} alt="gallery item 14" className="gallery-image-item" />
				</figure>
			</div>
			<div className="partners">
				<div className="partners-text">
					<HeadingMid color="light-grey">trusted partners</HeadingMid>
				</div>
				<div className="partners-image">
					<img src={logo1} alt="partner 1" className="partners-image-s" />
					<img src={logo2} alt="partner 2" className="partners-image-s" />
					<img src={logo3} alt="partner 3" className="partners-image-s" />
					<img src={logo4} alt="partner 4" className="partners-image-s" />
					<img src={logo5} alt="partner 5" className="partners-image-s" />
					<img src={logo6} alt="partner 6" className="partners-image-s" />
				</div>
			</div>
		</div>
	)
}

export default Gallery
