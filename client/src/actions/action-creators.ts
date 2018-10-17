import { Drug } from "../interfaces/drug";
import * as Actions from "./actions-types";

export type LoadDrugDataAction = {
  type: Actions.LOAD_DRUG_DATA;
  currentDrug: Drug;
};

export type AddDrugsApiDataAction = {
  type: Actions.ADD_DRUG_API_DATA;
  drugs: Drug[];
};

export type addDrugsApiData = typeof addDrugsApiData;
export type loadDrugData = typeof loadDrugData;

export function addDrugsApiData(drugs: Drug[]): AddDrugsApiDataAction {
  return { type: Actions.ADD_DRUG_API_DATA, drugs };
}

export function loadDrugData(currentDrug: Drug): LoadDrugDataAction {
  return { type: Actions.LOAD_DRUG_DATA, currentDrug };
}
