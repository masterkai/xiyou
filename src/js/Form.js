import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery'
import Gift from '../images/gifts.png'

//https://www.pcschool.com.tw/wguest/js/m_pcschool2018.js

const Form = props => {

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="form-title">
                    <h2>每個答案背後，象徵不同的職場性格！快來填表看解析</h2>
                </div>
                <div className="form">
                    <div className="col-md-6">
                        <img className='img-responsive' src={Gift} alt=""/>
                    </div>
                    <div className="col-md-6">
                        <div className="fieldSets-group">
                            <div className="fieldSet fieldSet-1of2" id="NAME">
                                <input type="text" name="" className="A" data-watermark="姓 名" id="name"
                                       placeholder="姓 名"/>
                            </div>
                            <div className="fieldSet fieldSet-1of2" id="PHONE">
                                <input type="tel" name="" className="A" data-watermark="行動電話" id="mobile"
                                       placeholder="行動電話"/>
                            </div>
                        </div>
                        <div className="fieldSets-group">

                            <div className="fieldSet" id="EMAIL">
                                <input type="text" name="ea" className="A" data-watermark="E-mail" id="email"
                                       placeholder="E-mail"/>
                            </div>
                        </div>
                        <div className="fieldSets-group">
                            <div className="fieldSet fieldSet-1of2" id="CITY">
                                <select id="ddl_city_no" className="A" disabled="disabled"></select>
                            </div>
                            <div className="fieldSet fieldSet-1of2" id="SCHOOL">
                                <select id="ddl_area_no" className="A" disabled="disabled"></select>
                            </div>
                        </div>

                        <div className="fieldSets-group">
                            <div className="fieldSet fieldSet--read" id="READ">
                                <label><input type="checkbox" className="searchtext2" name="per_chk"/>
                                    <span>我已詳細閱讀並接受
                                    <a
                                        onClick=
                                            {
                                                ()=>{
                                                    window.open(
                                                        'http://www.pcschool.com.tw/member/Message.html',
                                                        'person',
                                                        'config:height=640,width=830'
                                                    )
                                                    return false;
                                                }

                                            }
                                        href="#"
                                    >個資保護聲明
                                    </a>
                                </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Form.propTypes = {};

export default Form;