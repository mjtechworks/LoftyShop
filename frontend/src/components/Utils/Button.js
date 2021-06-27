import React from "react"
import { Link } from "react-router-dom"
import "./Button.css"
import ForwardIcon from "../../assets/svg/ForwardIcon"
import BackIcon from "../../assets/svg/BackIcon"

function Button(props) {
	let color = `button-link ${props.color}`
	let leftArrow = props.arrow === "yes"

	return (
		<div>
			<Link to={props.link} className={color}>
				{leftArrow ? <BackIcon /> : null}
				{props.children}
				<div className="button-icon">{leftArrow ? null : <ForwardIcon />}</div>
			</Link>
		</div>
	)
}

export default Button
