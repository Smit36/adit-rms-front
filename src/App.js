import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Edit from './components/Edit/Edit';
import View from './components/View/View';

import getDepartments from './controllers/getDepartments';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: undefined
    }
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
            />
            <Route
              path='/about'
              render={() =>
                <Fragment>
                  <Header />
                  <About />
                </Fragment>
              }
            />
            <Route
              path='/edit'
              render={() =>
                <Fragment>
                  <Header />
                  <Edit departments={this.state.departments} />
                </Fragment>
              }
            />
            <Route
              path='/view'
              render={() =>
                <Fragment>
                  <Header />
                  <View />
                </Fragment>
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;