import React, { Component } from 'react';
import { FormControl, Button, Modal} from 'react-bootstrap';
import { firebase } from '../../firebase';
import '../css/Diet.css';

export default class AddFood extends Component {
  constructor(){
    super();

    this.state = {
      foodTextField: '',
      caloriesTextField: '',
    }

    }

      addFood() {
        //If text fields are empty, no need to change states
        if(this.state.caloriesTextField !== '' && this.state.foodTextField !== '') {
          //Update states
          //Need to delcare newCal state so that progressBar and database update instantly instead of next button click (same for newProgress)
          let newCal = (parseInt(this.props.calories , 10 )) + (parseInt(this.state.caloriesTextField , 10 ))

          //Update database
          if(firebase.auth()) {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
              calories: newCal
            });
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/foodLog').push({
              food: this.state.foodTextField,
              calories: this.state.caloriesTextField
            });

            this.props.updateProgressBar(newCal, this.props.caloriesGoal);
          }

          // Check if user is trying to lose weight and has gone over their calorie Goal
          if(this.props.fitnessChoice === 'lose' && newCal > this.props.caloriesGoal) {
            this.setState({ showEaten: true }); // Show warning that user has eaten too much
          }

          // Empty textfields
          this.setState({caloriesTextField: '', foodTextField: ''});
          // Put text focus back on food input field
          document.getElementById('foodTextField').focus();

        }

      }

    render() {
      return (
        <section>

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

        </section>
      )

    }

  }
