import React from 'react';
import 'GasTable.css';

const GasPrice = ({label, price, color}) => (
  <tr>
    <td className="label" style={{color}}>{label}</td>
    <td className="price">{price}€</td>
  </tr>
);

const GasTable = ({data}) => {
  return (
      <table className="gas">
        <thead>
          <tr><th className="label">TYPE</th><th className="price">PRICE</th></tr>
        </thead>
        <tbody>
          {
            data.map((obj, index)=><GasPrice key={index} color={obj.color} label={obj.label} price={obj.price}/>)
          }
        </tbody>
      </table>
  );
}


export default GasTable;
