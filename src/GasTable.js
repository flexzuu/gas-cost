import React from 'react';
import 'GasTable.css';

const GasPrice = ({label, price, color}) => (
  <tr>
    <td className="label" style={{color}}>{label}</td>
    <td className="price">{price}€</td>
    <td className="price reduced">{Number((price-0.04).toFixed(3))}€</td>
  </tr>
);

const GasTable = ({data}) => {
  return (
      <table className="gas">
        <thead>
          <tr><th className="label">ART</th><th className="price">PREIS</th><th className="price reduced">- 4 CENT</th></tr>
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
