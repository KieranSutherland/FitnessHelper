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
      calChartData: []
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
            let arrayTemp = calHistoryArray;
            // If the array is more than 10, get the most recent 10 days
            if(arrayTemp.length > 10) {
              arrayTemp = arrayTemp.slice(arrayTemp.length - 10, arrayTemp.length)
            }
            this.setState({calChartData : [
              {
                  color: "#00C853",
                  points: [
                    {x: 1, y: arrayTemp[0].calories},
                    {x: 2, y: arrayTemp[1].calories},
                    {x: 3, y: arrayTemp[2].calories},
                    {x: 4, y: arrayTemp[3].calories},
                    {x: 5, y: arrayTemp[4].calories},
                    {x: 6, y: arrayTemp[5].calories},
                    {x: 7, y: arrayTemp[6].calories},
                    {x: 8, y: arrayTemp[7].calories},
                    {x: 9, y: arrayTemp[8].calories},
                    {x: 10, y: arrayTemp[9].calories},
                  ]
              }
          ]})
          });

        }
        else {
          browserHistory.push('/login'); //User isn't allowed to access this page without being logged in first
        }

      });

    }

    render() {
      return (
        <div>
          <NaviBar />
          <div className='content-container'>

          <Link to={'/diet'}><Glyphicon glyph="menu-left"/> Back</Link>
          <h1>Calorie History</h1>
          <hr />

          <h2>Last 10 days</h2>
            <LineChart
              width={600}
              height={400}
              margins={{top: 50, right: 20, bottom: 40, left: 80}}
              xLabel='Day'
              yLabel='Calorie intake'
              interpolate='linear'
              onPointHover={(point) => `${this.state.calHistory[point.x].date}<br />${point.y} cals`}
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
        </div>
      )
    }

  }
