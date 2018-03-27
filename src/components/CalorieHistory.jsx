import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import LineChart from 'react-linechart';
import { firebase } from '../firebase';
import NaviBar from './NaviBar';
import './css/CalorieHistory.css';
import './css/LineChart.css';

export default class CalorieHistory extends Component {
  constructor(){
    super();
    this.state = {
      calHistory: [],
      calChartData: [],
      recordedDays: '10',
      chartWidth: 0,
      chartHeight: 0,
      chartLeftMargin: 0
    }

    }

    componentDidMount() {

      //Resize chart is screen is small
      if(window.innerWidth <= 650) {
        this.setState({chartWidth: 300, chartHeight: 240, chartLeftMargin: 45})
      }
      else {
        this.setState({chartWidth: 600, chartHeight: 400, chartLeftMargin: 80})
      }

      firebase.auth().onAuthStateChanged(user => {

        if(user) {
          //Update food log
          firebase.database().ref('users/' + firebase.auth().currentUser.uid).child('calHistory').on('value', snapshot => {
            let calHistoryArray = [];
            snapshot.forEach(snap => {
              const { date, calories } = snap.val();
              calHistoryArray.push({ date, calories });
            })
            this.setState({calHistory: calHistoryArray})

            // Input data to chart
            let chartArray = calHistoryArray;
            // If the array is more than 10, get the most recent 10 days and display in chart
            if(chartArray.length > 10) {
              chartArray = chartArray.slice(chartArray.length - 10, chartArray.length)
            }

            // Convert to YYYY-MM-DD format for date to be used as x axis
            let chartDate = [];
            for (let i = 0; i < chartArray.length; i++) {
              let day = chartArray[i].date.slice(0,2)
              let month = chartArray[i].date.slice(3,5)
              let year = '20' + chartArray[i].date.slice(6,8)
              chartDate[i] = year + '-' + month + '-' + day
            }

            // To allow for less than 10 in the array
            let pointsTemp = [];
            for (let i = 0; i < chartArray.length; i++) {
                pointsTemp[i] = {
                    x: chartDate[i],
                    y: chartArray[i].calories
                };
            }

            this.setState({chartArray: chartArray,
              recordedDays: chartArray.length, // In case there are less than 10 days
              calChartData : [{
                  color: "#00C853",
                  points: pointsTemp
                }]
              })

          });

        }
        else {
          browserHistory.push('/login'); //User isn't allowed to access this page without being logged in first
        }

      });

    }

    removeClicked(index) {

      const dataLink = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/calHistory')

      let i = 0
      dataLink.once('value', snapshot => {
        snapshot.forEach( snap => {
          if(i === index) {
            //If index matches the index of the log chosen to be removed, remove it
            snap.ref.remove();
          }
          i++;
        })
      })

    }

    render() {
      return (
        <main>
          <NaviBar />
          <div className='content-container'>

          <Link to={'/diet'}><Glyphicon glyph="menu-left"/> Back</Link>
          <h1>Calorie History</h1>
          <hr />

          <h2>Last {this.state.recordedDays} recorded days</h2>

            <LineChart
              width={this.state.chartWidth}
              height={this.state.chartHeight}
              margins={{top: 0, right: 0, bottom: 40, left: this.state.chartLeftMargin}}
              xLabel='Date'
              yLabel='Calorie intake'
              interpolate='linear'
              isDate={true}
              onPointHover={(point) => `${point.y} <br /> Calories`}
              data={this.state.calChartData}
            />

          <hr />

          <h2>Full history</h2>
          <div className='foodLogContainer'>
            <div style={{padding: '20px 0 0 20px'}}>
              {
                this.state.calHistory.map((array, index) => {
                  return (
                    <div key={index} className='foodLog'>
                      <strong>{array.date}:</strong> {array.calories} <Glyphicon onClick={() =>this.removeClicked(index)} className='removeGlyph' glyph="remove" />
                      <hr align='left' width='150px'/>
                    </div>
                  )
                })
              }
            </div>
          </div>

        </div>
        </main>
      )
    }

  }
