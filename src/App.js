import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TimeAgo from 'react-timeago';
import germanStrings from 'react-timeago/lib/language-strings/de'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import 'App.css';
import GasTable from 'GasTable';
import PriceTrend from 'PriceTrend';
import spinner from 'spinner.svg';
const query = gql`{
  lastGasData {
    lastUpdated
    e5
    diesel
  }
  allGasData(last: 14) {
    e5
    diesel
    lastUpdated
  }
}`;
const colors = ['#03a9f4', '#9c27b0'];
const formatter = buildFormatter(germanStrings);
const LastUpdated = ({data}) => {
  if(!data.loading){
    const {lastGasData} = data;
    return <TimeAgo date={lastGasData.lastUpdated} formatter={formatter}/>
  }
  return <pan>...</pan>
};
const GasPrices = ({data}) => {
  if(!data.loading){
    const {lastGasData, allGasData} = data;
    return (
      <div className="gasPrices">
        <GasTable data={[
          {
            label: 'Super (E5)',
            price: lastGasData.e5,
            color: colors[0],
          },
          {
            label: 'Diesel',
            price: lastGasData.diesel,
            color: colors[1],
          }
        ]} />
        <PriceTrend data={allGasData} colors={colors} />
      </div>
  );
  }
  return (
    <div className="loading">
      <img src={spinner} alt="spinner" />
    </div>
  );
};
const App = ({data}) => {
  return (
  <div className="App">
    <div className="App-header">
      <h2>Globus Tankstelle Dutenhofen</h2>
      <h3>Letzes Update <LastUpdated data={data} /></h3>
    </div>
    <GasPrices data={data}/>
  </div>
)};


export default graphql(query)(App);
