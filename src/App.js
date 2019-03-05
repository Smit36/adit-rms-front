import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Edit from './components/Edit/Edit';
import View from './components/View/View';
import EditSpreadSheet from './components/EditSpreadSheet/EditSpreadSheet';
import ErrorRoute from './components/ErrorRoute/ErrorRoute';

import getDepartments from './controllers/getDepartments';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: undefined,
      spreadSheetUrl: undefined
    }
    this.updateSpreadSheetUrl = this.updateSpreadSheetUrl.bind(this);
  }

  updateSpreadSheetUrl(spreadSheetUrl) {
    this.setState(() => ({ spreadSheetUrl }));
  }

  componentWillMount() {
    getDepartments().then(res => {
      this.setState(() => ({ departments: res.data.departments }));
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              path='/'
              render={() =>
                <Fragment>
                  <Header />
                  <Home />
                </Fragment>
              }
              exact={true}
            />
            <Route
              path='/contact'
              render={() =>
                <Fragment>
                  <Header />
                  <Contact />
                </Fragment>
              }
              exact={true}
            />
            <Route
              path='/about'
              render={() =>
                <Fragment>
                  <Header />
                  <About />
                </Fragment>
              }
              exact={true}
            />
            <Route
              path='/edit'
              render={() =>
                <Fragment>
                  <Header />
                  <Edit
                    departments={this.state.departments}
                    updateSpreadSheetUrl={this.updateSpreadSheetUrl}
                  />
                </Fragment>
              }
              exact={true}
            />
            <Route
              path='/view'
              render={() =>
                <Fragment>
                  <Header />
                  <View />
                </Fragment>
              }
              exact={true}
            />
            <Route
              path='/edit/sheet'
              render={
                () => {
                  if (this.state.spreadSheetUrl) {
                    return (<Fragment>
                      <Header />
                      <EditSpreadSheet url={this.state.spreadSheetUrl} updateSpreadSheetUrl={this.updateSpreadSheetUrl} />
                    </Fragment>)
                  }
                  return <Redirect to='/edit' />
                }
              }
              exact={true}
            />
            <Route
              render={
                () => (
                  <Fragment>
                    <Header />
                    <ErrorRoute />
                  </Fragment>
                )
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;