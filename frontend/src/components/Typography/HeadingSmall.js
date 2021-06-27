import React from "react"
import "./HeadingSmall.css"

function HeadingSmall(props) {
	let headingSmall = `headingSmall ${props.color}`
	return (
		<div>
			<h3 className={headingSmall}>{props.children}</h3>
		</div>
	)
}

export default HeadingSmall
