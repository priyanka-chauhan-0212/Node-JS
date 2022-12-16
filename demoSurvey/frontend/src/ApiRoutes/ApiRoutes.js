let BaseUrl = process.env.REACT_APP_BACKEND_API_URL;

// * login page api
export const SIGN_IN_API_PATH = "http://localhost:8000/api/addUser";

// * logout api
export const LOG_OUT_USER_API_PATH = "api/v1/logoutUser";

// * register page api
export const REGISTER_API_PATH = "api/v1/createUser";

// * forget password page api
export const FORGET_PASSWORD_SEND_EMAIL_API_PATH =
  "api/v1/forgetPasswordSendEmail";

// * overview page api
export const SAVE_LAYOUT_API_PATH = "api/v1/saveLayout";
export const GET_DASHBOARD_DETAILS_API_PATH = "api/v1/getDashboardDetails";

// * your surveys page api
export const GET_ALL_SURVEY_API_PATH = "api/v1/getAllSurvey";
export const DELETE_SURVEY_API_PATH = "api/v1/deleteSurvey";

// * snippet page api
export const GET_SURVEY_SNIPPET_API_PATH = "api/v1/getSnippet/";

// * survey-configure page api
export const UPDATE_SURVEY_API_PATH = "api/v1/updateSurvey";
export const CREATE_SURVEY_API_PATH = "api/v1/createSurvey";
export const GET_SURVEY_BY_ID_API_PATH = "api/v1/getSurveyById";

// * survey-send-email page api
export const SURVEY_SEND_EMAIL_API_PATH = "api/v1/sendSurveyEmail";

// * profile page api
export const UPDATE_USER_API_PATH = "api/v1/updateUser";
export const GET_USER_PROFILE_API_PATH = "api/v1/getUserProfile";
export const CHANGE_PASSWORD_API_PATH = "api/v1/changePassword";

// * report page api
export const GET_REPORT_API_PATH = "api/v1/getReport";

// * feedback (data) page api
export const GET_ALL_SURVEY_RESPONSE_API_PATH = "api/v1/getAllSurveyResponse";

// * reset-password page api
export const RESET_PASSWORD_API_PATH = "api/v1/resetPassword";

// * others api
export const SET_EMAIL_SURVEY_RESPONSE_API_PATH =
  "api/v1/setEmailSurveyResponse";

export const GET_SHEET_DATA_API_PATH = "api/v1/getSheetData";
export const UPDATE_USER_SETTINGS_API_PATH = "api/v1/updateUserSettings";

// mongoexport --collection=customerlogos --db=proton-data-45 --out=./customerlogos.json

// mongoexport --collection=activeusers --db=proton-data-45 --out=./activeusers.json

// mongoexport --collection=users --db=proton-data-45 --out=./users.json

// mongoexport --collection=userdevices --db=proton-data-45 --out=./userdevices.json

// mongoexport --collection=stripeconfigs --db=proton-data-45 --out=./stripeconfigs.json

// mongoexport --collection=usbdevices --db=proton-data-45 --out=./usbdevices.json
