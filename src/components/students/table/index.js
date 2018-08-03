import React from "react";
import InlineForm from "./inlineForm";
import PrintModal from "../modal/print"
import Moment from 'react-moment';

const row = (
   x,
   i,
   titles,
   handleRemove,
   startEditing,
   editIdx,
   handleSave,
   stopEditing,
   edited,
   isLoading,
   handlePrint,
   indexpageNumber
) =>
{
  const currentlyEditing = editIdx === i;
  return currentlyEditing ? (
    <tr key={`inline-form-${i}`} >
      <InlineForm
        handleSave={handleSave}
        titles={titles}
        x={x}
        i={i}
        stopEditing={stopEditing}
      />
    </tr>
  ) : (
    <tr key={`tr-${i}`} >
      {
        titles.map((y, k) => (
          <td key={`trc-${k}`} className="text-center" id={`trc-${k}`}>
          {
            y.name == '#' ? indexpageNumber+1+i :
            y.prop == 'admissionDate' ?
              <Moment date={x[y.prop]} />:
            x[y.prop]
          }
          </td>
        ))
      }
      {
        isLoading ?
        <td className="text-center"><i className="material-icons">more_horiz</i></td> :
        <td className="text-center"><i className="material-icons" style={{color:"blue"}}  onClick={() => startEditing(i)}>edit</i></td>
      }
      {
        isLoading ?
        <td className="text-center"><i className="material-icons">more_horiz</i></td> :
        <td className="text-center"><i className="material-icons" style={{color:"red"}} id={x._id} onClick={e => handleRemove(e,i)}>delete</i></td>
      }
      {
        isLoading ?
        <td className="text-center"><i className="material-icons">more_horiz</i></td> :
        <td className="text-center">
          <PrintModal
            x={x}
            i={i}
          />
        </td>
      }
    </tr>
  );
  };

export default ({
  indexpageNumber,
   edited,
   students,
   titles,
   handleRemove,
   startEditing,
   editIdx,
   handleSave,
   stopEditing,
   handleSort,
   sortDirection,
   columnToSort,
   isLoading,
   handlePrint
  }) =>(
  <table className="table table-striped table-bordered table-hover">
    <thead>
    {
      students.length === 0 ? <th rowspan="7"><h2 className="text-center">No students data available</h2></th>:
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
    )}

    </thead>
    <tbody>
    {
      students.length === 0? '' :
      students.map((x, i) => row(
       x,
       i,
       titles,
       handleRemove,
       startEditing,
       editIdx,
       handleSave,
       stopEditing,
       edited,
       isLoading,
       handlePrint,
       indexpageNumber
      ))}
    </tbody>
  </table>
)
