import React from "react";

const row = (
   x,
   i,
   titles,
   handleRemove,
   startEditing,
   editIdx,
   handleChange,
   stopEditing
) =>
{
  const currentlyEditing = editIdx === i;
  return (
  <tr key={`tr-${i}`}>
    {titles.map((y, k) =>
      <td key={`trc-${k}`}>
      {currentlyEditing ? (
          <input
            id={x._id}
            name={y.prop}
            onChange={e => handleChange(e, y.prop, i)}
            value={x[y.prop]}
          />
        ) : (
          x[y.prop]
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
   stream,
   titles,
   handleRemove,
   startEditing,
   editIdx,
   handleChange,
   stopEditing,
   sortDirection,
   columnToSort
  }) =>(
  <table className="table table-striped table-bordered table-hover">
    <thead className="">
    {titles.map((x, i) =>(
      <th key={`thc-${i}`}>
      <div>
        <span>{x.name}</span>
      </div>
      </th>
    )
    )}
    <th>Edit</th>
    <th>Delete</th>
    </thead>
    <tbody>
    {stream.map((x, i) => row(
       x,
       i,
       titles,
       handleRemove,
       startEditing,
       editIdx,
       handleChange,
       stopEditing
      ))}
    </tbody>
  </table>
)
