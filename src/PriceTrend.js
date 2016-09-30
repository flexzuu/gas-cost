import React from 'react';
import {VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryScatter} from 'victory';

const PriceTrend = ({data, colors}) => {
  const dataAccess = (fu) => (val, index) =>({
    x: new Date(val.lastUpdated),
    y: val[fu],
  });
  const e10 = data.reverse().map(dataAccess('e10'));
  const diesel = data.reverse().map(dataAccess('diesel'));
  const ticks = data.reverse().map((val)=>new Date(val.lastUpdated));
  const domain = {
   };
  return (
    <div>
      <VictoryChart
        height={300}
        width={400}
        theme={VictoryTheme.material}
        padding={80}
      >
        <VictoryAxis padding={100} label="Datum" tickValues={ticks} tickFormat={(x) => `${x.getDate()}.${x.getMonth()}`} style={{axisLabel: { padding: 30}}} />
        <VictoryAxis label="Preis" dependentAxis style={{axisLabel: { padding: 38}}}/>
        <VictoryLine
          domain={domain}
          data={e10}
          style={{
            data: {stroke: colors[0]}
          }}
        />
        <VictoryScatter
          style={{
            data: {
              fill: colors[0],
              stroke: "white"
            },
            labels: {
              fill: colors[0],
              fontSize: 11,
              padding: 12
            }
          }}
          data={e10}
          domain={domain}
          size={4}
          labels={(val) => `${val.y}€`}
          standalone={false}
        />

        <VictoryLine
          domain={domain}
          data={diesel}
          style={{
            data: {stroke: colors[1]}
          }}
        />
        <VictoryScatter
          style={{
            data: {
              fill: colors[1],
              stroke: "white"
            },
            labels: {
              fill: colors[1],
              fontSize: 11,
              padding: 12
            }
          }}
          data={diesel}
          domain={domain}
          size={4}
          labels={(val) => `${val.y}€`}
          standalone={false}
        />
      </VictoryChart>
    </div>
  );
}

export default PriceTrend;
