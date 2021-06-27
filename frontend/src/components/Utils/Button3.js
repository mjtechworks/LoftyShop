import React from "react"
import "./Button3.css"

function Button(props) {
	let color = `button3 ${props.color}`

	return <button className={color}>{props.children}</button>
}

export default Button
