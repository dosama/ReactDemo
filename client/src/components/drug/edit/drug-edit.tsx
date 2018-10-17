/* eslint-disable */
import axios from "axios";
import * as Actions from "../../../actions/action-creators";
import * as React from "react";
import DrugForm from "../forms/drug-form";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./drug-edit.css";
import { Config } from "../../../config/config";
import { Drug } from "../../../interfaces/drug";
import { Dispatch } from "redux";
import { IApplicationState } from "../../../application-state";
import { connect } from "react-redux";

export interface DrugEditProps {
  match: any;
  currentDrug: Drug;
  loadDrugData: (drug: Drug) => void;
}
class DrugEdit extends React.Component<DrugEditProps, {}> {
  public state = {
    currentDrug: {},
    modal: false
  };

  public constructor(props: DrugEditProps, {}) {
    super(props, {});
    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
  }



  public render() {
    return (
      <div>
        <h2>Edit Drug</h2>
        <DrugForm
          onSubmit={this.submit}
          initialValues={{ ...this.props.currentDrug }}
          {...this.props}
        />
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Success</ModalHeader>
          <ModalBody>Drug Updated Successfuly !</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  public submit = (values: any) => {
    const data = this.getDrugObject(values);
    axios
      .put(Config.SERVER_URL + Config.DRUGS_SERVICE + "/" + data.id, data)
      .then(response => {
        this.toggle();
      });
  };

  private getDrugObject(values: any): Drug {
    const result = new Drug(
      values.id,
      values.name,
      values.description,
      values.infusable
    );
    return result;
  }

  private toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
}

const mapStateToProps = (state: IApplicationState, ownProps: DrugEditProps) => {
  return { currentDrug: state.currentDrug };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadDrugData: (drug: Drug) => {
      dispatch(Actions.loadDrugData(drug));
    }
  };
};
export default connect<{}, {}, DrugEditProps>(
  mapStateToProps,
  mapDispatchToProps
)(DrugEdit);
