import React from "react";

export default ({
   studBorrowAva,
   student,
   titles
  }) =>(
  <table className="table table-striped table-bordered table-hover">
    <thead>
      {
        student.length == 0 ? <th rowspan="7"><h2 className="text-center">No data available</h2></th>:
        student[0].myBooks  == undefined ? <th rowspan="7"><h2 className="text-center">The student have no borrowed books</h2></th> :
        titles.map((x, i) =>{
          console.log(x)          
        }

      }
    </thead>
    <tbody>

    </tbody>
  </table>
)
