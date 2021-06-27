import React from "react"
import "./UserList.css"
import HeadingBig from "../components/Typography/HeadingBig"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Spinner from "../components/Utils/Spin"
import Message from "../components/Utils/Message"
import Pagination from "../components/Utils/Pagination"
import { useHistory, useLocation } from "react-router-dom"
import { getAllUsers } from "../redux/actions/userActions"
import Marked from "../assets/svg/Marked"
import Cancel from "../assets/svg/Cancel"

const UserList = () => {
	const dispatch = useDispatch()

	const history = useHistory()
	const search = useLocation().search

	const { user } = useSelector((state) => state.user)

	useEffect(() => {
		if (!user || !user.isAdmin) {
			history.push("/login")
		} else {
			const newPage = search ? search.split("=")[1] : null
			dispatch(getAllUsers(newPage))
		}
	}, [dispatch, history, user, search])

	const allUsers = useSelector((state) => state.getAllUsersList)
	const { loading, users, error } = allUsers

	return (
		<div className="userList">
			<div className="userList-container">
				<div className="userList-heading">
					<HeadingBig>
						{users?.users?.length === 0 ? "no users" : "users list"}
					</HeadingBig>
				</div>
				{loading ? (
					<Spinner />
				) : error ? (
					<Message color="red-message">{error}</Message>
				) : (
					users.users.length > 0 && (
						<>
							<div className="userList-details">
								<div className="userList-details-heading">
									<p>name</p>
									<p>email</p>
									<p>isVendor</p>
									<p>isAdmin</p>
									<p>Register Date</p>
									<p>Company Name</p>
									<p></p>
								</div>
								<div className="userList-details-items">
									{users.users.map((user) => {
										return (
											<div key={user._id} className="userList-details-item">
												<p>{user.name}</p>

												<p>{user.email}</p>
												<p>{user.isVendor ? <Marked /> : <Cancel />}</p>
												<p>{user.isAdmin ? <Marked /> : <Cancel />}</p>
												<p>{user.createdAt.split("T")[0]}</p>
												<p>
													{user.isVendor ? user.vendor.companyName : "-"}
												</p>
												<button
													onClick={() =>
														history.push(`/admin/users/${user._id}`)
													}
												>
													details
												</button>
											</div>
										)
									})}
								</div>
							</div>
							{+users.totalPages > 1 && (
								<Pagination
									pages={users.totalPages}
									currentPage={users.currentPage}
								/>
							)}
						</>
					)
				)}
			</div>
		</div>
	)
}

export default UserList
