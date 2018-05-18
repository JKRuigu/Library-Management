import React from "react";

export default ({
  books
  }) =>(
  <div>
    <datalist id="datalist3">
    {
      books.map((x,i) =>(
        <option key={`datalist-${i}`} value={x.bookAccession}></option>
      ))
    }
    </datalist>
  </div>
)
