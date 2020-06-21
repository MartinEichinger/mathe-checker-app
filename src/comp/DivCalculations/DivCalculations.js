import React from 'react';

import './DivCalculations.scss';
import {getCalculationSmall1x1, randomCalculationSmall1x1, randomCalculationBig1x1, randomCalculationRational} from './randomCalculation';
import {CalcArea1x1} from '../CalcArea1x1/CalcArea1x1';
import {CalcAreaRational} from '../CalcAreaRational/CalcAreaRational';

import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

export class DivCalculations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCalculations: [],
      solvedCalculations: 0,
      calcDone: false,
      doneCalculations: [],
      notDoneCalculations: [],
      notDoneCalculationsReps: 0,
      debugLevel: 1,
      keyboardActive: false
    }

    this.isVisRef = React.createRef();
    this.isSolvedRef = React.createRef();
    this.fallRef = React.createRef();

    this.getNewCalc = this.getNewCalc.bind(this);
    this.evalResult = this.evalResult.bind(this);
    this.handleGoBtnClick = this.handleGoBtnClick.bind(this);
    this.remNewCalculation = this.remNewCalculation.bind(this);
    this.addDoneCalculation = this.addDoneCalculation.bind(this);
    this.updateLists = this.updateLists.bind(this);
    this.renderList = this.renderList.bind(this);
    this.renderResultList = this.renderResultList.bind(this);
    //this.handleInputChange = this.handleInputChange.bind(this);

  }

  componentWillMount() {
    if(this.state.debugLevel === 2) {console.log('componentWillMount: ', this.state.newCalculations, this.props);};
    if (this.state.newCalculations.length === 0) {
      this.getNewCalc(this.props.appState, this.props.propsCheckbox);
    }
  }

  getNewCalc(state, checkbox) {
    if(this.state.debugLevel === 2) { console.log('DivCalculation/getNewCalc/checks: ', state, checkbox); };

    let checks = state.checkboxChecks;
    let select = state.selectSelected;
    let values;
    let newCalcValues;

    select !== '' ? values = checkbox.values[state.selectSelected]: values = checkbox.values[0];
    if(this.state.debugLevel === 3) { console.log('getNewCalc/checks: ', checks, values); };

    // random calculation for small 1x1
    if (select === 1) {
      newCalcValues = randomCalculationSmall1x1(values, checks);
      ///////////////////////
      let testNewCalcValue;
      getCalculationSmall1x1(values, checks).then(calc => {
          console.log('hier: ', calc);
          testNewCalcValue = {
            calcStr: calc.task,
            result: calc.result
          }
          console.log('hier1: ', testNewCalcValue);
          let entry = this.state.newCalculations;
          entry.push(testNewCalcValue);

          this.setState({
            newCalculations: entry
          });
      });
      console.log('test', testNewCalcValue, newCalcValues);
    }
    // random calculation for big 1x1
    if (select === 2) {
      newCalcValues = randomCalculationBig1x1(values, checks);
    }
    // random calculation for big 1x1
    if (select === 3) {
      newCalcValues = randomCalculationRational(values, checks);
    }

    // Update newCalculation string
    //this.state.debugLevel >= 2 ? console.log('getNewCalc/result: ', calc_str, result): '';
    console.log('hier2');
    //let entry = this.state.newCalculations;
    //entry.push(newCalcValues);

    //this.setState({
    //  newCalculations: entry
    //});
  }

  remNewCalculation() {
    let item = this.state.newCalculations.shift();
    if (this.state.debugLevel >= 2) {console.log('DivCalc/remNewCalculation/item: ', item)};
    return item;
  }

  addDoneCalculation(arr, passed) {
    let entry;
    // add arr to doneCalculations or notDoneCalculations, dependent on quizz result
    passed ? entry = this.state.doneCalculations: entry = this.state.notDoneCalculations;
    entry.unshift(arr);
    if (this.state.debugLevel >= 2) {console.log('DivCalc/addDoneCalc/entry: ', entry)};
    passed ? this.setState({doneCalculations: entry}): this.setState({notDoneCalculations: entry});
  }

  evalResult(input, result) {
    //this.state.debugLevel >= 2 ? console.log('evalResult: ', input, result): '';
    return parseFloat(input).toPrecision(3) === parseFloat(result).toPrecision(3);
  }

  handleGoBtnClick (value) {
    // get user input and result
    let input = value;
    input = input.replace(',' , '.');
    let result = this.state.newCalculations[0].result;

    // evaluate user input and result / delete entries
    let res = this.evalResult(input, result);
    if(this.state.debugLevel === 3) { console.log('debug/input: ', value, res); };
    //event.currentTarget.parentNode.querySelector('input').value = '';
    //this.handleInputChange(event);
    //console.log('debug: ', res);

    // repeat or cheer
    if (res) {
      //this.state.debugLevel >= 2 ? console.log("Yeah", this.isVisRef.current): '';
      // show animation for 3 secs
      const isInvis = this.isVisRef.current;
      isInvis.style.backgroundImage = "url(./images/cheer.gif)";
      isInvis.classList.toggle('isInvis');
      setTimeout(() => {isInvis.classList.toggle('isInvis');}, 3000);

      //const isSolved = this.isSolvedRef.current;
      //isSolved.classList.toggle('isSolved');
      //setTimeout(() => {isSolved.classList.toggle('isSolved');}, 300);

      // Update proposed quizzes, transfer result -> passed
      this.updateLists(true);
      this.setState({notDoneCalculationsReps: 0});
    } else {
      //this.state.debugLevel >= 2 ? console.log('Ouuuh'): '';
      this.setState({
        notDoneCalculationsReps: this.state.notDoneCalculationsReps + 1
      });
      const isInvis = this.isVisRef.current;
      isInvis.style.backgroundImage = "url(./images/think.gif)";
      isInvis.classList.toggle('isInvis');
      setTimeout(() => {isInvis.classList.toggle('isInvis');}, 3000);

      if (this.state.notDoneCalculationsReps === 1) {
        // Update proposed quizzes, transfer result -> not passed
        this.updateLists(false);
        this.setState({notDoneCalculationsReps: 0});
      }
    }
  }

  updateLists(passed) {
    // take over to doneCalculations and remove from newCalculations
    let arr = this.remNewCalculation();
    if (arr.calcStr.length === 6) {arr.calcStr = `(${arr.calcStr[0]}${arr.calcStr[1]}) ${arr.calcStr[2]} (${arr.calcStr[3]}${arr.calcStr[4]}) ${arr.calcStr[5]}`};
    passed ? this.addDoneCalculation(arr, true): this.addDoneCalculation(arr, false);

    // update solved counter
    this.setState({
      solvedCalculations: this.state.solvedCalculations+1
    });

    // calculate whether done or not
    if (this.props.appState.checkboxTasksNo.length === this.state.solvedCalculations+1) {
      this.setState({
        calcDone: true
      });
    }

    // getNewCalc or finish
    if(this.state.debugLevel === 3) { console.log('updateLists/finish or newCalc: ', this.props.appState, this.props.propsCheckbox, this.props.appState.checkboxTasksNo, this.state.solvedCalculations); };
    if (this.state.calcDone) {
      const isInvis = this.isVisRef.current;
      isInvis.style.backgroundImage = "url(./images/cheer.gif)";
      isInvis.classList.toggle('isInvis');
      //const isSolved = this.isSolvedRef.current;
      //isSolved.classList.toggle('isInvis');
    } else {
      this.getNewCalc(this.props.appState, this.props.propsCheckbox);
    }
  }

  // RENDER
  renderResultList(calc) {
      calc = calc.length === 0 ? [{calcStr: '...gleich gehts los'}] : calc;
      if(this.state.debugLevel === 2) { console.log('DivCalculations/renderResultList: ', calc); };
      return calc.map((item, i) => {
        //console.log('renderList: ', item.calcStr, item.result);
        return <p key={i} >{item.calcStr} {item.result}</p>;
      });
  }

  renderProgressBar(items) {
    return items.map((item, i) => {
      //console.log('DivCalc1x1/renderProgressBar: ', item, i, this.state.solvedCalculations);
      if (this.state.solvedCalculations >= item) {
        return item%5 === 0 ? <p key={i} className="bigBean yellow"><DoneOutlineIcon /></p> : <p key={i} className="bean yellow" ></p>;
      } else {
        return item%5 === 0 ? <p key={i} className="bigBean grey">{item/5}</p> : <p key={i} className="bean grey" ></p>;
      }
    })
  }

  renderList(select) {
    if(this.state.debugLevel === 2) { console.log('DivCalculations / renderList: ', select); };
    if (this.state.calcDone) {
      return <h1>Prima...geschafft...</h1>
    } else if (select === 1 || select === 2) {
      return <CalcArea1x1
              appState={this.props.appState}
              calcState={this.state}
              input={this.props.input}
              goButton={this.handleGoBtnClick}
              keyboardState={this.props.keyboardState}
              />;
    } else if (select === 3) {
      return <CalcAreaRational
              appState={this.props.appState}
              calcState={this.state}
              goButton={this.handleGoBtnClick}
              keyboardState={this.props.keyboardState}
              />;
    }
  }

  render() {
    if(this.state.debugLevel === 2) { console.log('DivCalc/re-render'); };
    return (
      <div className="divCalculationsHead" >
        <div className="divCalculations" >
          <div className="progressBlock">
            {this.renderProgressBar(this.props.appState.checkboxTasksNo)}
          </div>

          <div className="calculationBlock">
            {this.renderList(this.props.appState.selectSelected)}
            <div className="cheerRbooh isInvis" ref={this.isVisRef} ></div>
          </div>

          <div className="resultBlock">
            <div className="listCalc" >
              <div className="listCalcHeader">
                Yeah!
              </div>
              <div className="listCalcBody">
                {this.renderResultList(this.state.doneCalculations)}
              </div>
            </div>
            <div className="listNotCalc" >
              <div className="listNotCalcHeader">
                Beim nächsten mal
              </div>
              <div className="listNotCalcBody">
                {this.renderResultList(this.state.notDoneCalculations)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
