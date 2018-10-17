import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Config } from "../../../config/config";
import { Drug } from "../../../interfaces/drug";
import "./drug-list.css";

export interface Props {
  drugs: Drug[];
  addDrugsApiData: (drugs: Drug[]) => void;
}

class DrugList extends React.Component<Props, any> {
  public state = {
    apiData: { drugs: [] },
    modal: false,
    selectedDrugId: ""
  };

  public constructor(props: any) {
    super(props);
    this.deleteDrug = this.deleteDrug.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateCurrentSelectedDrug = this.updateCurrentSelectedDrug.bind(this);
  }

  public componentDidMount() {
    this.refreshDrugs();
  }

  public render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <Link
              to="/add-drug"
              className="btn btn-primary btn-Margin"
              href="#"
              role="button"
            >
              Drug Create
            </Link>
            <div className="col-md-12">
              <h4>Drug List</h4>
              <div className="table-responsive">
                <table
                  id="mytable"
                  className="table table-bordred table-striped"
                >
                  <thead>
                    <th>Drug Name</th>
                    <th>Drug Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </thead>
                  <tbody>
                    {this.state.apiData.drugs.map((drug: Drug) => (
                      <tr key={drug.id}>
                        <td>{drug.name}</td>
                        <td>{drug.description}</td>

                        <td>
                          <p
                            data-placement="top"
                            data-toggle="tooltip"
                            title="Edit"
                          >
                            <Link
                              to={`/edit-drug/${drug.id}`}
                              className="btn btn-primary"
                              href="#"
                              role="button"
                            >
                              Edit
                            </Link>
                          </p>
                        </td>
                        <td>
                          <p
                            data-placement="top"
                            data-toggle="tooltip"
                            title="Delete"
                          >
                            <button
                              className="btn btn-danger btn-xs"
                              data-title="Delete"
                              data-toggle="modal"
                              data-target="#delete"
                              onClick={() => {
                                this.updateCurrentSelectedDrug(drug.id);
                                this.toggle();
                              }}
                            >
                              Delete
                            </button>
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Delete Drug</ModalHeader>
          <ModalBody>Are you Sure You Want to delete this drug ?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteDrug}>
              Yes
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  private toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  private updateCurrentSelectedDrug(id: string) {
    this.setState({
      selectedDrugId: id
    });
  }
  private refreshDrugs() {
    axios.get(Config.SERVER_URL + Config.DRUGS_SERVICE).then(response => {
      this.setState({ apiData: { drugs: response.data } });
    });
  }

  private deleteDrug(event: any) {
    this.toggle();

    axios
      .delete(
        Config.SERVER_URL +
          Config.DRUGS_SERVICE +
          "/" +
          this.state.selectedDrugId
      )
      .then(response => {
        this.refreshDrugs();
      });
  }
}

export default DrugList;
