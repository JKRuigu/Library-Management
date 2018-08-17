import React from "react";
import Moment from 'react-moment';

const row = (
   x,
   i,
   titles,
   handleRemove,
   indexpageNumber
) =>
{
  return (
    <tr key={`tr-${i}`} >
      {
        titles.map((y, k) => (
        <td key={`trc-${k}`}>
        {
          y.name == '#' ? i+1+indexpageNumber :
          x[y.prop]
        }
          </td>
        ))
      }
      <td>
        <button
          className="btn btn-success"
          style={{
            display: "flex",
            alignItems: "center"
          }}
          id={x._id}
          onClick={e => handleRemove(e,i)}
          >
          clear
        </button>
      </td>
    </tr>
  );
  };


export default ({
  indexpageNumber,
      edited,
      isLoading,
      handleRemove,
     handleSort,
     sortDirection,
     columnToSort,
     overdue,
     titles
  }) =>(
  <table className="table table-striped table-bordered table-hover">
    <thead>
    {
      overdue== undefined ? '':
      overdue.length == 0  ? isLoading ===true ? '' :<th rowspan="7"><h4 className="text-center">No overdue data available</h4></th>:
      titles.map((x, i) =>(
      <th key={`thc-${i}`}>
      <div
          style={{
            display: "flex",
            alignItems: "center"
          }}
          onClick={() => handleSort(x.prop)}
        >
          <span>{x.name}</span>
          {columnToSort === x.prop ? (
            sortDirection === "asc" ? (
              <i className="material-icons">arrow_drop_up</i>
            ) : (
              <i className="material-icons">arrow_drop_down</i>
            )
          ) : null}
        </div>
      </th>
    )
    )
  }
    </thead>
    <tbody>
    {
      overdue== undefined ? '':
      overdue.length == 0 ? '':
      overdue.map((x, i) => row(
       x,
       i,
       titles,
       handleRemove,
       indexpageNumber
      ))
    }
    </tbody>
  </table>
)
