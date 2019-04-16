import React from 'react';

function CheckBox(props) {
    return (
        <div className="fieldSets-group">
            <div className="fieldSet fieldSet--read" id="READ">
                <label>
                    <input
                        type="checkbox"
                        className="searchtext2"
                        name="per_chk"/>
                    <span>我已詳細閱讀並接受<a onClick={() => {
                        window.open('http://www.pcschool.com.tw/member/Message.html', 'person', 'config:height=640,width=830')
                        return false;
                    }} href="#">個資保護聲明</a></span>
                </label>
            </div>
        </div>
    );
}

export default CheckBox;