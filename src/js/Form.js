import React, {Component} from 'react';
import lifecycle from 'react-pure-lifecycle';
import TwoInput from './common/Inputx2'
import OneInput from './common/Input'
import Select from './common/Select'
import CheckBox from './common/CheckBox'
import Gift from '../images/gifts.png'
import PropTypes from 'prop-types';
import $ from "jquery";
import {
    city_change,
    default_city_no,
    seq_city_change,
    seq_city_no
} from "../services/validate";

const methods = {
    componentDidMount() {

        if (typeof (seq_School) === "undefined") {
            default_city_no();

            $('#ddl_city_no').change(function () {
                city_change();
            });
        } else if (seq_School === "Y") {
            seq_city_no();
            $('#ddl_city_no').change(function () {
                seq_city_change();
            });
        } else {
            default_city_no();
            $('#ddl_city_no').change(function () {
                city_change();
            });
        }


    }
}

const Form = props => {
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="form-title">
                    <h2>每個答案背後，象徵不同的職場性格！快來填表看解析</h2>
                </div>
                <div className="form">
                    <div className="col-md-4">
                        <img className='img-responsive' src={Gift} alt=""/>
                    </div>
                    <div className="col-md-8">

                        <TwoInput/>

                        <OneInput/>

                        <Select/>

                        <CheckBox/>

                    </div>
                </div>
            </div>
        </div>
    );

};

Form.propTypes = {};

export default lifecycle(methods)(Form);
// export default Form