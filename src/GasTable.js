import React, { Component } from 'react';
import 'GasTable.css';

function Row({type, price}) {
  return (
    <tr>
      <td className="title">{type.toUpperCase()}</td>
      <td className="price">{price}€</td>
    </tr>
  );
}

class GasTable extends Component {
  render() {
    return (
        <table className="gas">
          <thead>
            <tr><th className="title">TYPE</th><th className="price">PRICE</th></tr>
          </thead>
          <tbody>
            {Object.keys(this.props.prices)
              .filter((key)=> !this.props.toHide.includes(key))
              .sort()
              .map((key)=><Row key={key} type={key} price={this.props.prices[key]}/>)
            }
          </tbody>
        </table>
    );
  }
}

export default GasTable;
