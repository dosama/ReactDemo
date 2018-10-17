import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import DrugAdd from "./components/drug/add/drug-add";
import DrugEdit from "./components/drug/edit/drug-edit";
import DrugList from "./components/drug/list/drug-list";

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact={true} path="/" component={DrugList} />
            <Route path="/add-drug" component={DrugAdd} />
            <Route path="/edit-drug/:id" component={DrugEdit} />
            {/* <Route path="/list-drug" component={DrugList} /> */}
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
