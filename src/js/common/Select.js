import React, {Component} from 'react';

function Select(props) {
  return (
    <div className="fieldSets-group">
      <div className="fieldSet fieldSet-1of2" id="CITY">
        <select id="ddl_city_no" className="A" disabled={true}></select>
      </div>
      <div className="fieldSet fieldSet-1of2" id="SCHOOL">
        <select id="ddl_area_no" className="A" disabled={true}></select>
      </div>
    </div>
  );
}

export default Select;