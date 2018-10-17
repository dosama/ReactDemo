import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as Actions from "../actions/action-creators";
import { IApplicationState } from "../application-state";
import DrugList, {
  Props as DrugsProps
} from "../components/drug/list/drug-list";
import { Drug } from "../interfaces/drug";

type StateProps = Pick<DrugsProps, "drugs">;
type DispatchProps = Pick<DrugsProps, "addDrugsApiData">;

function mapStateToProps(state: IApplicationState): StateProps {
  return {
    drugs: state.drugs
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
  return {
    addDrugsApiData: (drugs: Drug[]) => {
      dispatch(Actions.addDrugsApiData(drugs));
    }
  };
}

const ConnectedDrugList = connect(mapStateToProps, mapDispatchToProps as any)(
  DrugList
);

export default ConnectedDrugList;
