import React from 'react';

import './App.scss';
import {Nav} from '../Nav/Nav';
import {Home} from '../Home/Home';
import {About} from '../About/About';
import Calc from '../Calc/Calc';
import {Login} from '../Login/Login';
import {Footer1Row} from '../Footer1Row/Footer1Row';
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      // 1: Funktionsaufrufe, 2: übergebene Parameter, 3: Debugdetails
      debugLevel: 2,
      keyboardActive: false,
    }

    // props
    this.propsNav = {
      img: {
        src: "./images/Logo-MatheChecker.png",
        txt: "Mathe Checker"
      },
      items: [
              {
                name: 'Home',
                link: '/'
              },
              {
                name: 'Rechnen',
                link: '/calc'
              },
              {
                name: 'About',
                link: '/about'
              },
            ],
      keyboardActive: false
    };

    this.propsFooter = {
        block11Img: '',
        block11Txt1: 'Copyright 2020',
        block12Img1: './images/Logo-MatheChecker.png',
        block13Txt: [
          {
            type: 'footer2',
            name: 'Contact',
            link: '#'
          }
        ],
      };

    // bindings
    this.handleKeyboardActive = this.handleKeyboardActive.bind(this);

  }

  handleKeyboardActive(state) {
    //if (this.state.debugLevel >= 2) {console.log(`App / handleKeyboardActive: ${state}`)};
    //this.setState({
    //  keyboardActive: state
    //})
  }

  render() {
    if (this.state.debugLevel >= 2) {console.log('App: start rendering...')};
    return (
      <div className="App">
        <Nav propsDiv={this.propsNav} onChange={this.handleKeyboardActive} />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/calc">
            <Calc />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer1Row propsDiv={this.propsFooter} />
      </div>
    );
  }
}

export default App;
