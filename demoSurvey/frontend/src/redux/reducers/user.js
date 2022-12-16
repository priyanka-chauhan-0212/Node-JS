import produce from 'immer';
import _remove from 'lodash/remove';
import _size from 'lodash/size';
import _filter from 'lodash/filter';
import _uniqBy from 'lodash/uniqBy';

import {
	SIGN_IN,
	CURRENT_USER,
	DASHBOARD_DETAILS,
	REPORTS,
	GET_SURVEY,
	GET_SNIPPET,
	SURVEY_LIST,
	SURVEY_DELETE,
	FEEDBACK_LIST,
	BRAND_NAME,
	LOG_OUT,
} from '../constants/actionTypes';

const EMPTY_ARRAY = [];
const NULL = null;

const initialState = {
	currentUser: NULL,
	response: NULL,
	survey: NULL,
	snippet: NULL,
	dashboardDetails: NULL,
	reports: NULL,
	brandName: NULL,
	surveyList: {
		current_page: 0,
		last_page: 0,
		from: 0,
		to: 0,
		total: 0,
		list: EMPTY_ARRAY,
	},
	feeBackList: {
		current_page: 0,
		last_page: 0,
		from: 0,
		to: 0,
		total: 0,
		list: EMPTY_ARRAY,
	},
};

export default (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case SIGN_IN:
				draft.response = action.data;
				break;
			case LOG_OUT:
				state;
				break;
			case CURRENT_USER:
				draft.currentUser = action.data;
				break;
			case DASHBOARD_DETAILS:
				draft.dashboardDetails = action.data;
				break;
			case REPORTS:
				draft.reports = action.data;
				break;
			case BRAND_NAME:
				draft.brandName = action.data;
				break;
			case GET_SURVEY:
				draft.survey = action.data;
				break;
			case GET_SNIPPET:
				draft.snippet = action.data;
				break;
			case SURVEY_LIST:
				draft.surveyList = action.data;
				break;
			case SURVEY_DELETE:
				const { surveyList } = state;
				const fetchData = _filter(surveyList.list, (list) => {
					return list.id !== action.data.ids;
				});
				draft.surveyList = { ...surveyList, list: fetchData };
				break;
			case FEEDBACK_LIST:
				draft.feeBackList = action.data;
				break;
			default:
				break;
		}
	});
