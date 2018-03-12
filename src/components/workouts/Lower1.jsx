import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class Lower1 extends Component {

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
            <td>Lunge with dumbbell</td>
            <td>3</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Squat</td>
            <td>3</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Leg curl</td>
            <td>3</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Treadmill</td>
            <td>1</td>
            <td>10 mins</td>
          </tr>
        </tbody>
      </Table>
    )
  }

}
