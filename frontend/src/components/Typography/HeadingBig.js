import React from "react"
import "./HeadingBig.css"

function HeadingBig(props) {
	const heading = `big-heading ${props.color}`
	return (
		<div>
			<p className={heading}>{props.children}</p>
		</div>
	)
}

export default HeadingBig
