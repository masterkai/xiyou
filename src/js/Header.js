import React from 'react';
import defaultImage from '../images/img04.svg'
import c1 from '../images/c1.svg'
import c2 from '../images/c2.svg'
import c3 from '../images/c3.svg'
import c4 from '../images/c4.svg'
import PropTypes from 'prop-types';

const Header = ({currentQuestion, showResults, loadNewQuestion, theFinalResult}) => {
    const {image} = currentQuestion
    const headerImage = !showResults ? image : defaultImage
    const finalImage = (theFinalResult && theFinalResult === 'c1' ? c1 : null) ||
        (theFinalResult && theFinalResult === 'c2' ? c2 : null) ||
        (theFinalResult && theFinalResult === 'c3' ? c3 : null) ||
        (theFinalResult && theFinalResult === 'c4' ? c4 : null)


    return (
        <header>
            {
                theFinalResult ?
                    <img className={`fade-out ${loadNewQuestion ? 'fade-out-active' : ''}`}
                         src={finalImage}/> :
                    <img className={`fade-out ${loadNewQuestion ? 'fade-out-active' : ''}`}
                         src={headerImage}/>
            }

        </header>
    );
};

Header.propTypes = {
    theFinalResult: PropTypes.string,
};

export default Header;