/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable prefer-const */
/* eslint-disable no-tabs */
import React, { useEffect, useState, Suspense, lazy } from "react";
import { Row, Col, Button } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import Breadcrumbs from "../../container/components/Breadcrumb";
import Loading from "../../../src/@core/components/spinner/Fallback-spinner";
import Meta from "../../container/utils/meta";
import { getRandomColors } from "../../container/utils/randomColors";
import axiosInstance from "../../container/utils/axiosInstance";
import { EMPTY_ARRAY, NULL } from "../../container/constants/commonConstants";
import { Container, Box } from "./Styled";
import Check from "../../container/assets/check.svg";
import Uncheck from "../../container/assets/uncheck.svg";
import _map from "lodash/map";
import _get from "lodash/get";
import AddIconToLibrary from "../../container/utils/fontAwesomeIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faChartBar,
  faEllipsisV,
  faCircle,
  faEyes,
} from "@fortawesome/free-solid-svg-icons";
AddIconToLibrary([faUserFriends, faChartBar, faEllipsisV, faCircle]);
import { Responsive, WidthProvider } from "react-grid-layout";
import moment from "moment";
import Flatpickr from "react-flatpickr";
import { DateRangePicker } from "rsuite";
import { Pagination } from "antd";
import Skeleton from "@mui/material/Skeleton";
import { withSize } from "react-sizeme";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Actions from "../../redux/actions";
import { Eye, Grid } from "react-feather";
import { toast } from "react-toastify";
import {
  ErrorToast,
  SuccessToast,
} from "../../container/components/ToastComponent";
import { MultiSelect } from "react-multi-select-component";
import * as types from "../../redux/constants/actionTypes";

import {
  GET_DASHBOARD_DETAILS_API_PATH,
  SAVE_LAYOUT_API_PATH,
} from "../../ApiRoutes/ApiRoutes";

import Select from "react-select";

// ** css import
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "antd/dist/antd.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "rsuite/dist/rsuite.min.css";

// ** Components import
// import PieChart from "./PieChart.jsx";
// import WordCloud from "./WordCloud";
// import LineChart from "./LineChart.jsx";

// const PieChart = lazy(() => import('./PieChart.jsx'));
// const WordCloud = lazy(() => import('./WordCloud'));
// const LineChart = lazy(() => import('./LineChart.jsx'));

const ResponsiveGridLayout = WidthProvider(Responsive);

// const layoutFresh = {
//   lg: [
//     {
//       w: 3,
//       h: 1,
//       x: 0,
//       y: 0,
//       minW: 2,
//       i: "1",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 3,
//       h: 1,
//       x: 3,
//       minW: 2,
//       y: 0,
//       i: "2",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 3,
//       h: 2,
//       x: 0,
//       y: 1,
//       i: "3",
//       minW: 2,
//       minH: 2,
//       moved: false,
//       static: false,
//     },
//     {
//       w: 3,
//       h: 2,
//       x: 3,
//       y: 1,
//       i: "4",
//       minW: 2,
//       minH: 2,
//       moved: false,
//       static: false,
//     },
//     {
//       w: 6,
//       h: 2.4,
//       x: 6,
//       y: 0,
//       i: "5",
//       minW: 4,
//       minH: 2.4,
//       moved: false,
//       static: false,
//     },
//     {
//       w: 6,
//       h: 2,
//       x: 0,
//       y: 3,
//       i: "6",
//       minW: 4,
//       minH: 2,
//       moved: false,
//       static: false,
//     },
//     {
//       w: 6,
//       h: 2.5,
//       x: 6,
//       y: 2.4,
//       i: "7",
//       minW: 2,
//       minH: 2.5,
//       moved: false,
//       static: false,
//     },
//   ],
//   md: [
//     {
//       w: 1,
//       h: 1,
//       x: 0,
//       y: 0,
//       i: "1",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 1,
//       h: 1,
//       x: 1,
//       y: 0,
//       i: "2",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 1,
//       h: 1,
//       x: 2,
//       y: 0,
//       i: "3",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 1,
//       h: 1,
//       x: 3,
//       y: 0,
//       i: "4",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 1,
//       h: 1,
//       x: 4,
//       y: 0,
//       i: "5",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 1,
//       h: 1,
//       x: 0,
//       y: 1,
//       i: "6",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 1,
//       h: 1,
//       x: 0,
//       y: 2,
//       i: "7",
//       moved: false,
//       static: false,
//     },
//   ],
//   sm: [
//     {
//       w: 3,
//       h: 1,
//       x: 0,
//       y: 0,
//       i: "1",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 1,
//       h: 1,
//       x: 1,
//       y: 1,
//       i: "2",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 1,
//       h: 1,
//       x: 2,
//       y: 1,
//       i: "3",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 1,
//       h: 1,
//       x: 3,
//       y: 0,
//       i: "4",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 1,
//       h: 1,
//       x: 4,
//       y: 0,
//       i: "5",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 1,
//       h: 1,
//       x: 0,
//       y: 1,
//       i: "6",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 1,
//       h: 1,
//       x: 0,
//       y: 2,
//       i: "7",
//       moved: false,
//       static: false,
//     },
//   ],
// };

// const getLayouts = () => {
//   const savedLayouts = localStorage.getItem("grid-layout");
//   const savedLayoutsFromDb = localStorage.getItem("savedGridLayout");

//   if (
//     savedLayoutsFromDb == null ||
//     savedLayoutsFromDb == undefined ||
//     JSON.parse(savedLayoutsFromDb) == null ||
//     JSON.parse(savedLayoutsFromDb) == undefined
//   ) {
//     return { lg: layoutFresh.lg };
//   } else {
//     return { lg: JSON.parse(savedLayoutsFromDb).lg };
//   }

//   // return { lg: layoutFresh.lg };
// };

export const Home = (props) => {
  // // const [dashboardDetails, setDashboardDetails] = useState({});
  // const dispatch = useDispatch();
  // // const dataDash = useSelector((state) => state.user.dashboardDetails);
  // const history = useHistory();
  // const [state, setState] = useState({
  // 	loading: false,
  // 	filter: 'daily',
  // 	startDate: '',
  // 	endDate: '',
  // 	lineChartDetails: NULL,
  // 	userList: EMPTY_ARRAY,
  // 	paginatedData: [],
  // 	selectedUser: '',
  // 	allKeyword: [],
  // 	topKeywords: [],
  // 	currentPage: 1,
  // 	pageSize: 4,
  // 	dashboardDetails: {},
  // 	contentLoader: false,
  // 	picker: new Date(),
  // 	layoutLoading: false,
  // });

  // const [selected, setSelected] = useState([]);
  // const [netPromoterScore, setNetPromoterScore] = useState(true);

  // // console.log("netPromoterScore",netPromoterScore);

  // const optionsForSelect = [
  // 	{ label: 'Net Promoter Score', value: 'netPromoterScore' },
  // 	{ label: 'Number of Respondents', value: 'numberOfRespondents' },
  // 	{ label: 'Latest Comments', value: 'latestComments' },
  // 	{ label: 'User Totals', value: 'userTotals' },
  // 	{ label: 'Promoters vs Detractors', value: 'promotersVsDetractors' },
  // 	{ label: 'Survey Responses', value: 'surveyResponses' },
  // 	{ label: 'Top Keywords', value: 'topKeywords' },
  // ];

  // const changeMultiSelect = (e) => {
  // 	setSelected(e);

  // 	if (e && e.length > 1) {
  // 		e.map((data) => {
  // 			setNetPromoterScore(
  // 				data.value == 'netPromoterScore' ? true : false
  // 			);
  // 		});
  // 	}
  // };

  // const saveUserLayout = () => {
  // 	setState({
  // 		...state,
  // 		layoutLoading: true,
  // 	});
  // 	let layoutData = localStorage.getItem('grid-layout');

  // 	let data = {
  // 		layoutData: layoutData,
  // 	};

  // 	axiosInstance
  // 		.post(SAVE_LAYOUT_API_PATH, data)
  // 		.then((res) => {
  // 			if (res.data.success === 1) {
  // 				localStorage.setItem('savedGridLayout', layoutData);

  // 				toast.success(
  // 					<SuccessToast
  // 						message={'Layout saved Successfully!'}
  // 					/>
  // 				);
  // 				setState({
  // 					...state,
  // 					layoutLoading: false,
  // 				});
  // 			} else {
  // 				toast.error(
  // 					<ErrorToast message={'Error in saving layout!'} />
  // 				);
  // 				setState({
  // 					...state,
  // 					layoutLoading: false,
  // 				});
  // 			}
  // 		})
  // 		.catch((e) => {
  // 			setState({
  // 				...state,
  // 				layoutLoading: false,
  // 			});
  // 		});
  // };

  // //window width find ---
  // // const [screenSize, getDimension] = useState({
  // // 	dynamicWidth: window.innerWidth,
  // // 	dynamicHeight: window.innerHeight,
  // // });
  // // const setDimension = () => {
  // // 	getDimension({
  // // 		dynamicWidth: window.innerWidth,
  // // 		dynamicHeight: window.innerHeight,
  // // 	});
  // // };

  // // // console.log('size ----', screenSize.dynamicWidth);
  // // useEffect(() => {
  // // 	window.addEventListener('resize', setDimension);

  // // 	return () => {
  // // 		window.removeEventListener('resize', setDimension);
  // // 	};
  // // }, [screenSize]);

  // useEffect(async () => {
  // 	const { getDashboardDetails, dashboardDetails } = props;
  // 	setState({
  // 		...state,

  // 		contentLoader: true,
  // 	});
  // 	let data = {
  // 		start_date: state.startDate,
  // 		end_date: state.endDate,
  // 	};

  // 	const colors = ['#bce897', '#faca00', '#e95432', '#779ce6'];

  // 	axiosInstance
  // 		.post(GET_DASHBOARD_DETAILS_API_PATH, data)
  // 		.then((response) => {
  // 			if (response.data.success === 1) {
  // 				if (
  // 					response.data &&
  // 					response.data.data.net_promoter_score == 0
  // 				) {
  // 					toast.error(
  // 						<ErrorToast message={'No data found !'} />
  // 					);
  // 				}
  // 				dispatch({
  // 					type: types.DASHBOARD_DETAILS,
  // 					data: response.data.data,
  // 				});

  // 				let dataDash = response.data.data;

  // 				let userList12 =
  // 					dataDash &&
  // 					dataDash.recent_respondent_comments.map(
  // 						(list) => {
  // 							return {
  // 								...list,
  // 								color: getRandomColors(),
  // 							};
  // 						}
  // 					);

  // 				let lineChartDetails12 =
  // 					dataDash && dataDash.survey_responses;

  // 				setState({
  // 					...state,
  // 					allKeyword: dataDash && dataDash.all_keywords,
  // 					topKeywords: dataDash && dataDash.top_keywords,
  // 					userList: userList12,
  // 					paginatedData: userList12.slice(0, 4),
  // 					lineChartDetails: lineChartDetails12,
  // 					dashboardDetails: dataDash,
  // 					loading: false,
  // 					contentLoader: false,
  // 				});

  // 				// setState({
  // 				// 	...state,
  // 				// 	loading: false,
  // 				// 	contentLoader: false,
  // 				// 	// dashboardDetails: dashboardDetails,
  // 				// });
  // 			} else {
  // 				toast.error(
  // 					<ErrorToast message={'No data found !'} />
  // 				);
  // 			}
  // 		})
  // 		.catch((error) => {
  // 			setState({
  // 				...state,
  // 				loading: false,
  // 				contentLoader: false,
  // 			});
  // 		});

  // 	// await getDashboardDetails(data, history).then(() => {
  // 	// 	setState({
  // 	// 		...state,
  // 	// 		// loading: false,
  // 	// 		contentLoader: false,
  // 	// 		// dashboardDetails: dashboardDetails,
  // 	// 	});
  // 	// });
  // }, [state.startDate, state.endDate]);

  // // useEffect(() => {
  // // 	let userList12 =
  // // 		dataDash &&
  // // 		dataDash.recent_respondent_comments.map((list) => {
  // // 			return {
  // // 				...list,
  // // 				color: getRandomColors(),
  // // 			};
  // // 		});

  // // 	let lineChartDetails12 = dataDash && dataDash.survey_responses;

  // // 	dataDash &&
  // // 		setState({
  // // 			...state,
  // // 			allKeyword: dataDash && dataDash.all_keywords,
  // // 			topKeywords: dataDash && dataDash.top_keywords,
  // // 			userList: userList12,
  // // 			paginatedData: userList12.slice(0, 4),
  // // 			lineChartDetails: lineChartDetails12,
  // // 			dashboardDetails: dataDash,
  // // 			loading: false,
  // // 			contentLoader: false,
  // // 		});
  // // }, [dataDash]);

  // const handlePagination = (page) => {
  // 	const upperLimit = page * state.pageSize;
  // 	const dataSlice = state.userList.slice(
  // 		upperLimit - state.pageSize,
  // 		upperLimit
  // 	);

  // 	setState({
  // 		...state,
  // 		paginatedData: dataSlice,
  // 		currentPage: page,
  // 	});
  // };

  // const handleCommentClick = (list) => {
  // 	let url = `/feedback?comment_id=${list.id}`;
  // 	history.push(url);

  // 	// if (state.selectedUser === list.id) {
  // 	// 	setState({
  // 	// 		...state,
  // 	// 		selectedUser: '',
  // 	// 	});
  // 	// } else {
  // 	// 	setState({
  // 	// 		...state,
  // 	// 		selectedUser: list.id,
  // 	// 	});
  // 	// }
  // };

  // const handleDateChange = (e) => {
  // 	if (e != null) {
  // 		setState({
  // 			...state,
  // 			startDate: e[0] && moment(e[0]).format('YYYY-MM-DD'), // moment(e[0]).format('YYYY-MM-DD'),
  // 			endDate: e[1] && moment(e[1]).format('YYYY-MM-DD'), // moment(e[1]).format('YYYY-MM-DD'),
  // 		});
  // 	}
  // };

  // const handleClean = (e) => {
  // 	setState({
  // 		...state,
  // 		startDate: '',
  // 		endDate: '',
  // 	});
  // };

  // const handleLayoutChange = (layout, layouts) => {
  // 	localStorage.setItem('grid-layout', JSON.stringify(layouts));
  // };

  return (
    // <>
    // 	{state.loading ? (
    // 		<Loading />
    // 	) : (
    // 		<Suspense fallback={<Loading />}>
    // 			<Container className="container">
    // 				<Meta title="Overview" description="" />
    // 				<div className="topRowBreadcumbAndSaveButton">
    // 					<Breadcrumbs
    // 						data={['Dashboard', 'Overview']}
    // 					/>
    // 					<Button
    // 						className="saveLayoutButton"
    // 						color="primary"
    // 						onClick={saveUserLayout}
    // 					>
    // 						{state.layoutLoading ? (
    // 							'Saving ...'
    // 						) : (
    // 							<>
    // 								<Grid
    // 									size={18}
    // 									style={{
    // 										marginRight: '12px',
    // 									}}
    // 								/>
    // 								Save Layout
    // 							</>
    // 						)}
    // 					</Button>
    // 				</div>
    // 				{/* <Col md="4">
    // 				<pre>{JSON.stringify(selected)}</pre>
    // 				<div style={{ zIndex: 0 }}>
    // 					<Select options={optionsForSelect} isMulti />
    // 					<MultiSelect
    // 						options={optionsForSelect}
    // 						value={selected}
    // 						onChange={changeMultiSelect}
    // 						labelledBy="Select"
    // 					/>
    // 				</div>
    // 			</Col> */}
    // 				<div>
    // 					{/* <Flatpickr
    // 					placeholder="Select Date Range"
    // 					size="lg"
    // 					placement="bottom"
    // 					appearance="default"
    // 					monthSelectorType="static"
    // 					style={{
    // 						justifyContent: 'center',
    // 						marginLeft: '17px',
    // 						width: 220,
    // 						align: 'center',
    // 						// border: '0.1px solid black',
    // 						background: 'white',
    // 						borderRadius: '5px',
    // 						float: 'right',
    // 						marginRight: '20px',
    // 					}}
    // 					// value={new Date()}
    // 					id="range-picker"
    // 					className="form-control"
    // 					onChange={handleDateChange}
    // 					options={{
    // 						mode: 'range',
    // 						// defaultDate: [
    // 						// 	'2020-02-01',
    // 						// 	'2020-02-15',
    // 						// ],
    // 					}}
    // 				/> */}
    // 					<DateRangePicker
    // 						showOneCalendar
    // 						onClean={handleClean}
    // 						disabledDate={DateRangePicker.after(
    // 							new Date()
    // 						)}
    // 						onChange={handleDateChange}
    // 						// onChange={(date) => console.log(date)}
    // 						placement="bottom"
    // 						appearance="default"
    // 						placeholder="Select Date Range"
    // 						size="lg"
    // 						style={{
    // 							justifyContent: 'center',
    // 							marginLeft: '17px',
    // 							width: 220,
    // 							align: 'center',
    // 							// border: '0.1px solid black',
    // 							borderRadius: '5px',
    // 							float: 'right',
    // 							marginRight: '20px',
    // 						}}
    // 					/>
    // 				</div>

    // 				<div className="title">Overview</div>
    // 				<ResponsiveGridLayout
    // 					isDraggable
    // 					isRearrangeable
    // 					isResizable
    // 					draggableHandle=".respondents-comments-title,.promoters-title,.number"
    // 					breakpoints={{
    // 						lg: 1280,
    // 						md: 992,
    // 						sm: 767,
    // 						xs: 480,
    // 						xxs: 0,
    // 					}}
    // 					cols={{
    // 						lg: 12,
    // 						md: 10,
    // 						sm: 6,
    // 						xs: 4,
    // 						xxs: 2,
    // 					}}
    // 					className="layout"
    // 					// layout={staticLayout}
    // 					layouts={getLayouts()}
    // 					// layouts={{ lg: staticLayout }}
    // 					onLayoutChange={handleLayoutChange}
    // 				>
    // 					<div
    // 						className="card score"
    // 						key="1"
    // 						// data-grid={{ x: 0, y: 0, w: 3, h: 1 }}
    // 					>
    // 						{state.contentLoader ? (
    // 							<>
    // 								<Skeleton
    // 									animation="wave"
    // 									style={{
    // 										width: '70%',
    // 									}}
    // 								/>
    // 								<Skeleton
    // 									animation="wave"
    // 									style={{
    // 										width: '80%',
    // 									}}
    // 								/>
    // 							</>
    // 						) : (
    // 							<div>
    // 								<div className="number">
    // 									{_get(
    // 										state.dashboardDetails,
    // 										'net_promoter_score',
    // 										NULL
    // 									)}
    // 								</div>
    // 								<div className="number-text">
    // 									Net Promoter Score
    // 								</div>
    // 								<div className="overlay1">
    // 									<FontAwesomeIcon
    // 										icon={[
    // 											'fas',
    // 											'chart-bar',
    // 										]}
    // 									/>
    // 								</div>
    // 							</div>
    // 						)}
    // 					</div>

    // 					<div
    // 						className="card respondents"
    // 						key="2"
    // 						// data-grid={{ x: 3, y: 0, w: 3, h: 1 }}
    // 					>
    // 						{state.contentLoader ? (
    // 							<>
    // 								<Skeleton
    // 									animation="wave"
    // 									style={{ width: '70%' }}
    // 								/>
    // 								<Skeleton
    // 									animation="wave"
    // 									style={{ width: '80%' }}
    // 								/>
    // 							</>
    // 						) : (
    // 							<>
    // 								<div className="number">
    // 									{_get(
    // 										state.dashboardDetails,
    // 										'number_of_respondents',
    // 										NULL
    // 									)}
    // 								</div>

    // 								<div className="number-text1">
    // 									Number of Respondents
    // 								</div>
    // 								<div className="overlay2">
    // 									<FontAwesomeIcon
    // 										className="fa-user-friends"
    // 										icon={[
    // 											'fas',
    // 											'user-friends',
    // 										]}
    // 									/>
    // 								</div>
    // 							</>
    // 						)}
    // 					</div>
    // 					<div
    // 						className="card promoters"
    // 						key="3"
    // 						// data-grid={{
    // 						// 	x: 0,
    // 						// 	y: 0,
    // 						// 	w: 3,
    // 						// 	h: 2,
    // 						// 	minW: 2,
    // 						// 	minH: 2,
    // 						// }}
    // 					>
    // 						<div className="promoters-title">
    // 							<div>Promoters vs. Detractors</div>
    // 							{/* <FontAwesomeIcon icon={['fas', 'ellipsis-v']} /> */}
    // 						</div>

    // 						{state.contentLoader ? (
    // 							<>
    // 								<Skeleton
    // 									style={{
    // 										margin: 'auto auto',
    // 									}}
    // 									variant="circular"
    // 									width={150}
    // 									height={150}
    // 								/>
    // 							</>
    // 						) : (
    // 							<>
    // 								<div className="pie-wrapper">
    // 									<div className="pie">
    // 										{' '}
    // 										{state.dashboardDetails && (
    // 											<PieChart
    // 												data={_get(
    // 													state.dashboardDetails,
    // 													'pie_chart',
    // 													NULL
    // 												)}
    // 											/>
    // 										)}
    // 									</div>
    // 								</div>
    // 								<Row className="label">
    // 									<Col className="col-6 color1">
    // 										<FontAwesomeIcon
    // 											icon={[
    // 												'fas',
    // 												'circle',
    // 											]}
    // 										/>
    // 										<div>Promoters</div>
    // 									</Col>
    // 									<Col className="col-6 color2">
    // 										<FontAwesomeIcon
    // 											icon={[
    // 												'fas',
    // 												'circle',
    // 											]}
    // 										/>
    // 										<div>Passive</div>
    // 									</Col>
    // 									<Col className="col-6 color3">
    // 										<FontAwesomeIcon
    // 											icon={[
    // 												'fas',
    // 												'circle',
    // 											]}
    // 										/>
    // 										<div>
    // 											Detractors
    // 										</div>
    // 									</Col>
    // 								</Row>
    // 							</>
    // 						)}
    // 					</div>
    // 					<div
    // 						className="card uses-totals"
    // 						key="4"
    // 						// data-grid={{
    // 						// 	x: 3,
    // 						// 	y: 0,
    // 						// 	w: 3,
    // 						// 	h: 2,
    // 						// 	minW: 2,
    // 						// 	minH: 2,
    // 						// }}
    // 					>
    // 						<div className="promoters-title">
    // 							<div>User Totals</div>
    // 							{/* <FontAwesomeIcon icon={['fas', 'ellipsis-v']} /> */}
    // 						</div>

    // 						{state.contentLoader ? (
    // 							<>
    // 								<Skeleton
    // 									style={{
    // 										margin: 'auto auto',
    // 									}}
    // 									variant="circular"
    // 									width={150}
    // 									height={150}
    // 								/>
    // 							</>
    // 						) : (
    // 							<>
    // 								<div className="uses-totals-pop">
    // 									<div className="user-sm">
    // 										<div className="promoters-k">
    // 											<div>
    // 												{_get(
    // 													state.dashboardDetails,
    // 													'user_totals.promoters',
    // 													NULL
    // 												)}
    // 											</div>
    // 											{/* <div>Promoters</div> */}
    // 										</div>
    // 										<div className="passive-k">
    // 											<div>
    // 												{_get(
    // 													state.dashboardDetails,
    // 													'user_totals.passive',
    // 													NULL
    // 												)}
    // 											</div>
    // 											{/* <div>Passive</div> */}
    // 										</div>
    // 										<div className="detractors-k">
    // 											<div>
    // 												{_get(
    // 													state.dashboardDetails,
    // 													'user_totals.detractors',
    // 													NULL
    // 												)}
    // 											</div>
    // 										</div>
    // 									</div>
    // 								</div>
    // 								<Row className="label1">
    // 									<Col className="col-6 color1">
    // 										<FontAwesomeIcon
    // 											icon={[
    // 												'fas',
    // 												'circle',
    // 											]}
    // 										/>
    // 										<div>Promoters</div>
    // 									</Col>
    // 									<Col className="col-6 color2">
    // 										<FontAwesomeIcon
    // 											icon={[
    // 												'fas',
    // 												'circle',
    // 											]}
    // 										/>
    // 										<div>Passive</div>
    // 									</Col>
    // 									<Col className="col-6 color3">
    // 										<FontAwesomeIcon
    // 											icon={[
    // 												'fas',
    // 												'circle',
    // 											]}
    // 										/>
    // 										<div>
    // 											Detractors
    // 										</div>
    // 									</Col>
    // 								</Row>
    // 							</>
    // 						)}
    // 					</div>

    // 					<div
    // 						// className="respondents-comments-flex"
    // 						key="5"
    // 						// data-grid={{
    // 						// 	x: 6,
    // 						// 	y: 0,
    // 						// 	w: 6,
    // 						// 	h: 2.4,
    // 						// 	minH: 2.4,
    // 						// 	minW: 2,
    // 						// }}
    // 					>
    // 						<div className="card">
    // 							{/* respondents-comments */}
    // 							<div className="respondents-comments-title">
    // 								Latest Comments
    // 							</div>
    // 							<div className="wrapper">
    // 								{state.contentLoader ? (
    // 									<>
    // 										<Skeleton
    // 											variant="text"
    // 											style={{
    // 												width: '90%',
    // 												margin: 'auto auto',
    // 												height: '60px',
    // 											}}
    // 										/>
    // 										<Skeleton
    // 											variant="text"
    // 											style={{
    // 												width: '90%',
    // 												margin: 'auto auto',
    // 												height: '60px',
    // 											}}
    // 										/>
    // 										<Skeleton
    // 											variant="text"
    // 											style={{
    // 												width: '90%',
    // 												margin: 'auto auto',
    // 												height: '60px',
    // 											}}
    // 										/>
    // 										<Skeleton
    // 											variant="text"
    // 											style={{
    // 												width: '90%',
    // 												margin: 'auto auto',
    // 												height: '60px',
    // 											}}
    // 										/>
    // 									</>
    // 								) : (
    // 									<>
    // 										{_map(
    // 											state.paginatedData,
    // 											(
    // 												list,
    // 												index
    // 											) => (
    // 												<div
    // 													className={
    // 														state.selectedUser ===
    // 														list.id
    // 															? 'wrap-flex active'
    // 															: 'wrap-flex'
    // 													}
    // 													key={
    // 														index
    // 													}
    // 													onClick={() =>
    // 														handleCommentClick(
    // 															list
    // 														)
    // 													}
    // 												>
    // 													{state.selectedUser ===
    // 													list.id ? (
    // 														<img
    // 															src={
    // 																Check
    // 															}
    // 															className="check-box"
    // 														/>
    // 													) : (
    // 														<img
    // 															src={
    // 																Uncheck
    // 															}
    // 															className="check-box"
    // 														/>
    // 													)}
    // 													<div className="profile-flex">
    // 														<Box
    // 															color={
    // 																list.color
    // 															}
    // 															className="user-profile"
    // 														>
    // 															{
    // 																list.image
    // 															}
    // 														</Box>
    // 														<div>
    // 															<div className="name">
    // 																{
    // 																	list.name
    // 																}
    // 															</div>
    // 															<div className="profile-type">
    // 																{
    // 																	list.message
    // 																}
    // 															</div>
    // 														</div>
    // 													</div>{' '}
    // 													{state.selectedUser ===
    // 													list.id ? (
    // 														<div>
    // 															<div
    // 																outline
    // 																color="primary"
    // 																size="small"
    // 																style={{
    // 																	marginLeft:
    // 																		'25px',
    // 																	height: 'auto',
    // 																	width: 'auto',
    // 																}}
    // 																onClick={() => {
    // 																	let url = `/feedback?comment_id=${list.id}`;
    // 																	history.push(
    // 																		url
    // 																	);
    // 																}}
    // 															>
    // 																<Eye
    // 																	size={
    // 																		20
    // 																	}
    // 																	style={{
    // 																		marginRight:
    // 																			'5px',
    // 																	}}
    // 																/>
    // 																View
    // 																Comment
    // 															</div>
    // 														</div>
    // 													) : (
    // 														<>

    // 														</>
    // 													)}
    // 												</div>
    // 											)
    // 										)}

    // 										{state.paginatedData &&
    // 										state.paginatedData
    // 											.length > 0 ? (
    // 											<div
    // 												style={{
    // 													textAlign:
    // 														'center',
    // 													background:
    // 														'white',
    // 													position:
    // 														'fixed',
    // 													height: '10%',
    // 													width: '100%',
    // 													bottom: '0px',
    // 												}}
    // 											>
    // 												{' '}
    // 												<Pagination
    // 													responsive
    // 													pageSize={
    // 														state.pageSize
    // 													}
    // 													style={{
    // 														width: '100%',
    // 													}}
    // 													showSizeChanger={
    // 														false
    // 													}
    // 													onChange={
    // 														handlePagination
    // 													}
    // 													current={
    // 														state.currentPage
    // 													}
    // 													total={
    // 														state
    // 															.userList
    // 															.length
    // 													}
    // 												/>
    // 											</div>
    // 										) : (
    // 											<>
    // 												{/* <img
    //                       src={NoDataImage}
    //                       style={{ boxSizing: 'cover' }}
    //                       alt="loading"
    //                     /> */}
    // 											</>
    // 										)}
    // 									</>
    // 								)}
    // 							</div>
    // 						</div>
    // 					</div>

    // 					<div
    // 						className="card survey"
    // 						key="6"

    // 						// data-grid={{
    // 						// 	x: 0,
    // 						// 	y: 6,
    // 						// 	w: 6,
    // 						// 	h: 2,
    // 						// 	minW: 2,
    // 						// 	minH: 2,
    // 						// }}
    // 					>
    // 						<div className="promoters-title">
    // 							<div>Survey Responses</div>
    // 							<div className="flex">
    // 								<div className="filter"></div>
    // 							</div>
    // 						</div>
    // 						{state.dashboardDetails &&
    // 							(state.contentLoader ? (
    // 								<>
    // 									<Skeleton
    // 										variant="rectangular"
    // 										width="100%"
    // 										height="100%"
    // 									/>
    // 								</>
    // 							) : (
    // 								<>
    // 									<LineChart
    // 										data={
    // 											state.lineChartDetails &&
    // 											state.lineChartDetails
    // 										}
    // 									/>
    // 									{/*
    // 								<div className="active-label">
    // 									<div>
    // 										<FontAwesomeIcon
    // 											icon={[
    // 												'fas',
    // 												'circle',
    // 											]}
    // 										/>
    // 										Active
    // 									</div>
    // 								</div> */}
    // 								</>
    // 							))}
    // 					</div>

    // 					<div
    // 						className="card keywords"
    // 						key="7"
    // 						// data-grid={{
    // 						// 	x: 6,
    // 						// 	y: 6,
    // 						// 	w: 6,
    // 						// 	h: 2.5,
    // 						// 	minW: 2,
    // 						// 	minH: 2.5,
    // 						// }}
    // 					>
    // 						<div className="promoters-title">
    // 							<div>
    // 								Top Keywords Mentioned in
    // 								Comments
    // 							</div>
    // 						</div>

    // 						{state.contentLoader ? (
    // 							<>
    // 								<Skeleton
    // 									variant="rectangular"
    // 									width="100%"
    // 									height="100%"
    // 								/>
    // 							</>
    // 						) : (
    // 							<WordCloud
    // 								// keywords={_get(
    // 								// 	state.dashboardDetails,
    // 								// 	'top_keywords',
    // 								// 	NULL
    // 								// )}
    // 								allKeywords={
    // 									state.allKeyword &&
    // 									state.allKeyword
    // 								}
    // 								topKeywords={
    // 									state.topKeywords &&
    // 									state.topKeywords
    // 								}
    // 								startDate={state.startDate}
    // 								endDate={state.endDate}
    // 							/>
    // 						)}
    // 					</div>
    // 				</ResponsiveGridLayout>
    // 			</Container>
    // 		</Suspense>
    // 	)}
    // </>
    <>
      <h2>Admin Dashboard Details</h2>
    </>
  );
};

// export default Home;

const mapStateToProps = (state) => ({
  dashboardDetails: state.user.dashboardDetails,
});

export default connect(mapStateToProps, {
  getDashboardDetails: Actions.getDashboardDetails,
  getLineChartDetails: Actions.getLineChartDetails,
})(Home);
