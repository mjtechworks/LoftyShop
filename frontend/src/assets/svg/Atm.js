import React from "react"
import "./color.css"

function Atm({ color }) {
	return (
		<div className={`atm ${color && color}`}>
			<svg width="20px" height="16px" viewBox="0 0 20 16" version="1.1">
				<title>credit_card</title>
				<desc>Created with Sketch.</desc>
				<g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
					<g id="Outlined" transform="translate(-306.000000, -246.000000)">
						<g id="Action" transform="translate(100.000000, 100.000000)">
							<g
								id="Outlined-/-Action-/-credit_card"
								transform="translate(204.000000, 142.000000)"
							>
								<g>
									<polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
									<path
										d="M20,4 L4,4 C2.89,4 2.01,4.89 2.01,6 L2,18 C2,19.11 2.89,20 4,20 L20,20 C21.11,20 22,19.11 22,18 L22,6 C22,4.89 21.11,4 20,4 Z M20,18 L4,18 L4,12 L20,12 L20,18 Z M20,8 L4,8 L4,6 L20,6 L20,8 Z"
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

export default Atm
