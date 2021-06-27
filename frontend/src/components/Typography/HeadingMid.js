import React from "react"
import "./HeadingMid.css"

function HeadingMid(props) {
	let headingMid = `headingMid ${props.color}`
	return <div className={headingMid}>{props.children}</div>
}

export default HeadingMid
