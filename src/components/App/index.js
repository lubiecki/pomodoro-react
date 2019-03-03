import React from 'react';
import './app.styl';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: "00",
      minutes: "00",
      workTime: 25,
      status: 0, //0 - stopped, 1 - running
      lastAlert: ""
    }
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickClear = this.handleClickClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  timer() {
      this.intervalId = setInterval(() => {
        if(this.state.seconds < 9) {
          this.setState({
            seconds: "0" + (Number(this.state.seconds) + 1)
          })
        } else {
          this.setState({
            seconds: Number(this.state.seconds) + 1
          })
        }

        if(this.state.minutes == this.state.workTime || this.state.workTime == 0) {
          clearInterval(this.intervalId);
          this.setState({
            seconds: "00",
            status: 0
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
      }, 1000);
  }
  handleClickStart() {
    if (this.state.status == 0) {
      this.setState({
        status: 1
      })
      this.timer()
    } else {
      this.setState({
        status: 0
      })
      clearInterval(this.intervalId);
    }
  }
  handleClickClear() {
    this.setState({
      seconds: "00",
      minutes: "00",
      status: 0
    })
    clearInterval(this.intervalId);
  }
  handleChange(e) {
    this.setState({workTime: e.target.value});
  }
  handleSubmit(e) {
    alert('A time was setted to: ' + this.state.workTime);
    e.preventDefault();
  }
  render() {
    return <div className="wrapper">
    <div className="settings">
      <form onSubmit={this.handleSubmit}>
        <label>
          Time:
          <input type="number" value={this.state.value} onChange={this.handleChange} placeholder="1"/>
        </label>
        <input type="submit" value="Submit" className="btn btn-small"/>
      </form>
    </div>
    <span className="timer">{this.state.minutes} : {this.state.seconds}</span>
    <div className="btn-group">
      <button className="btn" onClick={this.handleClickStart}>Start/Pause</button>
      <button className="btn btn-clear" onClick={this.handleClickClear}>Clear</button>
    </div>
    </div>;
  }
}

export default App;