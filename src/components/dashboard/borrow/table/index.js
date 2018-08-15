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
        <td key={`trc-${k}`}>
        {
          y.prop === 'dateIssued' ?
            <Moment date={x[y.prop]} />:
            y.prop === 'deadLine' ?
              <Moment date={x[y.prop]} />:
            y.prop == 'bookAcc' ?
               x[y.prop]:
               new Date()-x['deadLine'] <= 0 ? 'None':<Moment diff={x['deadLine']} unit="days">{new Date()}</Moment>

        }
          </td>
        ))
      }
    </tr>
  );
  };


export default ({
   studBorrowAva,
   books,
   titles,
   displayReport
  }) =>(
  <table className="table table-striped table-bordered table-hover">
    <thead>
      {
        books.length === 0 ? <th rowspan="7" style={{fontSize:"20px"}}><h4 className="text-center">{displayReport}</h4></th>:
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
      books.length === 0 ? '':
      books.map((x, i) => row(
       x,
       i,
       titles
      ))
    }
    </tbody>
  </table>
)
