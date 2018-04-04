import React, { Component } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { firebase } from '../../firebase';
import '../css/Diet.css';

export default class ResetDay extends Component {
  constructor(){
    super();

    this.state = {
      resetDayAlertStyle : 'hidden',
      resetDayAlert: {
        message: ''
      }
    }

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
            calories: this.props.calories
          });

          //Update database
          firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
            calories: 0
          });
          firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/foodLog').remove();

          this.setState({
            //Close Modal
            showReset: false
          });
          this.props.setState({
            calories: 0,
            progress: 0,
            foodTextField: '',
            caloriesTextField: '',
          });
        }

      }

    render() {
      return (
        <section>

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

        </section>
      )

    }

  }
