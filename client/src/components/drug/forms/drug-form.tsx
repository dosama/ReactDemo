import axios from "axios";
import * as React from "react";
import { Field, reduxForm } from "redux-form";
import "./drug-form.css";
import { Component } from "react";
import { Config } from "../../../config/config";
import { IInfusable } from "../../../interfaces/infusable";
import { connect } from "react-redux";
import { IApplicationState } from "../../../application-state";
import { Drug } from "../../../interfaces/drug";

export interface Props {
  handleSubmit: any;
  reset: any;
  match: any;
  initialize: any;
  currentDrug: Drug;
  loadDrugData: (drug: Drug) => void;
}

const required = (value: string) => (value ? undefined : "Required");

class DrugForm extends Component<Props, {}> {
  public state = {
    currentDrug: {},
    infusables: []
  };
  public constructor(props: Props, {}) {
    super(props, {});
    this.loadCurrentDrug = this.loadCurrentDrug.bind(this);
  }
  public componentDidMount() {
    this.getInfusables();
    this.loadCurrentDrug();
  }

  public handleIntialize() {
    const initData = { ...this.state.currentDrug };
    this.props.initialize(initData);
  }
  public renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }: any) => (
    <div>
      <label>{label}</label>
      <div>
        <input
          {...input}
          className="form-control"
          placeholder={label}
          type={type}
        />
        {touched &&
          ((error && <span className="error">{error}!</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );

  public render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="drug-form">
        <div className="form-group">
          <label className="drug-form-label">Drug Name</label>
          <Field
            name="name"
            component={this.renderField}
            className="form-control"
            type="text"
            placeholder="Name"
            validate={[required]}
          />
        </div>
        <div className="form-group">
          <label>Drug Description</label>
          <Field
            name="description"
            component={this.renderField}
            className="form-control"
            type="textarea"
            placeholder="Write description here .."
            validate={[required]}
          />
        </div>
        <div className="form-group">
          <label>Infusables</label>
          <Field className="form-control" name="infusable" component="select">
            <option />
            {this.state.infusables.map((infusable: IInfusable) => (
              <option value={infusable.id}>
                {infusable.name} : {infusable.description}
              </option>
            ))}
          </Field>
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary btn-Margin"
            // disabled={pristine || submitting}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-danger btn-Margin"
            //  disabled={pristine || submitting}
            onClick={this.props.reset}
          >
            Clear Values
          </button>
        </div>
      </form>
    );
  }

  public loadCurrentDrug() {
    if (this.props.match) {
      axios
        .get(
          Config.SERVER_URL +
            Config.DRUGS_SERVICE +
            "/" +
            this.props.match.params.id
        )
        .then(response => {
          this.setState({ currentDrug: this.getDrugObject(response.data) });
          this.handleIntialize();
        });
    }
  }

  private getInfusables() {
    axios
      .get(Config.SERVER_URL + Config.DRUGS_INFUSABLE_SERVICE)
      .then(response => {
        this.setState({ infusables: response.data });
      });
  }

  private getDrugObject(data: any): Drug {
    const result = new Drug(
      data.id,
      data.name,
      data.description,
      data.infusable
    );
    return result;
  }
}

const IntializedDrugForm = reduxForm({
  form: "DrugForm"
})(DrugForm as any);

connect<{}>(
  (state: IApplicationState) => ({
    currentDrug: state.currentDrug,
    initialValues: state.currentDrug
  }),
  {}
)(IntializedDrugForm);

export default IntializedDrugForm;
