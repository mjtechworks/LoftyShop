import React from "react"
import { NavLink } from "react-router-dom"
import "./Sidebar.css"
import Modal from "./Modal"

const Sidebar = ({ sidebarHandle, toggle }) => {
	let sidebarValue = sidebarHandle ? "sidebar open-sidebar" : "sidebar close-sidebar"

	return (
		<div>
			<Modal sidebarHandle={sidebarHandle} toggle={toggle} />

			<div>
				<div className={sidebarValue}>
					<div className="sidebar-close-button" onClick={toggle}>
						X
					</div>
					<ul className="nav-links">
						<img src="/images/Untitled-1.png" alt="" className="logo-image" />
						<li onClick={toggle}>
							<NavLink
								exact
								activeStyle={{ color: "var(--light-blue" }}
								to="/"
								className="links"
							>
								Home
							</NavLink>
						</li>
						<li onClick={toggle}>
							<NavLink
								exact
								activeStyle={{ color: "var(--light-blue" }}
								to="/shop"
								className="links"
							>
								shop
							</NavLink>
						</li>
						<li onClick={toggle}>
							<NavLink
								exact
								activeStyle={{ color: "var(--light-blue" }}
								to="/women"
								className="links"
							>
								women
							</NavLink>
						</li>
						<li onClick={toggle}>
							<NavLink
								exact
								activeStyle={{ color: "var(--light-blue" }}
								to="/men"
								className="links"
							>
								men
							</NavLink>
						</li>
						<li onClick={toggle}>
							<NavLink
								exact
								activeStyle={{ color: "var(--light-blue" }}
								to="/about"
								className="links"
							>
								about
							</NavLink>
						</li>
						<li onClick={toggle}>
							<NavLink
								exact
								activeStyle={{ color: "var(--light-blue" }}
								to="/contact"
								className="links"
							>
								contact
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
