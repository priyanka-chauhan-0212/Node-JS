/* eslint-disable no-tabs */
/* eslint-disable semi */
import { Home, Circle, BarChart2, TrendingUp } from "react-feather";

import {
  // 	ROUTE_ACCOUNT_GROWTH,
  // 	ROUTE_FEEDBACK,
  ROUTE_OVERVIEW,
  // 	ROUTE_REPORTS,
  // 	ROUTE_SURVEY,
  // 	ROUTE_SURVEY_PEOPLE,
} from "../../router/routes.js";

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
        navLink: ROUTE_OVERVIEW,
      },

      //   {
      //     id: "yourSurvey",
      //     title: "Your Surveys",
      //     icon: <Circle size={20} />,
      //     navLink: ROUTE_SURVEY,
      //   },
      //   {
      //     id: "addNewSurvey",
      //     title: "Add New Survey",
      //     icon: <Circle size={20} />,
      //     navLink: ROUTE_SURVEY_PEOPLE,
      //   },
    ],
  },
  // {
  //   id: "analytics",
  //   title: "Analytics",
  //   icon: <BarChart2 size={20} />,
  //   children: [
  //     //   {
  //     //     id: "reports",
  //     //     title: "Reports",
  //     //     icon: <Circle size={20} />,
  //     //     navLink: ROUTE_REPORTS,
  //     //   },
  //     //   {
  //     //     id: "rawData",
  //     //     title: "Data",
  //     //     icon: <Circle size={20} />,
  //     //     navLink: ROUTE_FEEDBACK,
  //     //   },
  //   ],
  // },
  //   {
  //     id: "accountGrowth",
  //     title: "Account Growth",
  //     icon: <TrendingUp size={20} />,
  //     navLink: ROUTE_ACCOUNT_GROWTH,
  //   },
];
