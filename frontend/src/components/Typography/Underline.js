import React from "react"
import "./Underline.css"
import HeadingBig from "./HeadingBig"

function Underline(props) {
	return (
		<div className="underline">
			<HeadingBig>{props.children}</HeadingBig>
		</div>
	)
}

export default Underline
