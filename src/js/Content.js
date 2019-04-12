import React from 'react';
import Question from './Question';
import Results from './Results';
import Progress from "./Progress";
import PropTypes from 'prop-types';

const Content = ({showResults, currentQuestion, loadNewQuestion, allAnswers, allQuestions, resultsLoaded, onSelectAnswer, onLoadResults, onRestart,theFinalResult}) => {
    return (
        <div className={`content`}>

            {/* Progress - start */}
            <Progress total={allQuestions.length} progress={allAnswers.length}/>
            {/* Progress - end */}

            {
                !showResults ?
                    <Question
                        currentQuestion={currentQuestion}
                        onSelectAnswer={onSelectAnswer}
                        loadNewQuestion={loadNewQuestion}
                        allAnswers={allAnswers}
                    /> :
                    <Results
                        loadNewQuestion={loadNewQuestion}
                        allAnswers={allAnswers}
                        allQuestions={allQuestions}
                        onLoadResults={onLoadResults}
                        resultsLoaded={resultsLoaded}
                        onRestart={onRestart}
                        theFinalResult={theFinalResult}
                    />
            }

        </div>
    );
};

Content.propTypes = {
    currentQuestion: PropTypes.object.isRequired,
    onSelectAnswer: PropTypes.func.isRequired,
    loadNewQuestion: PropTypes.bool.isRequired,
    allAnswers: PropTypes.array.isRequired,
    allQuestions: PropTypes.array.isRequired,
    onLoadResults: PropTypes.func.isRequired,
    resultsLoaded: PropTypes.bool.isRequired,
    onRestart: PropTypes.func.isRequired,
    theFinalResult: PropTypes.string,
};

export default Content;