import React from "react"
import "./Modal.css"

const Modal = ({ toggle, sidebarHandle }) => {
	let modal

	if (sidebarHandle) {
		modal = "modal show-modal"
	} else {
		modal = "modal close-modal"
	}

	return sidebarHandle ? <div className={modal} onClick={toggle}></div> : null
}

export default Modal
