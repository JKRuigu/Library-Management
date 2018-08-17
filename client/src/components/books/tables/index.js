import React from "react";
import InlineForm from "./inlineForm.js";

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
   isLoading
) =>
{
  const currentlyEditing = editIdx === i;
  return currentlyEditing ? (
    <tr key={`inline-form-${i}`} >
      <InlineForm
        handleSave={handleSave}
        titles={titles}
        x={x}
        currentBook={x.orderdetails[0].bookTitle}
        i={i}
        stopEditing={stopEditing}
      />
    </tr>
  ) : (
    <tr key={`tr-${i}`} >
      {titles.map((y, k) => (
        <td key={`trc-${k}`} className="text-center">
        {
          y.name == '#' ? i+1 :
          x[y.prop] || x.orderdetails[0].bookTitle
        }</td>
      ))}
      {
        isLoading ?
        <td className="text-center"><i className="material-icons">more_horiz</i></td> :
        <td className="text-center"><i className="material-icons" style={{color:"blue"}} onClick={() => startEditing(i)}>edit</i></td>
      }
      {
        isLoading ?
        <td className="text-center"><i className="material-icons">more_horiz</i></td> :
        <td className="text-center"><i className="material-icons" style={{color:"red"}} id={x._id} onClick={e => handleRemove(e,i)}>delete</i></td>
      }

    </tr>
  );
  };

export default ({
  edited,
  isLoading,
   books,
   titles,
   handleRemove,
   startEditing,
   editIdx,
   handleSave,
   stopEditing,
   handleSort,
   sortDirection,
   columnToSort
  }) =>(
  <table className="table table-striped table-bordered table-hover">
    <thead className="">
    {
      books.length === 0  ? isLoading ===true ? '' :<th rowspan="7"><h4 className="text-center">No books data available</h4></th>:
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
      books.length == 0 ? '' :
      books.map((x, i) => row(
       x,
       i,
       titles,
       handleRemove,
       startEditing,
       editIdx,
       handleSave,
       stopEditing,
       edited,
       isLoading
      ))}
    </tbody>
  </table>
)
