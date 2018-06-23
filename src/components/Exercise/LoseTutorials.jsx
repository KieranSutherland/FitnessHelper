import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../css/Exercise.css';

export default class LoseTutorials extends Component {
  constructor(){
    super();
    this.state = {
      modalMessage: ''
    }

    }

    render() {

      return (
        <section>

          <h3>Tutorials</h3>
          <div className='tutorials-container'>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Bicep curl',
              modalMessage: 'Begin by grabbing a barbell with an underhand grip, with your hands placed roughly shoulder width apart. ' +
              'Next, stand up straight, with your feet close together, making sure that your arms are fully extended. Ensure that the ' +
              'bar is not quite touching your body, and keeping your eyes forward dead ahead and your elbows tucked in at your sides, ' +
              'slowly curl the bar upwards, making sure to keep your body as still as possible. Use the biceps to generate the power ' +
              'to curl the weight, and squeeze them at the top of the movement and hold for a second or two. The bar should be roughly' +
              'level with your chin once you’ve curled the weight upwards. Slowly lower the barbell back downwards to the initial ' +
              'starting position. Repeat for each rep.'}) }>Bicep curl</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Tricep pulldown',
              modalMessage: 'Fix a cable station with a bar attached onto its pulley. Hold the bar with an overhand grip of your hands' +
              'at shoulder’s width apart. Position your feet at shoulder’s width apart with knees bent for maintaining stability. ' +
              'Now pull the bar down with your forearms parallel the floor, elbows close to the body and wrist straight. Push the bar' +
              'down towards to floor, with the help of your forearms until the arms are full extended in the downwards direction. ' +
              'Remain in this position for a second. Moving your forearms, return to the starting position. Remain there for a second' +
              'and then repeat the above steps. Repeat for each rep.'}) }>Tricep pulldown</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Lateral pulldown',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Lateral pulldown</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Front raise with dumbbell',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Front raise with dumbbell</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Plank',
              modalMessage: 'Get into the push-up position. Then place your forearms on the floor, shaped like an upside-down V. Your hands' +
               'should be touching each other and elbows should feel like they are in a natural position. Hold this position.'}) }>Plank</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Ab crunch',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Ab crunch</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Bicycle crunch',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Bicycle crunch</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Lunge with dumbbell',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Lunge with dumbbell</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Squat',
              modalMessage: 'Stand with your feet slightly wider than hip-width apart, back straight, shoulders down, toes pointed slightly out. ' +
              'Keeping your back straight, lower your body down and back as if you are sitting down into a chair, until your thighs are parallel to ' +
              'the ground (or as close to parallel as possible).  Make sure your knees do not pass over your toes, and keeps your abs tightly ' +
              'activated to ensure a straight spine.  Rise back up slowly. Repeat for each rep.'}) }>Squat</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Leg curl',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Leg curl</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Incline dumbbell press',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Incline dumbbell press</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Tricep kickback with bench',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Tricep kickback with bench</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Lateral raise with dumbbell',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Lateral raise with dumbbell</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Side plank',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Side plank</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Straight leg raise with bench',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Straight leg raise with bench</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Squat with dumbbell',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Squat with dumbbell</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Seated calf raise with dumbbell',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Seated calf raise with dumbbell</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Side lunge with dumbbell',
              modalMessage: '*This has not yet been implemented* Please seek online help for this exercise.'}) }>Side lunge with dumbbell</a></p>
        </div>

        <Modal show={this.state.show} onHide={ () => this.setState({ show: false }) }>
          <Modal.Header closeButton>
            <Modal.Title><strong style={{color: '#00C853'}}>{this.state.modalTitle}</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 style={{padding: '0px 0px 0px 15px'}}>{this.state.modalMessage}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ show: false })}>Close</Button>
          </Modal.Footer>
        </Modal>

      </section>
      )
    }

  }
