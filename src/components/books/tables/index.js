import React from "react";

const row = (
   x,
   i,
   titles,
   handleRemove,
   startEditing,
   editIdx,
   handleChange,
   stopEditing,
   edited
) =>
{
  const currentlyEditing = editIdx === i;
  return (
  <tr key={`tr-${i}`}>
    { titles.map((y, k) =>
      <td key={`trc-${k}`}>
      {
        edited === true ? (
        currentlyEditing ? (
          <input
            autocomplete="off"
            list="datalist1"
            id={x._id}
            name={y.prop}
            onChange={e => handleChange(e, y.prop, i)}
          />
        ):
        currentlyEditing ?
          <input
            autocomplete="off"
            list="datalist1"
            id={x._id}
            name={y.prop}
            onChange={e => handleChange(e, y.prop, i)}
            value={x[y.prop] || x.orderdetails[0].bookTitle}
          />
        : (
          x[y.prop] || x.orderdetails[0].bookTitle
        )}
      </td>
    )}
    <td>
        {currentlyEditing ? (
          <i className="material-icons" onClick={() => stopEditing()}>done</i>
        ) : (
          <i className="material-icons" onClick={() => startEditing(i)}>edit</i>
        )}
      </td>
    <td><i className="material-icons" id={x._id} onClick={e => handleRemove(e,i)}>delete</i></td>
    </tr>
  )
  }

export default ({
  edited,
  isLoading,
   books,
   titles,
   handleRemove,
   startEditing,
   editIdx,
   handleChange,
   stopEditing,
   handleSort,
   sortDirection,
   columnToSort
  }) =>(
  <table className="table table-striped table-bordered table-hover">
    <thead className="">
    {
      books.length === 0  ? isLoading ===true ? '' :<th rowspan="7"><h2 className="text-center">No books data available</h2></th>:
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
      books.length === 0? '' :
      books.map((x, i) => row(
       x,
       i,
       titles,
       handleRemove,
       startEditing,
       editIdx,
       handleChange,
       stopEditing,
       edited
      ))}
    </tbody>
  </table>
)
