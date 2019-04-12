import React from 'react';
import data from './data/Data';
import Content from "./Content";
import Navigation from "./Navigation";

import KV from '../images/xiyou_KV.svg'
import Header from "./Header";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            c1: 0,
            c2: 0,
            c3: 0,
            c4: 0,
            gameStart: false,
            allQuestions: data.allQuestions,
            currentQuestion: data.allQuestions[0],
            progress: 0,
            allAnswers: [],
            loadNewQuestion: false,
            showResults: false,
            loadingResults: false,
            resultsLoaded: false,
            theFinalResult:null
        }

    }

    onSelectAnswer = (answer) => {
        //console.log('Answer selected '+answer);

        const {allAnswers, progress, c1, c2, c3, c4} = this.state;
        const currentAnswer = allAnswers[progress]

        if (answer.val === 'c1') {
            console.log('c1 is clicked');
            this.setState({c1: c1 + 1});
        } else if (answer.val === 'c2') {
            console.log('c2 is clicked');
            this.setState({c2: c2 + 1});
        } else if (answer.val === 'c3') {
            console.log('c3 is clicked');
            this.setState({c3: c3 + 1});
        } else if (answer.val === 'c4') {
            console.log('c4 is clicked');
            this.setState({c4: c4 + 1});
        }

        if (currentAnswer) {
            allAnswers[progress] = answer.op
            this.setState({
                allAnswers
            }, this.goToNextQuestion());
        } else {
            this.setState({
                allAnswers: [...allAnswers, answer.op]
            }, this.goToNextQuestion())
        }


    }

    goToNextQuestion = () => {
        // console.log('go to next question after the state is updated');

        const {progress, allQuestions} = this.state;

        this.setState({
            loadNewQuestion: true
        })

        // we have the question faded out
        setTimeout(() => {

            if (progress < allQuestions.length - 1) {

                this.setState({
                    progress: progress + 1,
                    currentQuestion: allQuestions[progress + 1],
                    loadNewQuestion: false
                })

            } else {

                this.setState({
                    loadNewQuestion: false,
                    showResults: true
                })

            }

        }, 300)

    }

    goToPreviousQuestion = () => {
        // console.log('go to previous question after the state is updated!');

        const {progress, allQuestions, showResults} = this.state;

        this.setState({
            loadNewQuestion: true
        })

        setTimeout(() => {
            (progress > 0 && !showResults) && this.setState({
                progress: progress - 1,
                loadNewQuestion: false,
                currentQuestion: allQuestions[progress - 1]
            });

            showResults && this.setState({
                showResults: false,
                loadNewQuestion: false
            })

        }, 300)
    }

    onRestart = () => {
        // console.log('It is restart!!');
        this.setState({
            currentQuestion: this.state.allQuestions[0],
            progress: 0,
            allAnswers: [],
            showResults: false,
            resultsLoaded: false,
            c1: 0,
            c2: 0,
            c3: 0,
            c4: 0,
            gameStart:true,
            theFinalResult:null
        });
    }

    onLoadResults = () => {
        console.log('Loading results!');
        const final = this.compareWhoIsScoreHigher()
        // console.log(`final is ${final}`);

        this.setState({
            loadingResults: true
        })

        // fake delay
        setTimeout(() => {
            this.setState({
                loadingResults: false,
                resultsLoaded: true,
                theFinalResult: final
            })
        }, 1000)

    }
    
    compareWhoIsScoreHigher = () => {
        const {c1,c2,c3,c4}=this.state
        let scoreArray = [{name:'c1',val:c1},{name:'c2',val:c2},{name:'c3',val:c3},{name:'c4',val:c4}]
        console.log('scoreArray: ',scoreArray);

        const finalResult = scoreArray.sort((a,b)=> a.val - b.val)
        console.log(`final is ${Object.keys(finalResult)}`);
        return finalResult.pop().name
    }

    render() {
        const {gameStart, currentQuestion, loadNewQuestion, showResults, allAnswers, allQuestions, loadingResults, resultsLoaded, progress, theFinalResult} = this.state;


        return (
            <div
                className={`${loadingResults ? 'is-loading-results' : ''} ${resultsLoaded ? 'is-showing-results' : 'no-results-loaded'}`}>

                {/* Header - start */}
                {
                    gameStart ?
                        <Header
                            theFinalResult={theFinalResult}
                            currentQuestion={currentQuestion}
                            showResults={showResults}
                            loadNewQuestion={loadNewQuestion}
                        /> :
                        <div
                            className='KV'
                            onClick={() => this.setState({gameStart: true})}
                        >
                            <img src={KV} alt="西遊選才錄"/>
                        </div>
                }
                {/* Header - end */}

                {/* Content - start */}
                {
                    gameStart ?
                        <Content
                            showResults={showResults}
                            currentQuestion={currentQuestion}
                            loadNewQuestion={loadNewQuestion}
                            allAnswers={allAnswers}
                            allQuestions={allQuestions}
                            resultsLoaded={resultsLoaded}
                            onSelectAnswer={this.onSelectAnswer}
                            onLoadResults={this.onLoadResults}
                            onRestart={this.onRestart}
                            theFinalResult={theFinalResult}
                        /> :
                        null
                }
                {/* Content - end */}

                {/* Navigation - start - is-active makes it visible */}
                {
                    gameStart ?
                        <Navigation
                            progress={progress}
                            allAnswers={allAnswers}
                            goToPreviousQuestion={this.goToPreviousQuestion}
                            showResults={showResults}
                            goToNextQuestion={this.goToNextQuestion}
                        /> :
                        null
                }
                {/* Navigation - end */}

            </div>
        )
    }
}

export default App;