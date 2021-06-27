import React from "react"
import "./footer.css"
import { Link } from "react-router-dom"

const url = (name, other) => {
	return "/" + encodeURIComponent(name) + "/" + encodeURIComponent(other)
}

const Footer = () => (
	<div className="footer" id="footer">
		<div className="footer-container">
			<div>
				<h4>contacts</h4>
				<p>+44 345 678 932</p>
				<p>Logo@gmail.com</p>
				<p>Find a store</p>
			</div>
			<div>
				<h4>customer service</h4>
				<Link style={{ textDecoration: "none" }} to="/contact">
					<p className="link">contact us</p>
				</Link>
				<Link
					style={{ textDecoration: "none" }}
					to={url("customer service", "ordering & payments")}
				>
					<p className="link">ordering & payments</p>
				</Link>
				<Link style={{ textDecoration: "none" }} to={url("customer service", "shipping")}>
					<p className="link">shipping</p>
				</Link>
				<Link style={{ textDecoration: "none" }} to={url("customer service", "returns")}>
					<p className="link">returns</p>
				</Link>
				<Link style={{ textDecoration: "none" }} to={url("customer service", "faq")}>
					<p className="link">FAQ</p>
				</Link>
			</div>
			<div>
				<h4>information</h4>
				<Link style={{ textDecoration: "none" }} to="about">
					<p className="link">about us</p>
				</Link>
				<Link style={{ textDecoration: "none" }} to={url("information", "work with us")}>
					<p className="link">Work with us</p>
				</Link>
				<Link style={{ textDecoration: "none" }} to={url("information", "privacy policy")}>
					<p className="link">privacy policy</p>
				</Link>
				<Link
					style={{ textDecoration: "none" }}
					to={url("information", "terms and conditions")}
				>
					<p className="link">Terms & conditions</p>
				</Link>
				<Link style={{ textDecoration: "none" }} to={url("information", "press enquiries")}>
					<p className="link">press enquiries</p>
				</Link>
			</div>
			<div>
				<p className="subscribe"> Subcribe to our news letter</p>
				<p className="message">
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
				</p>
				<div>
					<input type="email" placeholder="Email Address" />
					<button type="submit">subscribe</button>
				</div>
			</div>
		</div>
	</div>
)

export default Footer
