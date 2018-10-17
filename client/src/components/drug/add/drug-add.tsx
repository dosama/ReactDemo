import axios from "axios";
import * as React from "react";
import DrugForm from "../forms/drug-form";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./drug-add.css";
import { Drug } from "../../../interfaces/drug";
import { Guid } from "../../../utilities/guid";
import { Config } from "../../../config/config";

class DrugAdd extends React.Component {
  public state = {
    modal: false
  };

  public constructor(props: any) {
    super(props);
    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  public render() {
    return (
      <div>
        <DrugForm onSubmit={this.submit} />
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Success</ModalHeader>
          <ModalBody>Drug Created Successfuly !</ModalBody>
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
      .post(Config.SERVER_URL + Config.DRUGS_SERVICE, data)
      .then(response => {
        this.toggle();
      });
  };
  private getDrugObject(values: any): Drug {
    const result = new Drug(
      Guid.newGuid(),
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

export default DrugAdd;
