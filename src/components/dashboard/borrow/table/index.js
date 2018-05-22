import React from "react";

const row = (
   x,
   i,
   titles
) =>
{
  return (
    <tr key={`tr-${i}`} >
      {titles.map((y, k) => (
        <td key={`trc-${k}`}>{console.log()}</td>
      ))}
        <td><i className="material-icons">edit</i></td>
        <td><i className="material-icons">delete</i></td>
    </tr>
  );
  };


export default ({
   studBorrowAva,
   student,
   titles
  }) =>(
  <table className="table table-striped table-bordered table-hover">
    <thead>
    {
      student.length === 0 ? <th rowspan="7"><h2 className="text-center">No students data available</h2></th>:
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
    )}
    </thead>
    <tbody>
    {
      console.log(student) ||
      student.length === 0? '' :
      student.map((x, i) => row(
       x,
       i,
       titles
      ))}
    </tbody>
  </table>
)
