import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { firebase } from '../../firebase';
import '../css/Diet.css';

export default class FoodLog extends Component {
  constructor(){
    super();

    this.state = {

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
          let newCal = (parseInt(this.props.calories , 10 )) - removedCals

          //Update database
          if(firebase.auth()) {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
              calories: newCal
            });
          }

          this.props.updateProgressBar(newCal, this.props.caloriesGoal);

        })
      }

    render() {
      return (
        <section>

          <div className='foodLogContainer'>
            <h2>Food Log</h2>
            <div style={{padding: '20px 0 0 20px'}}>
              {
                this.props.foodLog.map((array, index) => {
                  return (
                    <div key={index} className='foodLog'>
                      <strong>{array.food}</strong> - {array.calories} <Glyphicon onClick={() => this.removeClicked(index)} className='removeGlyph' glyph="remove" />
                    </div>
                  )
                })
              }
            </div>
          </div>

        </section>
      )
    }

  }
