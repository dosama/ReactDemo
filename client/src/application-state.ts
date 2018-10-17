import { Drug } from "./interfaces/drug";

export interface IApplicationState {
  currentDrug: Drug;
  drugs: Drug[];
}

export const defaultState: IApplicationState = {
  currentDrug: new Drug("", "", "", ""),
  drugs: []
};
