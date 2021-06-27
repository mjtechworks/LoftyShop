import React from "react"
import HeadingBig from "../Typography/HeadingBig"

const UserDetails = ({
	name,
	nameChange,
	email,
	emailChange,
	password,
	passwordChange,
	confirmPassword,
	confirmPasswordChange,
	changeChecked,
	checked,
}) => {
	return (
		<div className="Profiles">
			<div className="Profile-heading">
				<HeadingBig>User details</HeadingBig>
			</div>
			<div className="Profile-details">
				<div className="Profile-input">
					<label htmlFor="name">name</label>
					<input type="text" name="name" id="name" value={name} onChange={nameChange} />
				</div>
				<div className="Profile-input">
					<label htmlFor="email">email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={emailChange}
					/>
				</div>
				<div className="Profile-checkbox">
					<input
						type="checkbox"
						name="passwordChange"
						id="passwordChange"
						onChange={(e) => changeChecked(e.target.checked)}
						checked={checked}
					/>
					<label htmlFor="passwordChange">change Password</label>
				</div>
				{checked && (
					<>
						<div className="Profile-input">
							<label htmlFor="password">New Password</label>
							<input
								type="password"
								name="password"
								id="password"
								value={password}
								onChange={passwordChange}
							/>
						</div>
						<div className="Profile-input">
							<label htmlFor="confirmPassword">Confirm password</label>
							<input
								type="password"
								name="confirmPassword"
								id="confirmPassword"
								value={confirmPassword}
								onChange={confirmPasswordChange}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default UserDetails
