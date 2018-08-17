import React from "react";

export default ({
  students
  }) =>(
  <div>
    <datalist id="datalist2">
    {
      students.map((x,i) =>(
        <option key={`datalist-${i}`} value={x.adminNo}></option>
      ))
    }
    </datalist>
  </div>
)
