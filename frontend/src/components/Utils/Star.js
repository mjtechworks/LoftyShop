import React from "react"
import HalfStar from "../../assets/svg/halfStar"
import FullStar from "../../assets/svg/fullStar"
import EmptyStar from "../../assets/svg/emptyStar"
import "./star.css"

const Star = ({ ratings }) => {
	return (
		<div className="star">
			{ratings > 0 ? ratings > 0.5 ? <FullStar /> : <HalfStar /> : <EmptyStar />}
			{ratings > 1 ? ratings > 1.5 ? <FullStar /> : <HalfStar /> : <EmptyStar />}
			{ratings > 2 ? ratings > 2.5 ? <FullStar /> : <HalfStar /> : <EmptyStar />}
			{ratings > 3 ? ratings > 3.5 ? <FullStar /> : <HalfStar /> : <EmptyStar />}
			{ratings > 4 ? ratings > 4.5 ? <FullStar /> : <HalfStar /> : <EmptyStar />}
		</div>
	)
}

export default Star
