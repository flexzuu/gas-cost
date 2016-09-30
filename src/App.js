import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TimeAgo from 'react-timeago';
import 'App.css';
import GasTable from 'GasTable';
import PriceTrend from 'PriceTrend';
const query = gql`{
  lastGasData {
    lastUpdated
    e10
    diesel
  }
  allGasData(last: 7) {
    e10
    diesel
    lastUpdated
  }
}`;
const colors = ['#03a9f4', '#9c27b0'];
const LastUpdated = ({data}) => {
  if(!data.loading){
    const {lastGasData} = data;
    return <TimeAgo date={lastGasData.lastUpdated} />
  }
  return <pan>Loading...</pan>
};
const GasPrices = ({data}) => {
  if(!data.loading){
    const {lastGasData, allGasData} = data;
    return (
      <div>
        <GasTable data={[
          {
            label: 'Super (E10)',
            price: lastGasData.e10,
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
  return <pan>Loading...</pan>
};
const App = ({data}) => {
  return (
  <div className="App">
    <div className="App-header">
      <h2>Globus Tankstelle Dutenhofen</h2>
      <h3>Last updated: <LastUpdated data={data} /></h3>
    </div>
    <GasPrices data={data}/>
  </div>
)};


export default graphql(query)(App);
