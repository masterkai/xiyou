import React from 'react';
import Analysis from './data/Analysis'
import PropTypes from 'prop-types';

const Analyze = ({character}) => {
    const {allAnalysis} = Analysis
    let title1, title2, content1, content2,red,remain

    const analyzedResult = () => {
        switch (character) {
            case '孫悟空':
                title1 = allAnalysis[0].title1
                title2 = allAnalysis[0].title2
                content1 = allAnalysis[0].content1
                content2 = allAnalysis[0].content2
                red=allAnalysis[0].red
                remain=allAnalysis[0].remain
                break
            case '豬八戒':
                title1 = allAnalysis[1].title1
                title2 = allAnalysis[1].title2
                content1 = allAnalysis[1].content1
                content2 = allAnalysis[1].content2
                red=allAnalysis[1].red
                remain=allAnalysis[1].remain
                break
            case '沙悟淨':
                title1 = allAnalysis[2].title1
                title2 = allAnalysis[2].title2
                content1 = allAnalysis[2].content1
                content2 = allAnalysis[2].content2
                red=allAnalysis[2].red
                remain=allAnalysis[2].remain
                break
            case '唐三藏':
                title1 = allAnalysis[3].title1
                title2 = allAnalysis[3].title2
                content1 = allAnalysis[3].content1
                content2 = allAnalysis[3].content2
                red=allAnalysis[3].red
                remain=allAnalysis[3].remain
                break
        }
    }
    analyzedResult()

    return (
        <div className='analyzedResult'>
            <div className='title'>{title1}</div>
            <p className='analysis'>{content1}</p>
            <div className='title'>{title2}</div>
            <p className='analysis'>{content2}<span style={{'color':'red'}}>{red}</span>{remain}</p>
        </div>
    );
};

Analyze.propTypes = {};

export default Analyze;