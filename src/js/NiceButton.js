import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NiceButton extends Component {

    get selected() {
        const {allAnswers, choice} = this.props
        return allAnswers.includes(choice.op)
    }

    getLetter = (index) => {
        const letters = ['A', 'B', 'C', 'D'];
        return letters[index]
    }
    handleClick = (e) => {
        const {choice, onSelectAnswer} = this.props;

        // add the highight class first and then go to next questions
        this.button.classList.add('is-selected', 'is-highlighted');

        setTimeout((e) => {
            onSelectAnswer(choice);
        }, 500)
    }

    render() {
        const {choice, index} = this.props;
        return (
            <button ref={(input) => this.button = input}
                    className={`btn btn-huge ${this.selected ? 'is-selected' : ''}`}
                    onClick={(e) => {
                        this.handleClick(e)
                    }}><span className="letter">{this.getLetter(index)}</span> {choice.op}</button>
        );
    }
}

NiceButton.propTypes = {
    choice: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onSelectAnswer: PropTypes.func.isRequired,
    allAnswers: PropTypes.array.isRequired,
};

export default NiceButton;