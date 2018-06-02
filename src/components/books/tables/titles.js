import React from "react";
import InlineForm from "./inlineTitleForm.js";

const row = (
   x,
   i,
   titles,
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
          x[y.prop]
        }</td>
      ))}
      {
        isLoading ?
        <td className="text-center"><i className="material-icons">more_horiz</i></td>:
        <td className="text-center"><i className="material-icons" style={{color:"blue"}} onClick={() => startEditing(i)}>edit</i></td>
      }
    </tr>
  );
  };

export default ({
  edited,
  isLoading,
   books,
   titles,
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
      books.length === 0  ? <th rowspan="7"><h2 className="text-center">No data available</h2></th>:
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
