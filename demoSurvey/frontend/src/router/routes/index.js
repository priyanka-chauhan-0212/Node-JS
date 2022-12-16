import { lazy } from "react";
import {
  ROUTE_SIGN_IN,
  // ROUTE_FEEDBACK,
  // ROUTE_FORGOT_PASSWORD,
  // ROUTE_GET_SNIPPET,
  ROUTE_OVERVIEW,
  // ROUTE_PREVIEW,
  // ROUTE_PROFILE,
  // ROUTE_REPORTS,
  // ROUTE_RESET_PASSWORD,

  // ROUTE_SURVEY,
  // ROUTE_SURVEY_PEOPLE,
  // ROUTE_SURVEY_SEND_TO_EMAIL,
  // ROUTE_ERROR_PAGE,
  // ROUTE_ACCOUNT_GROWTH,
} from "../routes";

// ** Document title
const TemplateTitle = "NPS";

// ** Default Route
const DefaultRoute = ROUTE_OVERVIEW;

// ** Merge Routes

const Routes = [
    {
      path: ROUTE_OVERVIEW,
      component: lazy(() => import("../../views/overview")),
    },
  //   {
  //     path: ROUTE_SURVEY,
  //     component: lazy(() => import("../../views/survey")),
  //   },
  //   {
  //     path: ROUTE_GET_SNIPPET,
  //     component: lazy(() => import("../../views/snippet")),
  //   },
  //   {
  //     path: ROUTE_SURVEY_PEOPLE,
  //     component: lazy(() => import("../../views/surveyPeople")),
  //   },
  //   {
  //     path: ROUTE_PREVIEW,
  //     component: lazy(() => import("../../views/preview")),
  //   },
  //   {
  //     path: "/survey-configure/:surveyMethod/:surveyType",
  //     component: lazy(() => import("../../views/surveyConfigure")),
  //   },
  //   {
  //     path: ROUTE_SURVEY_SEND_TO_EMAIL,
  //     component: lazy(() => import("../../views/surveySendToEmail")),
  //   },
  //   {
  //     path: "/email-comment/:surveyId/:token/:score",
  //     component: lazy(() => import("../../views/emailComment")),
  //     layout: "BlankLayout",
  //   },

  //   {
  //     path: ROUTE_FEEDBACK,
  //     component: lazy(() => import("../../views/feedback")),
  //   },
  //   {
  //     path: ROUTE_REPORTS,
  //     component: lazy(() => import("../../views/Reports")),
  //   },
  //   {
  //     path: ROUTE_PROFILE,
  //     component: lazy(() => import("../../views/profile")),
  //   },

  //   {
  //     path: ROUTE_ACCOUNT_GROWTH,
  //     component: lazy(() => import("../../views/AccountGrowth")),
  //   },
  {
    path: ROUTE_SIGN_IN,
    component: lazy(() => import("../../views/Login")),
    layout: "BlankLayout",
    isPublicRoute: true,
    meta: {
      authRoute: true,
    },
  },
  //   {
  //     path: ROUTE_FORGOT_PASSWORD,
  //     component: lazy(() => import("../../views/ForgotPasswordCover")),
  //     layout: "BlankLayout",
  //     isPublicRoute: true,
  //     meta: {
  //       authRoute: true,
  //     },
  //   },

  //   {
  //     path: ROUTE_ERROR_PAGE,
  //     component: lazy(() => import("../../views/Error")),
  //     layout: "BlankLayout",
  //     isPublicRoute: true,
  //     meta: {
  //       authRoute: true,
  //     },
  //   },
];

export { DefaultRoute, TemplateTitle, Routes };
