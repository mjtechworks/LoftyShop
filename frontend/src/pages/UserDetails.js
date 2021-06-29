import React, { useEffect } from "react"
import "./checkout.css"
import HeadingBig from "../components/Typography/HeadingBig"
import { useHistory, useRouteMatch } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Message from "../components/Utils/Message"
import HeadingMid from "../components/Typography/HeadingMid"
import HeadingSmall from "../components/Typography/HeadingSmall"
import Spinner from "../components/Utils/Spin"
import { getSingleUserAdmin, deleteSingleUser } from "../redux/actions/userActions"
import { DELETE_SINGLE_USER_CLEAR, CLEAR_SINGLE_USER_ADMIN } from "../redux/constants/userConstants"
import SmallSpin from "../components/Utils/SmallSpin"

const UserDetails = () => {
	const history = useHistory()
	const match = useRouteMatch()

	const { user } = useSelector((state) => state.user)
	const { user: adminUser, loading, error } = useSelector((state) => state.getSingleUserAdmin)
	const { result, loading: deleteLoading, error: deleteError } = useSelector(
		(state) => state.deleteUser
	)

	const dispatch = useDispatch()

	useEffect(() => {
		if (!user || !user.isAdmin) {
			history.push("/login")
		} else {
			if (result === "success") {
				dispatch({ type: DELETE_SINGLE_USER_CLEAR })
				dispatch({ type: CLEAR_SINGLE_USER_ADMIN })
				history.push("/admin/users")
			} else {
				dispatch(getSingleUserAdmin(match.params.id))
			}
		}
	}, [dispatch, match, history, user, result])

	return loading ? (
		<Spinner />
	) : error ? (
		<Message color="red-message">{error}</Message>
	) : (
		<div className="checkout">
			<div className="checkout-container">
				<div className="checkout-heading">
					<HeadingBig>user details</HeadingBig>
				</div>
				<div className="checkout-summary">
					<div className="checkout-subheading">
						<HeadingMid color="black font-normal">user details</HeadingMid>
					</div>
					<div className="summary-details">
						<div className="summary-heading">
							<HeadingSmall color="dark-grey ">info</HeadingSmall>
							<HeadingSmall color="dark-grey ">details</HeadingSmall>
						</div>
						<div className="summary-items">
							<p className="summary-item">name</p>
							<p className="summary-total">{adminUser.name}</p>
						</div>
						<div className="summary-items">
							<p className="summary-item">email</p>
							<p className="summary-total">{adminUser.email}</p>
						</div>
						<div className="summary-items">
							<p className="summary-item">admin</p>
							<p className="summary-total">{`${adminUser.isAdmin}`}</p>
						</div>
						<div className="summary-items">
							<p className="summary-item">vendor</p>
							<p className="summary-total">{`${adminUser.isVendor}`}</p>
						</div>
						<div className="summary-items">
							<p className="summary-item">register date</p>
							<p className="summary-total">{`${adminUser.createdAt.split("T")[0]} - ${
								adminUser.createdAt.split("T")[1].split(".")[0]
							}`}</p>
						</div>
						<div className="summary-items">
							<p className="summary-item">last profile update</p>
							<p className="summary-total">{`${adminUser.updatedAt.split("T")[0]} - ${
								adminUser.updatedAt.split("T")[1].split(".")[0]
							}`}</p>
						</div>
					</div>
				</div>
				{adminUser.isVendor && (
					<div className="checkout-summary">
						<div className="checkout-subheading">
							<HeadingMid color="black font-normal">vendor details</HeadingMid>
						</div>
						<div className="summary-details">
							<div className="summary-heading">
								<HeadingSmall color="dark-grey ">info</HeadingSmall>
								<HeadingSmall color="dark-grey ">details</HeadingSmall>
							</div>
							<div className="summary-items">
								<p className="summary-item">company Name</p>
								<p className="summary-total">{adminUser.vendor.companyName}</p>
							</div>
							<div className="summary-items">
								<p className="summary-item">full Name</p>
								<p className="summary-total">
									{adminUser.vendor.contactInfo.fullName}
								</p>
							</div>
							<div className="summary-items">
								<p className="summary-item">title</p>
								<p className="summary-total">{`${adminUser.vendor.contactInfo.title}`}</p>
							</div>
							<div className="summary-items">
								<p className="summary-item">street Address</p>
								<p className="summary-total">{`${adminUser.vendor.contactInfo.streetAddress}`}</p>
							</div>
							<div className="summary-items">
								<p className="summary-item">zip</p>
								<p className="summary-total">{`${adminUser.vendor.contactInfo.zip}`}</p>
							</div>
							<div className="summary-items">
								<p className="summary-item">city / state</p>
								<p className="summary-total">{`${adminUser.vendor.contactInfo.city}`}</p>
							</div>
							<div className="summary-items">
								<p className="summary-item">country</p>
								<p className="summary-total">{`${adminUser.vendor.contactInfo.country}`}</p>
							</div>
							<div className="summary-items">
								<p className="summary-item">phone number</p>
								<p className="summary-total">{`${adminUser.vendor.contactInfo.phoneNumber}`}</p>
							</div>
							{Object.keys(adminUser.vendor.socialMedia).map((item) => (
								<div className="summary-items" key={item}>
									<p className="summary-item">{item}</p>
									<a
										href={`https://${adminUser.vendor.socialMedia[item]}`}
										rel="noreferrer"
										target="_blank"
										className="summary-total"
									>{`${adminUser.vendor.socialMedia[item]}`}</a>
								</div>
							))}
						</div>
					</div>
				)}
				{deleteError && <Message color="red-message">{deleteError}</Message>}
				<button
					className="checkout-button red button-relative"
					onClick={() => dispatch(deleteSingleUser(adminUser._id))}
				>
					delete user
					{deleteLoading && (
						<div className="cover-1 ">
							<SmallSpin />
						</div>
					)}
				</button>
			</div>
		</div>
	)
}

export default UserDetails
