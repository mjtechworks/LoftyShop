import React from "react"
import "./Button2.css"

function Button2(props) {
	let color = `button2 ${props.color}`

	return (
		<button type={props.type ? props.type : "submit"} className={color}>
			{props.children}
		</button>
	)
}

export default Button2
