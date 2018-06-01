import React from "react";
import Moment from 'react-moment';
const todayDate = Date.now()

const row = (
   x,
   i,
   titles,
   returnBooks,
   isLoading
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
      <td>
      {
        isLoading ?
        <button className='btn btn-info loading'>Loading ...</button> :
        <button className={isLoading ? 'btn btn-success loading' : "btn btn-success"}  onClick={e => returnBooks(e,i,x)}>RETURN</button>
      }

      </td>
    </tr>
  );
  };


export default ({
   studBorrowAva,
   books,
   titles,
   returnBooks,
   isLoading
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
       returnBooks,
       isLoading
      ))
    }
    </tbody>
  </table>
)
