import React from 'react';
import lifecycle from 'react-pure-lifecycle';
import $ from 'jquery'
import {default_city_no, city_change, seq_city_change, seq_city_no} from '../../services/validate'

const methods = {
  componentDidMount(props) {
    console.log('I mounted! Here are my props: ', props);

  }
};


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

export default lifecycle(methods)(Select);