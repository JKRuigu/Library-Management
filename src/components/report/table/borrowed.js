import React from "react";

const row = (
   x,
   i,
   titles,
   handleRemove,
   handleSave,
) =>
{
  return  (
    <tr key={`tr-${i}`} >
      {
        titles.map((y, k) => (
        <td key={`trc-${k}`} className="text-center">
        {
          y.name === '#' ? i+1 :
          x[y.prop] || x.orderdetails[0].bookTitle
        }</td>
       ))
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
      books.length === 0 ? '' :
      books.map((x, i) => row(
       x,
       i,
       titles,
       handleRemove
      ))}
    </tbody>
  </table>
)
