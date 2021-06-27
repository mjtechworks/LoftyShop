import React from "react"
import "./SideBarButton.css"

const SidebarButton = ({ toggle }) => {
	return (
		<div>
			<div className="sidebarbutton" onClick={toggle}>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default SidebarButton
