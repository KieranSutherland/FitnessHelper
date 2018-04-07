import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

export default class AlertPopup extends Component {
  constructor(){
    super();
    this.state = {

    }

    }

    render() {
        return (
          <section style={{height: this.props.height, width: '100%'}}>

              <Alert className='alert' bsStyle={this.props.alertType} style={{visibility:this.props.alertStyle}}>
                <strong>{this.props.alertType}!</strong> {this.props.alertMessage}
              </Alert>

        </section>
        )
      }

  }
