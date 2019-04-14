import React from 'react';

function Inputx2(props) {
  return (
    <div className="fieldSets-group">
      <div className="fieldSet fieldSet-1of2" id="NAME">
        <input type="text" name="" className="A" id="name"
               placeholder="姓 名"/>
      </div>
      <div className="fieldSet fieldSet-1of2" id="PHONE">
        <input type="tel" name="" className="A" id="mobile"
               placeholder="行動電話"/>
      </div>
    </div>
  );
}

export default Inputx2;