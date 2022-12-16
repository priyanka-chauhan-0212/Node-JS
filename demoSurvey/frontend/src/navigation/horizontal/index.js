import {
  Mail,
  Home,
  Circle,
  BarChart2,
  ChevronRight,
  CornerDownRight,
} from "react-feather";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home size={20} />,
    children: [
      {
        id: "overview",
        title: "Overview",
        icon: <Circle size={20} />,
        navLink: "/overview",
      },
      {
        id: "yourSurvey",
        title: "Your Surveys",
        icon: <Circle size={20} />,
        navLink: "/survey",
      },
      {
        id: "addNewSurvey",
        title: "Add New Survey",
        icon: <Circle size={20} />,
        navLink: "/survey-people",
      },
    ],
  },
  // {
  // 	id: 'analytics',
  // 	title: 'Analytics',
  // 	icon: <BarChart2 size={20} />,
  // 	children: [
  // 		{
  // 			id: 'reports',
  // 			title: 'Reports',
  // 			icon: <Circle size={20} />,
  // 			navLink: '/reports',
  // 		},
  // 		{
  // 			id: 'rawData',
  // 			title: 'Data',
  // 			icon: <Circle size={20} />,
  // 			navLink: '/feedback',
  // 		},
  // 	],
  // },
  // {
  // 	id: 'accountGrowth',
  // 	title: 'Account Growth',
  // 	icon: <Home size={20} />,
  // 	navLink: '/accountGrowth',
  // },
];
