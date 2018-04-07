import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { firebase } from '../../firebase';
import AlertPopup from '../AlertPopup';
import '../css/Account.css';

export default class DeleteAccount extends Component {
  constructor(){
    super();
    this.state = {
      deleteAlertStyle: 'hidden',
      deleteAlertHeight: '0px',
      deleteAlert: {
        message: ''
      }
    }

    }

    deleteAccountClicked() {
      let user = firebase.auth().currentUser;
      let ref = firebase.database().ref(
        "/users/" + user.uid);
      user.delete().then( () => {
        // User deleted.
        ref.remove();
        this.setState({deleteAlertStyle: 'hidden'});
      }).catch(error => {
        this.setState({deleteAlert: error, deleteAlertStyle: 'visible', deleteAlertHeight: '52px'});
        // Make alert disappear after 4 seconds
        setTimeout(function () {
                this.setState({deleteAlertStyle: 'hidden', deleteAlertHeight: '0px'});
        }.bind(this), 4000);
      });
    }

    render() {
        return (
          <section>

            <div className='inputLine'>
              <br /><br />
              <Button
                className='submitButton deleteAccount'
                onClick={ () => this.setState({ show: true }) }
                >
                Delete Account
              </Button>
            </div>

            <Modal show={this.state.show} onHide={ () => this.setState({ show: false }) }>
              <Modal.Header closeButton>
                <Modal.Title><strong style={{color: '#E53935'}}>Delete Account</strong></Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <h4 style={{padding: '0px 0px 0px 15px'}}>Are you sure? You won't be able to get your account back!</h4>
                <br />
                <div className='lastChanceBtns'>
                <Button
                  className='submitButton lastChance'
                  onClick={this.deleteAccountClicked.bind(this)}
                  >
                  YES
                </Button>
                <Button
                  className='submitButton lastChance'
                  onClick={() => this.setState({ show: false })}
                  >
                  NO
                </Button>
                </div>

                <AlertPopup
                  height={this.state.deleteAlertHeight}
                  alertType={'warning'}
                  alertStyle={this.state.deleteAlertStyle}
                  alertMessage={this.state.deleteAlert.message}
                />

              </Modal.Body>

              <Modal.Footer>
                <Button onClick={() => this.setState({ show: false })}>Close</Button>
              </Modal.Footer>

            </Modal>

        </section>
        )
      }



  }
