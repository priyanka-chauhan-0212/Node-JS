// ** React Imports
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

// ** Icons Imports
import { Disc, X, Circle } from 'react-feather';

// ** Config
import themeConfig from '@configs/themeConfig';

const VerticalMenuHeader = (props) => {
	const user = useSelector((state) => state.user.currentUser);
	// ** Props
	const {
		menuCollapsed,
		setMenuCollapsed,
		setMenuVisibility,
		setGroupOpen,
		menuHover,
	} = props;

	// ** Reset open group
	useEffect(() => {
		if (!menuHover && menuCollapsed) setGroupOpen([]);

		// console.log('user ===========', user);
	}, [menuHover, menuCollapsed]);

	// ** Menu toggler component
	const Toggler = () => {
		if (!menuCollapsed) {
			return (
				<Disc
					size={20}
					data-tour="toggle-icon"
					className="text-primary toggle-icon d-none d-xl-block"
					onClick={() => setMenuCollapsed(true)}
				/>
			);
		} else {
			return (
				<Circle
					size={20}
					data-tour="toggle-icon"
					className="text-primary toggle-icon d-none d-xl-block"
					onClick={() => setMenuCollapsed(false)}
				/>
			);
		}
	};

	return (
		<div className="navbar-header">
			<ul className="nav navbar-nav flex-row">
				<li className="nav-item me-auto">
					<NavLink to="/" className="navbar-brand">
						<span className="brandlogoimg">
							<img
								style={{
									width: '90%',
									height: '90%',
									objectFit: 'contain',
								}}
								// src={themeConfig.app.appLogoImage}
								src={
									process.env
										.REACT_APP_BACKEND_API_URL +
										`${
											user && user.brand_logo
										}` ||
									'https://nps.ourtempurl.xyz/admin/assets/brand_logo/1646622476_FieldTheoryLab_Horizontal_transparent.png'
								}
								// src="https://nps.ourtempurl.xyz/admin/assets/brand_logo/1646622476_FieldTheoryLab_Horizontal_transparent.png"
								alt="logo"
							/>
						</span>
						{/* <h2 className="brand-text mb-0">
							{themeConfig.app.appName}
						</h2> */}
					</NavLink>
				</li>
				<li className="nav-item nav-toggle">
					<div className="nav-link modern-nav-toggle cursor-pointer">
						{/* <Toggler /> */}
						<X
							onClick={() => setMenuVisibility(false)}
							className="toggle-icon icon-x d-block d-xl-none"
							size={20}
						/>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default VerticalMenuHeader;
