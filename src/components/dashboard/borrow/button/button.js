import React from "react";


export default ({
  book,
  student,
  issueBook
  }) =>(
    <div>
    {
      !book  || !student ? <button type="button" onClick={() => issueBook()} className="btn btn-info" style={{height:"50px",width:"100px"}} disabled>Issue</button> :
      <button type="button" onClick={() => issueBook()} className="btn btn-info" style={{height:"50px",width:"100px"}} >Issue</button>
    }

    </div>
)
