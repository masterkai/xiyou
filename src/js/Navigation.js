import React from 'react';
import Arrow from "./Arrow";
import PropTypes from 'prop-types';

const Navigation = ({allAnswers, goToPreviousQuestion, showResults, goToNextQuestion, progress}) => {
    const navIsActive = allAnswers.length > 0

    return (
        <div className={`navigation text-center ${navIsActive ? 'is-active' : ''}`}>
            <Arrow
                direction='left'
                allAnswers={allAnswers}
                progress={progress}
                goToPreviousQuestion={goToPreviousQuestion}
                showResults={showResults}
            />
            <Arrow
                direction='right'
                allAnswers={allAnswers}
                progress={progress}
                goToNextQuestion={goToNextQuestion}
                showResults={showResults}
            />
        </div>
    );
};

Navigation.propTypes = {};

export default Navigation;