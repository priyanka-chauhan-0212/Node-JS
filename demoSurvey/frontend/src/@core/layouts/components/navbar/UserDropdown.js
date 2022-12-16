// ** React Imports
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import {
	User,
	Mail,
	CheckSquare,
	MessageSquare,
	Settings,
	CreditCard,
	HelpCircle,
	Power,
	Grid,
} from 'react-feather';
import { useHistory } from 'react-router-dom';

// ** Reactstrap Imports
import {
	UncontrolledDropdown,
	DropdownMenu,
	DropdownToggle,
	DropdownItem,
} from 'reactstrap';

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { toast } from 'react-toastify';
import {
	ErrorToast,
	SuccessToast,
} from '../../../../container/components/ToastComponent';
import * as types from '../../../../redux/constants/actionTypes';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../../../../container/utils/axiosInstance';
import { ROUTE_SIGN_IN } from '../../../../router/routes';
import { LOG_OUT_USER_API_PATH } from '../../../../ApiRoutes/ApiRoutes';
const UserDropdown = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.currentUser);

	const handleLogout = () => {
		axiosInstance.post(LOG_OUT_USER_API_PATH).then((res) => {
			if (res.data.success == 1) {
				// localStorage.clear();
				localStorage.removeItem('accessTokenNew');
				dispatch({
					type: types.LOG_OUT,
				});
				toast.success(
					<SuccessToast message={'Logged Out Successfully!'} />
				);
				history.push(ROUTE_SIGN_IN);
			} else {
				toast.error(
					<ErrorToast message={'Something went wrong !'} />
				);
			}
		});
	};

	return (
		<UncontrolledDropdown tag="li" className="dropdown-user nav-item">
			<DropdownToggle
				href="/"
				tag="a"
				className="nav-link dropdown-user-link"
				onClick={(e) => e.preventDefault()}
			>
				<div className="user-nav d-sm-flex d-none">
					<span className="user-name fw-bold mt-1">
						{user && user.name.toUpperCase()}
					</span>
					{/* <span className="user-status">Admin</span> */}
				</div>
				<Avatar
					img={
						user && user.profile_pic
							? process.env.REACT_APP_BACKEND_API_URL +
							  `${user.profile_pic}`
							: defaultAvatar
					}
					imgHeight="40"
					imgWidth="40"
					status="online"
				/>
			</DropdownToggle>
			<DropdownMenu end>
				<DropdownItem
					tag={Link}
					to="/profile"
					// onClick={(e) => e.preventDefault()}
				>
					<User size={14} className="me-75" />
					<span className="align-middle">Profile</span>
				</DropdownItem>

				{/* <DropdownItem tag={Link} to='/' onClick={e => e.preventDefault()}>
          <Mail size={14} className='me-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/' onClick={e => e.preventDefault()}>
          <CheckSquare size={14} className='me-75' />
          <span className='align-middle'>Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/' onClick={e => e.preventDefault()}>
          <MessageSquare size={14} className='me-75' />
          <span className='align-middle'>Chats</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/pages/' onClick={e => e.preventDefault()}>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/' onClick={e => e.preventDefault()}>
          <CreditCard size={14} className='me-75' />
          <span className='align-middle'>Pricing</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/' onClick={e => e.preventDefault()}>
          <HelpCircle size={14} className='me-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem> */}

				<DropdownItem tag={Link} onClick={handleLogout}>
					<Power size={14} className="me-75" />
					<span className="align-middle">Logout</span>
				</DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown>
	);
};

export default UserDropdown;
