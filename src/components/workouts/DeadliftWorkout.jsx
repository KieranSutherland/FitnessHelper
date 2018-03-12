import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class DeadliftWorkout extends Component {

  render() {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Squat</td>
            <td>5</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Overhead Press</td>
            <td>5</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Deadlift</td>
            <td>5</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Chin-up</td>
            <td>3</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Knee Raise</td>
            <td>3</td>
            <td>8</td>
          </tr>
        </tbody>
      </Table>
    )
  }

}
