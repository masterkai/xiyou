import $ from 'jquery'
import {goSubmit, checkinfo, s, f, QueryString} from '../services/validate'
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
            theFinalResult: null
        }

    }

    componentDidMount() {
        this.onWindowHeightResize();
        window.onresize = (event) => {
            this.onWindowHeightResize();
        }
    }

    onWindowHeightResize = () => {
        let viewportHeight = $(window).height();
        $('.KV').css('height', viewportHeight);
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
            gameStart: true,
            theFinalResult: null
        });
    }

    onLoadResults = () => {
        let dept = "";
        let seq_no = "G001";
        let web_pno = "10803B100005";
        let NList_Type = "1";
        let memo = "12000堂電腦線上課程";
        let IsMoblie = "N";

        (function (a, b) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                web_pno = "10803B100005";
                IsMoblie = "Y";
                memo = "(手機傳送)" + memo;
            }
        })(navigator.userAgent || navigator.vendor || window.opera);

        let JSonData = {
            "name": $("#name").val() == "姓 名" ? "" : $("#name").val(),
            "mobile": $("#mobile").val() == "行動電話" ? "" : $("#mobile").val(),
            "email": $("#email").val() == "E-mail" ? "" : $("#email").val(),
            "seq_no": seq_no,
            "cityno": $("#ddl_city_no :selected").val(),
            "citynoname": $("#ddl_city_no :selected").text(),
            "townno": $("#ddl_area_no :selected").val(),
            "townnoname": $("#ddl_area_no :selected").text(),
            "per_chk": $("input[name=per_chk]:checked").length,
            "memo": (memo + "；"),
            "web_pno": web_pno,
            "fromto": QueryString("fromto") !== null ? QueryString("fromto") : "",
            "fromurl": document.location.href, //location.href,
            "sourceid": QueryString("fc") !== null ? QueryString("fc") : "",
            "NList_Type": NList_Type,
            // "AssignMode": 2,
            // "Assigndept": $("select[name='ea'] :selected").val(),
            // $("select[name='ea'] :selected").text()
            "func": "njycooooqj"
        };

        //表單共用檢查 name mobile cityno townno per_chk
        if (checkinfo(JSonData) === false) return;
        goSubmit(JSonData, s, f);

        console.log('Loading results!');
        const final = this.compareWhoIsScoreHigher()


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
        const {c1, c2, c3, c4} = this.state
        let scoreArray = [{name: 'c1', val: c1}, {name: 'c2', val: c2}, {name: 'c3', val: c3}, {name: 'c4', val: c4}]
        console.log('scoreArray: ', scoreArray);

        const finalResult = scoreArray.sort((a, b) => a.val - b.val)
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
                            <div className='KV--group'>
                                <img src={KV} alt="西遊選才錄"/>
                                <h1>西遊記裡的角色，你像誰？</h1>
                                <h2>性格配對，成功上位！</h2>
                            </div>
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