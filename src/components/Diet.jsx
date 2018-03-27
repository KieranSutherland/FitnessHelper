import React, { Component } from 'react';
import { ProgressBar, FormControl, Button, Glyphicon, Modal, Alert } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { firebase } from '../firebase';
import NaviBar from './NaviBar';
import './css/Diet.css';

export default class Diet extends Component {
  constructor(props){
    super(props);

    this.state = {
      caloriesGoal: '',
      progress: 0,
      foodTextField: '',
      caloriesTextField: '',
      foodLog: [],
      resetDayAlertStyle : 'hidden',
      resetDayAlert: {
        message: ''
      }
    }

    }

    componentDidMount() {



      firebase.auth().onAuthStateChanged(user => {

          if(user) {
            firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {
              // Calculate age
              let today = new Date();
              let birthDate = new Date(snapshot.val() && snapshot.val().dob);
              let calculatedAge = today.getFullYear() - birthDate.getFullYear();
              let m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
              {calculatedAge--;}

              this.setState({ // Set values to current user's data
                fitnessChoice: (snapshot.val() && snapshot.val().fitnessChoice),
                gender: (snapshot.val() && snapshot.val().gender),
                age: calculatedAge,
                height: (snapshot.val() && snapshot.val().height),
                weight: (snapshot.val() && snapshot.val().weight),
                calories: (snapshot.val() && snapshot.val().calories)
              });
              //Set button of fitnessChoice to the correct one
              this.state.fitnessChoice === 'gain' ? this.setState({gainColor: '#00C853'}) : this.setState({loseColor: '#00C853'});

              //Calculate calories needed
              let bmr = 10 * parseInt(snapshot.val().weight , 10)
               + 6.25 * parseInt(snapshot.val().height , 10)
                - 5 * parseInt(calculatedAge , 10)
                 + ((snapshot.val().gender === 'male') ? 5 : -161);

              //Re-calculate calories needed to gain or lose 1lb per week based on fitnessChoice
              let calGoal = Math.round((snapshot.val().fitnessChoice === 'gain') ? ((bmr * 1.55) + 500) : ((bmr * 1.55) - 500)); //1.55 for 3-5 days exercise per week
              this.setState({caloriesGoal: calGoal})

              //Update progress bar with calories eaten for that day
              let newProgress = Math.round((parseInt(snapshot.val().calories , 10 ) / calGoal) * 100)
              this.setState({progress: newProgress});

              //Make sure progress can't go past 100%
              if(newProgress > 100) { //Local variable because progress state won't be updated until componentDidMount function is completed
                this.setState({progress: 100})
              }
            });

            this.updateFoodLog();

            }
            else {
              browserHistory.push('/login'); //User isn't allowed to access this page without being logged in first
            }

        });

      }

      updateFoodLog() {
        if(firebase.auth()) {
          //Update food log
          firebase.database().ref('users/' + firebase.auth().currentUser.uid).child('foodLog').on('value', snapshot => {
            let foodArray = [];
            snapshot.forEach(snap => {
              const { calories, food } = snap.val();
              foodArray.push({ calories, food });
            })
            this.setState({foodLog: foodArray})
          });
        }
      }

      addFood() {
        //If text fields are empty, no need to change states
        if(this.state.caloriesTextField !== '' && this.state.foodTextField !== '') {
          //Update states
          //Need to delcare newCal state so that progressBar and database update instantly instead of next button click (same for newProgress)
          let newCal = (parseInt(this.state.calories , 10 )) + (parseInt(this.state.caloriesTextField , 10 ))
          let newProgress = Math.round((parseInt(newCal , 10 ) / this.state.caloriesGoal) * 100)
          this.setState({calories: newCal});
          this.setState({progress: newProgress});
          //Make sure progress can't go past 100%
          if(newProgress > 100) {
            this.setState({progress: 100})
          }
          //Update database
          if(firebase.auth()) {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
              calories: newCal
            });
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/foodLog').push({
              food: this.state.foodTextField,
              calories: this.state.caloriesTextField
            });
          }

          // Check if user is trying to lose weight and has gone over their calorie Goal
          if(this.state.fitnessChoice === 'lose' && newCal > this.state.caloriesGoal) {
            this.setState({ showEaten: true }); // Show warning that user has eaten too much
          }

          // Empty textfields
          this.setState({caloriesTextField: '', foodTextField: ''});
          // Put text focus back on food input field
          document.getElementById('foodTextField').focus();

        }

      }

      removeClicked(index) {
        const dataLink = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/foodLog')

        let i = 0
        dataLink.once('value', snapshot => {
          let removedCals = 0;
          snapshot.forEach( snap => {
            if(i === index) {
              removedCals = snap.val().calories
              //If index matches the index of the log chosen to be removed, remove it
              snap.ref.remove();
            }
            i++;
          })
          // Update new calories and progressBar values
          let newCal = (parseInt(this.state.calories , 10 )) - removedCals
          let newProgress = Math.round((parseInt(newCal , 10 ) / this.state.caloriesGoal) * 100)
          this.setState({calories: newCal});
          this.setState({progress: newProgress});
          //Make sure progress can't go past 100%
          if(newProgress > 100) {
            this.setState({progress: 100})
          }
          //Update database
          if(firebase.auth()) {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
              calories: newCal
            });
          }

        })
      }

      resetDayClicked() {

        //Push day to database
        if(firebase.auth()) {
          let today = new Date();
          let day = today.getDate();
          let month = today.getMonth();
          if(today.getMonth().toString().length === 1) {
            month = '0' + today.getMonth()
          }
          if(today.getDate().toString().length === 1) {
            day = '0' + today.getDate()
          }
          let todayString =  day + '/'+ month + '/' + today.getFullYear().toString().slice(2,4)
          firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/calHistory').push({
            date: todayString,
            calories: this.state.calories
          });

          //Update database
          firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
            calories: 0
          });
          firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/foodLog').remove();
          this.setState({
            calories: 0,
            progress: 0,
            foodTextField: '',
            caloriesTextField: '',
            //Close Modal
            showReset: false
            });
        }

      }

    render() {
      return (
        <main>
          <NaviBar />
          <div className='content-container'>

          <h1>Diet</h1>
          <hr />
          <h2>Progress for today's calorie intake</h2>
          <div className='caloriesAndGoal'>
            <ul>
              <li>Calories: {this.state.calories}</li>
              <li>Goal: {this.state.caloriesGoal}</li>
            </ul>
          </div>

          <ProgressBar className='progressBar' now={this.state.progress} label={`${this.state.progress}%`} />

          <Button
            className='submitButton calHistoryBtn'
            onClick={() => browserHistory.push('/calorie_history')}
            >
            Go to calorie intake history
          </Button>

          <hr />

          <h2>Add eaten food</h2>
          <div className='inputLine small'>
            <FormControl
              id='foodTextField'
              type="text"
              placeholder='Food'
              value={this.state.foodTextField}
              style={{margin: '0px 15px 0px 0px'}}
              onKeyPress={e => {if(e.key === 'Enter') {this.addFood()}}} //Login if Enter key pressed
              onChange={e => this.setState({foodTextField: e.target.value})}
            />
            <FormControl
              type="text"
              placeholder='Calories'
              value={this.state.caloriesTextField}
              onKeyPress={e => {if(e.key === 'Enter') {this.addFood()}}} //Login if Enter key pressed
              onChange={e => this.setState({caloriesTextField: e.target.value})}
            />
            <Button
              className='submitButton add'
              onClick={() => this.addFood()}
              >
              Add
            </Button>
          </div>

          <Modal show={this.state.showEaten} onHide={ () => this.setState({ showEaten: false }) }>
            <Modal.Header closeButton>
              <Modal.Title><strong style={{color: '#E53935'}}>You've eaten too much!</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4 style={{padding: '0px 0px 0px 15px'}}>Given that you're trying to lose weight, you need to stick to
              your recommended calorie intake goal. </h4>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ showEaten: false })}>Close</Button>
            </Modal.Footer>
          </Modal>

          <hr />

          <div className='foodLogContainer'>
            <h2>Food Log</h2>
            <div style={{padding: '20px 0 0 20px'}}>
              {
                this.state.foodLog.map((array, index) => {
                  return (
                    <div key={index} className='foodLog'>
                      <strong>{array.food}</strong> - {array.calories} <Glyphicon onClick={() =>this.removeClicked(index)} className='removeGlyph' glyph="remove" />
                    </div>
                  )
                })
              }
            </div>
          </div>

          <hr /><br />
          <Button
            className='submitButton resetDay'
            onClick={ () => this.setState({ showReset: true }) }
            >
            Reset Day
          </Button>

          <Modal show={this.state.showReset} onHide={ () => this.setState({ showReset: false }) }>
            <Modal.Header closeButton>
              <Modal.Title><strong style={{color: '#E53935'}}>Reset Day</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4 style={{padding: '0px 0px 0px 15px'}}>Are you sure? Your calorie intake and food log will be reset.</h4>
              <br />
              <div className='lastChanceBtns'>
              <Button
                className='submitButton lastChance'
                onClick={this.resetDayClicked.bind(this)}
                >
                YES
              </Button>
              <Button
                className='submitButton lastChance'
                onClick={() => this.setState({ showReset: false })}
                >
                NO
              </Button>
              </div>
              <div>
                <Alert className='alert' bsStyle="warning" style={{visibility:this.state.resetDayAlertStyle}}>
                  <strong>Error!</strong> {this.state.resetDayAlert.message}
                </Alert>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ showReset: false })}>Close</Button>
            </Modal.Footer>
          </Modal>

          </div>
        </main>
      )
    }

  }
