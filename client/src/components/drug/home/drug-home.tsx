import * as React from "react";
import { Link } from "react-router-dom";
import "./drug-home.css";

class DrugHome extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Drug App</h1>
        </header>
        <Link
          to="/list-drug"
          className="btn btn-primary btn-Margin"
          href="#"
          role="button"
        >
          Drug List
        </Link>

        {/* <Link
          to="/edit-drug:id"
          className="btn btn-primary btn-Margin"
          href="#"
          role="button"
        >
          Drug Edit
        </Link> */}
      </div>
    );
  }
}

export default DrugHome;
