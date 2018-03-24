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
    }

    }

    componentDidMount() {

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

            // Convert to format for date to be used as x axis
            let chartDate = [];
            for (let i = 0; i < chartArray.length; i++) {
              let day = chartArray[i].date.slice(0,2)
              let month = chartArray[i].date.slice(3,5)
              let year = '20' + chartArray[i].date.slice(6,8)
              chartDate[i] = year + '-' + month + '-' + day
            }

            // To allow for less than 10 in the array
            let pointsTemp = [];
            for (var i = 0; i < chartArray.length; i++) {
                pointsTemp.push({
                    x: chartDate[i],
                    y: chartArray[i].calories
                });
            }

            this.setState({chartArray: chartArray,
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

    render() {
      return (
        <main>
          <NaviBar />
          <div className='content-container'>

          <Link to={'/diet'}><Glyphicon glyph="menu-left"/> Back</Link>
          <h1>Calorie History</h1>
          <hr />

          <h2>Last 10 recorded days</h2>
          <a
            onClick={() => console.log(this.state.calChartData[0].points[0].x)}
            >check</a>
            <LineChart
              width={600}
              height={400}
              margins={{top: 50, right: 20, bottom: 40, left: 80}}
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
                      <strong>{array.date}:</strong> {array.calories}
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
