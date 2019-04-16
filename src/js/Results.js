import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form'
import Analyze from "./Analyze";

const Results = ({loadNewQuestion, allAnswers, allQuestions, onLoadResults, onRestart, resultsLoaded, theFinalResult}) => {

    const analyzeTheFinalResult = (theFinalResult) => {
        let character = undefined
        switch (theFinalResult) {
            case 'c1':
                character = '孫悟空'
                break
            case 'c2':
                character = '豬八戒'
                break
            case 'c3':
                character = '沙悟淨'
                break
            case 'c4':
                character = '唐三藏'
                break
        }
        return character
    }

    return (
        <div className={`results fade-out ${loadNewQuestion ? 'fade-out-active' : ''}`}>
            <div className="loader">
                <div className="icon"></div>
            </div>
            <div className="results-overlay"></div>
            <h4 className='text-center'>{`${resultsLoaded ? '以勾選的選項，最多者為答案' : ''}`}</h4>
            {
                theFinalResult ?
                    <p className='text-center'
                       style={{'fontSize': '3rem'}}>{`所以你是: ${analyzeTheFinalResult(theFinalResult)}`}</p> : null
            }
            <div className="answers">
                {
                    resultsLoaded ?
                        <Analyze
                            character={analyzeTheFinalResult(theFinalResult)}
                        /> : <Form />
                }

            </div>
            <div className="text-center">
                {resultsLoaded ? <button className="btn btn-dark" onClick={(e) => {
                        onRestart();
                    }}>再玩一次</button>
                    : <button disabled={false} className="btn btn-dark" onClick={(e) => {
                        onLoadResults();
                    }}>點我看解析</button>
                }

            </div>
        </div>
    );
};

Results.propTypes = {
    loadNewQuestion: PropTypes.bool.isRequired,
    allAnswers: PropTypes.array.isRequired,
    allQuestions: PropTypes.array.isRequired,
    onLoadResults: PropTypes.func.isRequired,
    onRestart: PropTypes.func.isRequired,
    resultsLoaded: PropTypes.bool.isRequired,
    theFinalResult: PropTypes.string,
};

export default Results;