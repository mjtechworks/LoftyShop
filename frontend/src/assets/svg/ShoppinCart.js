import React from "react"
import "./color.css"

function ShoppinCart(props) {
	let color = `shopping-cart ${props.color}`
	return (
		<div className={color}>
			<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
				<title>shopping_cart</title>
				<desc>Created with Sketch.</desc>
				<g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
					<g id="Outlined" transform="translate(-169.000000, -464.000000)">
						<g id="Action" transform="translate(100.000000, 100.000000)">
							<g
								id="Outlined-/-Action-/-shopping_cart"
								transform="translate(68.000000, 362.000000)"
							>
								<g>
									<polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
									<path
										d="M15.55,13 C16.3,13 16.96,12.59 17.3,11.97 L20.88,5.48 C21.25,4.82 20.77,4 20.01,4 L5.21,4 L4.27,2 L1,2 L1,4 L3,4 L6.6,11.59 L5.25,14.03 C4.52,15.37 5.48,17 7,17 L19,17 L19,15 L7,15 L8.1,13 L15.55,13 Z M6.16,6 L18.31,6 L15.55,11 L8.53,11 L6.16,6 Z M7,18 C5.9,18 5.01,18.9 5.01,20 C5.01,21.1 5.9,22 7,22 C8.1,22 9,21.1 9,20 C9,18.9 8.1,18 7,18 Z M17,18 C15.9,18 15.01,18.9 15.01,20 C15.01,21.1 15.9,22 17,22 C18.1,22 19,21.1 19,20 C19,18.9 18.1,18 17,18 Z"
										id="🔹-Icon-Color"
										fill="#1D1D1D"
									></path>
								</g>
							</g>
						</g>
					</g>
				</g>
			</svg>
		</div>
	)
}

export default ShoppinCart
