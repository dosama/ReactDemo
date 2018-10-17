import { IApplicationState, defaultState } from "../application-state";
import {
  AddDrugsApiDataAction,
  LoadDrugDataAction
} from "../actions/action-creators";
import { combineReducers } from "redux";
import * as Actions from "../actions/actions-types";
import { reducer as form } from "redux-form";

type Action = AddDrugsApiDataAction | LoadDrugDataAction;

const updateState = (
  state: IApplicationState = defaultState,
  action: Action
) => {
  switch (action.type) {
    case Actions.ADD_DRUG_API_DATA:
      return { ...state, drugs: [...state.drugs, action.drugs] };
    case Actions.LOAD_DRUG_DATA:
      return Object.assign({}, state, { currentDrug: action.currentDrug });
    default:
      return state;
  }
};

const reducer = combineReducers({ updateState, form });

export default reducer;
