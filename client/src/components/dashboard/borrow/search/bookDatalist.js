import React from "react";

export default ({
  books
  }) =>(
  <div>
    <datalist id="datalist3" style={{height:"1px !important"}}>
    {
      books.map((x,i) =>(
        <option key={`datalist-${i}`} value={x.bookAccession}></option>
      ))
    }
    </datalist>
  </div>
)
