/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable brace-style */
import Toast from "../../container/components/Toast";
import Axios from "axios";
import axiosInstance from "../../container/utils/axiosInstance";
import * as types from "../constants/actionTypes";
import { useHistory } from "react-router-dom";
import { SURVEY_METHOD } from "../../container/constants/commonConstants";
import { BACKEND_URL_SERVER } from "../../container/constants/connections";
import { getAccessToken } from "../../container/utils/getAccessToken";
import {
  ROUTE_SIGN_IN,
  // ROUTE_DASHBOARD,
  ROUTE_OVERVIEW,
  // ROUTE_SURVEY,
  // ROUTE_GET_SNIPPET,
  // ROUTE_SURVEY_SEND_TO_EMAIL,
} from "../../router/routes.js";
import axios from "axios";
import config from "../../container/utils/axiosConfig";
import { toast } from "react-toastify";
import { ErrorToast } from "../../container/components/ToastComponent";
import { GET_DASHBOARD_DETAILS_API_PATH } from "../../ApiRoutes/ApiRoutes";

export const signIn = (userName, password) => {
  return async (dispatch) => {
    return await axiosInstance
      .post(`login?email=${userName}&password=${password}`)
      .then((response) => {
        if (response.data.success === 1) {
          localStorage.setItem("accessToken", response.data.data.token);
          window.location.href = `${ROUTE_DASHBOARD}${ROUTE_OVERVIEW}`;
          dispatch({
            type: types.SIGN_IN,
            data: response.data.data,
          });
        } else {
          Toast({
            message: response.data.error_code,
            type: "error",
          });
        }
      });
  };
};

export const sendPasswordRestLink = (data) => {
  return async (dispatch) => {
    return await axiosInstance.post(`password/email`, data).then((response) => {
      console.log("reset log", response.data);

      if (response.data.success === 1) {
        dispatch({
          type: types.SIGN_IN,
          data: response.data.data,
        });

        Toast({
          message: "Reset password link sent on your email address",
          type: "success",
        });
      } else {
        Toast({
          message: response.data.message,
          type: "error",
        });
      }
    });
  };
};

export const passwordReset = (data) => {
  return async (dispatch) => {
    return await axiosInstance.post(`password/reset`, data).then((response) => {
      if (response.data.success === 1) {
        dispatch({
          type: types.SIGN_IN,
          data: response.data.data,
        });
      } else {
        Toast({
          message: response.data.error_code,
          type: "error",
        });
      }
    });
  };
};

export const getUserProfile = (data) => {
  return (dispatch) => {
    // return await axiosInstance
    // 	.get(`profile?user_id=49`)
    console.log("get profile api called", data);
    return axiosInstance
      .post(
        process.env.REACT_APP_BACKEND_API_URL + "api/v1/getUserProfile",
        data
      )
      .then((response) => {
        if (response.data.success === 1) {
          console.log(response);
          // dispatch({
          // 	type: types.CURRENT_USER,
          // 	data: response.data.data,
          // });
        } else {
          Toast({
            message: response.data.error_code,
            type: "error",
          });
        }
      });
  };
};

export const saveUserProfile = (data) => {
  const apiURL = `${BACKEND_URL_SERVER}/admin/api/profile?user_id=49`;
  return async (dispatch) => {
    return await Axios({
      method: "post",
      url: apiURL,
      data,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "content-type": "multipart/form-data",
      },
    }).then((response) => {
      if (response.data.success === 1) {
        dispatch({
          type: types.CURRENT_USER,
          data: response.data.data,
        });
        Toast({
          message: "User profile successfully updated",
          type: "success",
        });
      } else {
        Toast({
          message: response.data.error_code,
          type: "error",
        });
      }
    });
  };
};

export const getDashboardDetails = (data, history) => {
  return async (dispatch) => {
    return await axiosInstance
      .post(GET_DASHBOARD_DETAILS_API_PATH, data)
      .then((response) => {
        if (response.data.success === 1) {
          if (response.data && response.data.data.net_promoter_score == 0) {
            toast.error(<ErrorToast message={"No data found !"} />);
          } else {
          }
          dispatch({
            type: types.DASHBOARD_DETAILS,
            data: response.data.data,
          });
        } else {
          Toast({
            message: response.data.message,
            type: "error",
          });
        }
      })
      .catch((error) => {
        {
          // if (error.status === 401) {
          // 	history.push(ROUTE_SIGN_IN);
          // }
        }
      });
  };
};

export const getLineChartDetails = (type) => {
  return async (dispatch) => {
    return await axiosInstance
      .post(`survey/responses-graph?user_id=49&type=${type}`)
      .then((response) => {
        if (response.data.success === 1) {
          return response;
        } else {
          Toast({
            message: response.data.error_code,
            type: "error",
          });
        }
      });
  };
};

export const getReports = (data) => {
  return async (dispatch) => {
    return await axiosInstance.post(`survey/report`, data).then((response) => {
      if (response.data.success === 1) {
        dispatch({
          type: types.REPORTS,
          data: response.data.data,
        });
      } else {
        Toast({
          message: response.data.error_code,
          type: "error",
        });
      }
    });
  };
};

export const createSurvey = (data, history, surveyMethod) => {
  return async (dispatch) => {
    return await axiosInstance.post(`survey/add`, data).then((response) => {
      if (response.data.success === 1) {
        if (surveyMethod === SURVEY_METHOD.WEB) {
          let route = ROUTE_GET_SNIPPET;
          history.push({
            pathname: route.replace(":surveyId", response.data.data.id),
          });
        } else {
          let route = ROUTE_SURVEY_SEND_TO_EMAIL;
          history.push({
            pathname: route.replace(":surveyId", response.data.data.id),
          });
        }
        Toast({
          message: "Survey successfully created",
          type: "success",
        });
        dispatch({
          type: types.SIGN_IN,
          data: response.data.data,
        });
      } else {
        Toast({
          message: response.data.error_code,
          type: "error",
        });
      }
    });
  };
};

export const getSurveyList = (page, field, direction) => {
  return async (dispatch) => {
    return await axiosInstance
      .get(
        `survey/paginate?user_id=49&page=${page}&sort_by=${field}&direction=${direction}&page_size=10&survey_method=2`
      )
      .then((response) => {
        if (response.data.success === 1) {
          dispatch({
            type: types.SURVEY_LIST,
            data: response.data.data,
          });
        } else {
          Toast({
            message: response.data.error_code,
            type: "error",
          });
        }
      });
  };
};

export const getSurvey = (surveyId) => {
  return async (dispatch) => {
    return await axiosInstance
      .get(`survey/edit/${surveyId}`)
      .then((response) => {
        if (response.data.success === 1) {
          dispatch({
            type: types.GET_SURVEY,
            data: response.data.data,
          });
        } else {
          Toast({
            message: response.data.error_code,
            type: "error",
          });
        }
      });
  };
};

export const updateSurvey = (surveyId, data, history, surveyMethod) => {
  return async (dispatch) => {
    return await axiosInstance
      .post(`survey/edit/${surveyId}`, data)
      .then((response) => {
        if (response.data.success === 1) {
          if (surveyMethod === 1) {
            let route = ROUTE_SURVEY_SEND_TO_EMAIL;
            history.push({
              pathname: route.replace(":surveyId", surveyId),
            });
          } else {
            let route = ROUTE_GET_SNIPPET;
            history.push({
              pathname: route.replace(":surveyId", surveyId),
            });
          }
          Toast({
            message: "Survey successfully updated",
            type: "success",
          });
          dispatch({
            type: types.SIGN_IN,
            data: response.data.data,
          });
        } else {
          Toast({
            message: response.data.error_code,
            type: "error",
          });
        }
      });
  };
};

export const deleteSurvey = (data) => {
  return async (dispatch) => {
    return await axiosInstance.post(`survey/delete`, data).then((response) => {
      if (response.data.success === 1) {
        Toast({
          message: "Survey successfully deleted",
          type: "success",
        });
        dispatch({
          type: types.SURVEY_DELETE,
          data: data,
        });
      } else {
        Toast({
          message: response.data.error_code,
          type: "error",
        });
      }
    });
  };
};

export const getSnippet = (surveyId) => {
  return async (dispatch) => {
    return await axiosInstance
      .get(`survey/get-snippet/${surveyId}`)
      .then((response) => {
        if (response.data.success === 1) {
          dispatch({
            type: types.GET_SNIPPET,
            data: response.data.data,
          });
        } else {
          Toast({
            message: response.data.error_code,
            type: "error",
          });
        }
      });
  };
};

export const getFeedbackList = (
  page,
  pageSize,
  wordClick,
  surveyType,
  startDate,
  endDate,
  commentId
) => {
  if (commentId === undefined || commentId == "" || commentId == null) {
  } else {
    return async (dispatch) => {
      return await axiosInstance
        .get(
          `survey/response?user_id=49&page=${
            page && page
          }&sort_by=created_at&direction=DESC&page_size=${
            pageSize && pageSize
          }&respondent_click=${commentId}`
        )
        .then((response) => {
          if (response.data.success === 1) {
            dispatch({
              type: types.FEEDBACK_LIST,
              data: response.data.data,
            });
          } else {
            Toast({
              message: response.data.error_code,
              type: "error",
            });
          }
        });
    };
  }

  if (wordClick === undefined || wordClick == "" || wordClick == null) {
    return async (dispatch) => {
      return await axiosInstance
        .get(
          `survey/response?user_id=49&page=${
            page && page
          }&sort_by=created_at&direction=DESC&page_size=${
            pageSize && pageSize
          }&survey_method=${surveyType}&start_date=${startDate}&end_date=${endDate}`
        )
        .then((response) => {
          if (response.data.success === 1) {
            dispatch({
              type: types.FEEDBACK_LIST,
              data: response.data.data,
            });
          } else {
            Toast({
              message: response.data.error_code,
              type: "error",
            });
          }
        });
    };
  } else {
    return async (dispatch) => {
      return await axiosInstance
        .get(
          `survey/response?user_id=49&page=${
            page && page
          }&sort_by=created_at&direction=DESC&page_size=${
            pageSize && pageSize
          }&word_click=${
            wordClick && wordClick
          }&survey_method=${surveyType}&start_date=${startDate}&end_date=${endDate}`
        )
        .then((response) => {
          if (response.data.success === 1) {
            dispatch({
              type: types.FEEDBACK_LIST,
              data: response.data.data,
            });
          } else {
            Toast({
              message: response.data.error_code,
              type: "error",
            });
          }
        });
    };
  }
};

export const sendSurveyMail = (data, history) => {
  return async (dispatch) => {
    return await axiosInstance
      .post(`survey/send-mail`, data)
      .then((response) => {
        if (response.data.success === 1) {
          history.push(ROUTE_SURVEY);
          Toast({
            message: "Mail successfully sent",
            type: "success",
          });
          dispatch({
            type: types.SIGN_IN,
            data: response.data.data,
          });
        } else {
          Toast({
            message: response.data.error_code,
            type: "error",
          });
        }
      });
  };
};

export const sendSurveyResponse = (data) => {
  return async (dispatch) => {
    return await axiosInstance
      .post(`/set-email-survey-response`, data)
      .then((response) => {
        if (response.data.success === 1) {
          Toast({
            message: "Survey successfully submitted",
            type: "success",
          });
          dispatch({
            type: types.SIGN_IN,
            data: response.data.data,
          });
        } else {
          Toast({
            message: response.data.error_code,
            type: "error",
          });
        }
      });
  };
};

export const getBrandName = (useId, surveyId) => {
  return async (dispatch) => {
    return await axiosInstance
      .post(`survey/get-brand-title?user_id=${useId}&survey_id=${surveyId}`)
      .then((response) => {
        if (response.data.success === 1) {
          dispatch({
            type: types.BRAND_NAME,
            data: response.data.data,
          });
        } else {
          Toast({
            message: response.data.error_code,
            type: "error",
          });
        }
      });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    return await axiosInstance.get(`logout`).then((response) => {
      if (response.data.success === 1) {
        localStorage.clear();
        window.location.href = ROUTE_SIGN_IN;
        dispatch({
          type: types.SIGN_IN,
          data: response.data.data,
        });
      } else {
        Toast({
          message: response.data.error_code,
          type: "error",
        });
      }
    });
  };
};
