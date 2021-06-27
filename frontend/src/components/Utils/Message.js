import React from "react"
import "./Message.css"

const Message = ({ children, color }) => {
	const name = `message red-message ${color}`
	return <div className={name}>{children}</div>
}

export default Message
