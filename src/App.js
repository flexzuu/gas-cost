import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import logo from 'logo.svg';
import 'App.css';
import GasTable from 'GasTable';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      prices: {
        autogas: 0,
        diesel: 0,
        erdgas: 0,
        supere5: 0,
        biodiesel: 0,
        supere10: 0,
        superplus: 0,
        datum: null
      },
      lastUpdated: null,
      spin: true
    }
  }
  componentDidMount() {
    fetch('/kfz?markt=dut', {
      method: 'get',
      headers: new Headers({
		      'Content-Type': 'text/plain'
	   })
    })
    .then((res) => {
        return res.json();
    }).then((json) => {
        this.setState({
          prices: json,
          lastUpdated: parseInt(json.datum, 10),
          spin: false
        });
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className={this.state.spin ? "App-logo spin": "App-logo"} alt="logo" />
          <h2>Globus Tankstelle Dutenhofen</h2>
          <h3>Last updated: <TimeAgo date={this.state.lastUpdated} /></h3>
        </div>
        <GasTable prices={this.state.prices} toHide={["datum", "biodiesel", "erdgas"]}/>
      </div>
    );
  }
}

export default App;
