import React from 'react';
import {VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryScatter, VictoryLabel} from 'victory';

const PriceTrend = ({data, colors}) => {
  const dataAccess = (fu) => (val, index) =>({
    x: new Date(val.lastUpdated),
    y: val[fu],
  });
  const e5 = data.reverse().map(dataAccess('e5'));
  const diesel = data.reverse().map(dataAccess('diesel'));
  const ticks = data.reverse().map((val)=>new Date(val.lastUpdated));
  // const domain = {y:[0.8,1.6]};
  return (
    <div>
      <VictoryChart
        height={400}
        width={800}
        theme={VictoryTheme.material}
        padding={80}
      >
        <VictoryAxis
          padding={100}
          tickValues={ticks}
          tickFormat={(x) => `
            ${x.toLocaleDateString('de-DE',{ weekday: 'short', month: 'short', day: 'numeric' })} ${x.toLocaleTimeString('de-DE').substr(0,5)}`}
          tickLabelComponent={<VictoryLabel angle={45} dx={30}/>}
          style={{
            axisLabel: { padding: 55 },
          }}
        />
        <VictoryAxis
          label="Preis"
          dependentAxis
          tickLabelComponent={<VictoryLabel angle={45}/>}
          style={{
            axisLabel: { padding: 30 },
          }}        />
        <VictoryLine
          data={e5}
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
              padding: 12
            }
          }}
          data={e5}
          size={4}
          labels={(val) => `${val.y}€`}
          standalone={false}
        />

        <VictoryLine
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
              padding: 12
            }
          }}
          data={diesel}
          size={4}
          labels={(val) => `${val.y}€`}
          standalone={false}
        />
      </VictoryChart>
    </div>
  );
}

export default PriceTrend;
