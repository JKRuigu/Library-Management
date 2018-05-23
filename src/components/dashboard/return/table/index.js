import React from "react";
import Moment from 'react-moment';
const todayDate = Date.now()

const row = (
   x,
   i,
   titles,
   returnBooks
) =>
{
  return (
    <tr key={`tr-${i}`} >
      {
        titles.map((y, k) => (
        <td key={`trc-${k}`}>
        {
          y.prop == 'dateIssued' ?
            <Moment date={x[y.prop]} />:
            y.prop == 'deadLine' ?
              <Moment date={x[y.prop]} />:
            y.prop == 'bookAcc' ?
               x[y.prop]:
               new Date()-x['deadLine'] <= 0 ? 'None':<Moment diff={x['deadLine']} unit="days">{new Date()}</Moment>

        }
             </td>
          ))
        }
      <td><button className="btn btn-success" id={x.bookAcc} name={x.deadLine} onClick={e => returnBooks(e,i)}>RETURN</button></td>
    </tr>
  );
  };


export default ({
   studBorrowAva,
   books,
   titles,
   returnBooks
  }) =>(
  <table className="table table-striped table-bordered table-hover">
    <thead>
      {
        books.length === 0 ? <th rowspan="7"><h2 className="text-center">No borrowed books yet.</h2></th>:
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
        ))
      }
    </thead>
    <tbody>
    {
      books.length == 0 ? '':
      books.map((x, i) => row(
       x,
       i,
       titles,
       returnBooks
      ))
    }
    </tbody>
  </table>
)
