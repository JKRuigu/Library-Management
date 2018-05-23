import React from "react";
import Moment from 'react-moment';

const row = (
   x,
   i,
   titles
) =>
{
  return (
    <tr key={`tr-${i}`} >
      {
        titles.map((y, k) => (
        <td key={`trc-${k}`}>{y.prop == 'dateIssued' ?
          <Moment date={x[y.prop]} />:
           x[y.prop] }</td>
        ))
      }
    </tr>
  );
  };


export default ({
   studBorrowAva,
   books,
   titles
  }) =>(
  <table className="table table-striped table-bordered table-hover">
    <thead>
      {
        books.length === 0 ? <th rowspan="7"><h2 className="text-center">Student&#39;s borrowed books will display here</h2></th>:
        titles.map((x, i) =>(
        <th key={`thc-${i}`}>
        <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
          <span>{x.name}</span>
          </div>
        </th>
        )
        )
      }
    </thead>
    <tbody>
    {
      books.length == 0 ? '':
      books.map((x, i) => row(
       x,
       i,
       titles
      ))
    }
    </tbody>
  </table>
)
