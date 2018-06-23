import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../css/Exercise.css';

export default class GainTutorials extends Component {
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
              modalTitle: 'Squat',
              modalMessage: 'Stand with your feet slightly wider than hip-width apart, back straight, shoulders down, toes pointed slightly out. ' +
              'Keeping your back straight, lower your body down and back as if you are sitting down into a chair, until your thighs are parallel to ' +
              'the ground (or as close to parallel as possible).  Make sure your knees do not pass over your toes, and keeps your abs tightly ' +
              'activated to ensure a straight spine.  Rise back up slowly. Repeat for each rep.'}) }>Squat</a></p>
              <p><a onClick={ () => this.setState({
                show: true,
                modalTitle: 'Bench press',
                modalMessage: 'Lie on your back with your feet flat on the floor. If your feet don’t reach the floor, use a stable board to accommodate ' +
                'size. Grasp the barbell with a wider than shoulder-width grip, wrapping thumbs around the bar. Hold the barbell at arm’s length above ' +
                'your upper-chest area. Slowly lower the barbell to the middle of your chest. In the bottom position the forearms should be perpendicular ' +
                'to the floor. Pause briefly, then press the barbell to the starting position. During the movement, the upper arms should be about 45 to ' +
                '60 degrees from the torso and the hips should remain on the bench.'}) }>Bench press</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Barbell Row',
              modalMessage: 'Start with the bar on the floor. Bend over and grab the bar with your palms facing down. Pull the' +
              'bar against your lower chest while keep your torso horizontal. Return the bar to the floor on each rep.'}) }>Barbell Row</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Overhead Press',
              modalMessage: 'Start standing with the bar on your shoulders. Press the bar over your head until your elbows' +
              'are locked. Don’t use your legs, keep them straight. Lower the bar to your shoulders and repeat.'}) }>Overhead Press</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Deadlift',
              modalMessage: 'Start with the weight on the floor. Pull the bar to your mid-thighs and lock your hips and knees. Return the weight' +
               'to the floor by moving your hips back while bending your legs. Rest a second at the bottom and repeat.'}) }>Deadlift</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Chin-up',
              modalMessage: 'Grab the pull-up bar with the palms facing your torso and a grip closer than the shoulder width. As you have both' +
               'arms extended in front of you holding the bar at the chosen grip width, keep your torso as straight as possible while creating' +
                'a curvature on your lower back and sticking your chest out. This is your starting position. As you breathe out, pull your' +
                'torso up until your head is around the level of the pull-up bar. Concentrate on using the biceps muscles in order to perform' +
                'the movement. Keep the elbows close to your body. After a second of squeezing the biceps in the contracted position, slowly' +
                'lower your torso back to the starting position; when your arms are fully extended. Breathe in as you perform this portion of' +
                'the movement. Repeat for each rep.'}) }>Chin-up</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Knee Raise',
              modalMessage: 'Grab the bar with your palms facing forward. Let your bodyweight dangle from your arms. Bring your knees up' +
               'towards your chest. Squeeze your abs. Let your legs slowly descend back to starting position. Repeat for each rep.'}) }>Knee Raise</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Dip',
              modalMessage: 'first raising yourself on two dip bars with straight arms. Lower your body until your shoulders are below your elbows.' +
              'Push yourself up until your arms are straight again. Repeat for each rep.'}) }>Dip</a></p>
            <p><a onClick={ () => this.setState({
              show: true,
              modalTitle: 'Plank',
              modalMessage: 'Get into the push-up position. Then place your forearms on the floor, shaped like an upside-down V. Your hands' +
               'should be touching each other and elbows should feel like they are in a natural position. Hold this position.'}) }>Plank</a></p>
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
