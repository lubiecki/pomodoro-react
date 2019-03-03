import React from 'react';
import './app.styl';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: "00",
      minutes: "00",
      workTime: 2
    }
    this.startCounting = this.startCounting.bind(this);
  };
  timer() {
    if(this.state.seconds < 9) {
      this.setState({
        seconds: "0" + (Number(this.state.seconds) + 1)
      })
    } else {
      this.setState({
        seconds: Number(this.state.seconds) + 1
      })
    }

    if(this.state.minutes == this.state.workTime) {
      clearInterval(this.intervalId);
      this.setState({
        seconds: "00"
      })
    }
    if(this.state.seconds == 60) {
      if(this.state.minutes < 9) {
        this.setState({
          minutes: "0" + (Number(this.state.minutes) + 1),
          seconds: 0
        })
      } else {
        this.setState({
          minutes: Number(this.state.minutes) + 1,
          seconds: 0
        })
      }
    }
  }
  startCounting() {
    this.intervalId = setInterval(this.timer(), 1000);
  }
  render() {
    return <div className="wrapper">
    <span className="seconds">{this.state.minutes} : {this.state.seconds}</span>
    <button onClick={this.startCounting}>Run</button>
    </div>;
  }
}

export default App;