import React from 'react';

function Input(props) {
  return (
    <div className="fieldSets-group">

      <div className="fieldSet" id="EMAIL">
        <input type="text" name="ea" className="A" id="email"
               placeholder="E-mail"/>
      </div>
    </div>
  );
}

export default Input;